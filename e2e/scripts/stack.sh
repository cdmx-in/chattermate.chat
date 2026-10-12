#!/usr/bin/env bash
# Runs the ChatterMate e2e stack natively (no Docker): a throwaway Postgres DB,
# the backend, a production build of the dashboard and the fake LLM — all on
# 127.0.0.1 ports that never collide with a dev stack on localhost.
#
#   stack.sh up            start everything in the background, wait until healthy
#   stack.sh down          stop what `up` started
#   stack.sh reset         fresh database (restarts the backend)
#   stack.sh logs [name]   tail backend | frontend | fake-llm logs
#   stack.sh backend|frontend|fake-llm|customer-site   run one service in the foreground
#                                        (what playwright.config.ts webServer calls)
#
# Knobs (all optional):
#   E2E_EDITION=oss|enterprise   oss (default) blocks the enterprise submodule even if present
#   E2E_PG_URL                   admin URL of a Postgres with pgvector, no db name
#                                (default postgresql://$USER@127.0.0.1:5432)
#   E2E_PYTHON                   python with backend deps (default backend/venv/bin/python, else python3)
#   E2E_FRONTEND_NODE_MODULES    frontend node_modules to build with (default frontend/node_modules)
set -euo pipefail

E2E_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$(cd "$E2E_DIR/.." && pwd)"
STATE_DIR="$E2E_DIR/.stack"
CACHE_DIR="$E2E_DIR/.cache"

EDITION="${E2E_EDITION:-oss}"
DB_NAME="chattermate_e2e"
TPL_NAME="${DB_NAME}_tpl"
PG_URL="${E2E_PG_URL:-postgresql://${USER}@127.0.0.1:5432}"
PG_URL="${PG_URL%/}"

BACKEND_PORT=18000
FRONTEND_PORT=15173
FAKE_LLM_PORT=14010
CUSTOMER_SITE_PORT=13000

if [[ -z "${E2E_PYTHON:-}" ]]; then
  if [[ -x "$REPO_DIR/backend/venv/bin/python" ]]; then E2E_PYTHON="$REPO_DIR/backend/venv/bin/python"; else E2E_PYTHON="python3"; fi
fi
NODE_MODULES="${E2E_FRONTEND_NODE_MODULES:-$REPO_DIR/frontend/node_modules}"

log() { printf '\033[36m[e2e]\033[0m %s\n' "$*" >&2; }
die() { printf '\033[31m[e2e]\033[0m %s\n' "$*" >&2; exit 1; }

case "$EDITION" in oss|enterprise) ;; *) die "E2E_EDITION must be oss or enterprise, got '$EDITION'";; esac
# The suite drops and recreates this database on every run. Refuse anything that
# is not obviously a throwaway, so a typo can never point it at a dev DB.
[[ "$DB_NAME" == *_e2e ]] || die "refusing to manage database '$DB_NAME': name must end in _e2e"

psql_admin() { psql "$PG_URL/postgres" -v ON_ERROR_STOP=1 -qtA "$@"; }
# SQLAlchemy needs the driver in the scheme; psql accepts both spellings.
db_url() { local base="${PG_URL#postgres://}"; base="${base#postgresql://}"; echo "postgresql+psycopg://$base/$1"; }

backend_env() {
  export ENV_FILE="$E2E_DIR/.env.e2e"
  export DATABASE_URL; DATABASE_URL="$(db_url "$1")"
  if [[ "$EDITION" == oss ]]; then export NO_ENTERPRISE=1; else unset NO_ENTERPRISE; fi
}

# Fingerprint of everything that shapes the schema: migration contents + edition.
# Contents, not names — amending an unmerged migration must rebuild the template.
schema_fingerprint() {
  {
    echo "$EDITION"
    cat "$REPO_DIR"/backend/alembic/versions/*.py
    if [[ "$EDITION" == enterprise ]]; then cat "$REPO_DIR"/backend/app/enterprise/migrations/versions/*.py 2>/dev/null || true; fi
  } | shasum | cut -c1-16
}

# The template DB holds a freshly migrated schema; every run clones it, which takes
# a second instead of re-running every migration.
ensure_template() {
  local fp current
  fp="$(schema_fingerprint)"
  current="$(psql_admin -c "SELECT shobj_description(oid, 'pg_database') FROM pg_database WHERE datname = '$TPL_NAME'")"
  if [[ "$current" == "$fp" ]]; then return; fi

  log "building template database $TPL_NAME (schema changed or first run)"
  psql_admin -c "DROP DATABASE IF EXISTS $TPL_NAME"
  psql_admin -c "CREATE DATABASE $TPL_NAME"
  psql "$PG_URL/$TPL_NAME" -v ON_ERROR_STOP=1 -q -c "CREATE EXTENSION IF NOT EXISTS vector"
  (
    backend_env "$TPL_NAME"
    cd "$REPO_DIR/backend"
    "$E2E_PYTHON" -m alembic upgrade head
    if [[ "$EDITION" == enterprise ]]; then
      "$E2E_PYTHON" -m alembic -c app/enterprise/migrations/alembic.ini upgrade head
    fi
  ) >&2
  psql_admin -c "COMMENT ON DATABASE $TPL_NAME IS '$fp'"
}

fresh_database() {
  ensure_template
  psql_admin -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid()" >/dev/null
  psql_admin -c "DROP DATABASE IF EXISTS $DB_NAME"
  psql_admin -c "CREATE DATABASE $DB_NAME TEMPLATE $TPL_NAME"
  log "fresh database $DB_NAME"
}

run_backend() {
  fresh_database
  backend_env "$DB_NAME"
  cd "$REPO_DIR/backend"
  log "backend ($EDITION) on http://127.0.0.1:$BACKEND_PORT"
  exec "$E2E_PYTHON" -m uvicorn app.main:app --host 127.0.0.1 --port "$BACKEND_PORT"
}

# Builds the dashboard from a copy of frontend/ so the e2e build never touches the
# developer's dist/ or .env, and so the OSS edition can leave out the enterprise module.
build_frontend() {
  local src="$CACHE_DIR/frontend-$EDITION" out="$CACHE_DIR/dist-$EDITION" changes
  [[ -d "$NODE_MODULES" ]] || die "no frontend node_modules at $NODE_MODULES (run npm ci in frontend/, or set E2E_FRONTEND_NODE_MODULES)"
  mkdir -p "$src"
  local excludes=(--exclude node_modules --exclude 'dist*' --exclude '.env*' --exclude e2e --exclude coverage)
  if [[ "$EDITION" == oss ]]; then excludes+=(--exclude src/modules/enterprise); fi
  changes="$(rsync -a --delete -i "${excludes[@]}" "$REPO_DIR/frontend/" "$src/")"
  ln -sfn "$NODE_MODULES" "$src/node_modules"

  if [[ -n "$changes" || ! -f "$out/index.html" || -n "${E2E_REBUILD_FRONTEND:-}" ]]; then
    log "building dashboard ($EDITION)"
    (cd "$src" && node_modules/.bin/vite build --outDir "$out" --emptyOutDir --logLevel warn) >&2
  fi
  # Runtime config: what docker-entrypoint.sh writes in a real deployment.
  cat > "$out/config.js" <<EOF
self.APP_CONFIG = {
  API_URL: "http://127.0.0.1:$BACKEND_PORT/api/v1",
  WS_URL: "ws://127.0.0.1:$BACKEND_PORT",
  WIDGET_URL: "http://127.0.0.1:$BACKEND_PORT",
  NODE_ENV: "production"
};
EOF
}

run_frontend() {
  build_frontend
  cd "$CACHE_DIR/frontend-$EDITION"
  log "dashboard on http://127.0.0.1:$FRONTEND_PORT"
  exec node_modules/.bin/vite preview --outDir "$CACHE_DIR/dist-$EDITION" --host 127.0.0.1 --port "$FRONTEND_PORT" --strictPort
}

run_fake_llm() {
  cd "$E2E_DIR"
  exec node services/fake-llm/server.ts --port "$FAKE_LLM_PORT"
}

run_customer_site() {
  cd "$E2E_DIR"
  exec node services/customer-site/server.ts --port "$CUSTOMER_SITE_PORT" \
    --api "http://127.0.0.1:$BACKEND_PORT/api/v1" \
    --loader "http://127.0.0.1:$FRONTEND_PORT/webclient/chattermate.min.js"
}

wait_for() {
  local name="$1" url="$2" timeout="$3" i
  for ((i = 0; i < timeout; i++)); do
    if curl -fsS -o /dev/null "$url" 2>/dev/null; then log "$name is up"; return; fi
    if ! kill -0 "$(cat "$STATE_DIR/$name.pid")" 2>/dev/null; then
      tail -n 40 "$STATE_DIR/$name.log" >&2; die "$name exited during startup (log: $STATE_DIR/$name.log)"
    fi
    sleep 1
  done
  die "$name not healthy after ${timeout}s (log: $STATE_DIR/$name.log)"
}

start_bg() {
  local name="$1"
  if [[ -f "$STATE_DIR/$name.pid" ]] && kill -0 "$(cat "$STATE_DIR/$name.pid")" 2>/dev/null; then
    log "$name already running"; return
  fi
  "$0" "$name" >"$STATE_DIR/$name.log" 2>&1 &
  echo $! >"$STATE_DIR/$name.pid"
}

stop_bg() {
  local name="$1" pid
  [[ -f "$STATE_DIR/$name.pid" ]] || return 0
  pid="$(cat "$STATE_DIR/$name.pid")"
  # The service is exec'd, so this pid is the server itself; its children go with it.
  pkill -TERM -P "$pid" 2>/dev/null || true
  kill -TERM "$pid" 2>/dev/null || true
  rm -f "$STATE_DIR/$name.pid"
}

cmd_up() {
  mkdir -p "$STATE_DIR"
  start_bg fake-llm
  wait_for fake-llm "http://127.0.0.1:$FAKE_LLM_PORT/health" 30
  start_bg customer-site
  wait_for customer-site "http://127.0.0.1:$CUSTOMER_SITE_PORT/health" 30
  start_bg backend
  wait_for backend "http://127.0.0.1:$BACKEND_PORT/health" 180
  start_bg frontend
  wait_for frontend "http://127.0.0.1:$FRONTEND_PORT/config.js" 300
  log "stack ready — dashboard http://127.0.0.1:$FRONTEND_PORT"
}

cmd_down() { for s in frontend backend customer-site fake-llm; do stop_bg "$s"; done; log "stack stopped"; }

wait_port_free() {
  local port="$1" i
  for ((i = 0; i < 30; i++)); do
    lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1 || return 0
    sleep 1
  done
  die "port $port still in use after 30s"
}

cmd_reset() {
  mkdir -p "$STATE_DIR"
  stop_bg backend
  wait_port_free "$BACKEND_PORT"
  start_bg backend
  wait_for backend "http://127.0.0.1:$BACKEND_PORT/health" 180
}

case "${1:-}" in
  up) cmd_up ;;
  down) cmd_down ;;
  reset) cmd_reset ;;
  logs) tail -n 100 -f "$STATE_DIR/${2:-backend}.log" ;;
  backend) run_backend ;;
  frontend) run_frontend ;;
  fake-llm) run_fake_llm ;;
  customer-site) run_customer_site ;;
  *) sed -n '2,19p' "$0"; exit 1 ;;
esac
