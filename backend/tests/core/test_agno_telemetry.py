"""
Copyright 2024-2026 ChatterMate

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

agno reports each agent run to api.agno.com from inside the run unless told
not to; a slow report used to eat the run's timeout and cost the visitor
their answer.
"""

import os
from unittest.mock import AsyncMock, patch

import pytest
from agno.agent import Agent
from agno.run.response import RunResponse

from app.core import agno_telemetry


@pytest.fixture
def unset_switches(monkeypatch):
    for name in agno_telemetry.AGNO_SWITCHES:
        monkeypatch.delenv(name, raising=False)


def test_apply_turns_telemetry_and_monitoring_off(unset_switches):
    agno_telemetry.apply()

    assert os.environ["AGNO_TELEMETRY"] == "false"
    assert os.environ["AGNO_MONITOR"] == "false"


def test_apply_keeps_an_operators_choice(monkeypatch):
    monkeypatch.setenv("AGNO_TELEMETRY", "true")

    agno_telemetry.apply()

    assert os.environ["AGNO_TELEMETRY"] == "true"


def test_the_app_applies_it_on_import():
    import app  # noqa: F401 — app/__init__.py is what every process imports first

    assert os.environ.get("AGNO_TELEMETRY") == "false"
    assert os.environ.get("AGNO_MONITOR") == "false"


def _finished_agent() -> Agent:
    """An agno Agent at the point it reports a run: its response is in hand."""
    agent = Agent()
    agent.run_response = RunResponse(content="done")
    return agent


async def _reports_sent(agent: Agent) -> int:
    with patch("agno.api.agent.acreate_agent_run", new_callable=AsyncMock) as report, \
         patch("agno.api.agent.create_agent_run") as sync_report:
        await agent._alog_agent_run(session_id="session-1")
        agent._log_agent_run(session_id="session-1")
    return report.await_count + sync_report.call_count


@pytest.mark.asyncio
async def test_an_agent_built_with_agnos_defaults_reports_nothing(unset_switches):
    """Guards the env names against an agno upgrade: Agent() still defaults to
    telemetry=True, and only these variables switch it off at run time."""
    agno_telemetry.apply()
    agent = _finished_agent()
    assert agent.telemetry is True  # agno's own default, overridden per run

    assert await _reports_sent(agent) == 0


@pytest.mark.asyncio
async def test_an_operator_can_still_turn_it_on(monkeypatch):
    """The other half of the guard: with telemetry on, the report does go out -
    so a zero above means switched off, not a test that can't see it."""
    monkeypatch.setenv("AGNO_TELEMETRY", "true")
    agno_telemetry.apply()

    assert await _reports_sent(_finished_agent()) == 2
