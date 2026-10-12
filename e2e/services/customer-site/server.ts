// A pretend customer website with the ChatterMate widget embedded the way the
// dashboard's install snippet does it. The widget id comes from the query string:
//
//   http://127.0.0.1:13000/?widget=<id>
//
// It has to be a real server on 127.0.0.1: Chrome's Local Network Access check
// blocks a page Playwright fabricates (page.route) from loading the loader and
// calling the API on loopback.
//
// Run: node services/customer-site/server.ts --port 13000 --api <api url> --loader <loader url>

import { createServer } from 'node:http'

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : fallback
}

const port = Number(arg('port', '13000'))
const apiUrl = arg('api', 'http://127.0.0.1:18000/api/v1')
const loaderUrl = arg('loader', 'http://127.0.0.1:15173/webclient/chattermate.min.js')

function page(widgetId: string): string {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Acme Store</title></head>
  <body>
    <h1>Acme Store</h1>
    <script>
      window.chattermateId = ${JSON.stringify(widgetId)};
      window.chattermateBaseUrl = ${JSON.stringify(apiUrl)};
    </script>
    <script src="${loaderUrl}"></script>
  </body>
</html>`
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`)
  if (url.pathname === '/health') {
    res.writeHead(200, { 'content-type': 'text/plain' }).end('ok')
    return
  }
  if (url.pathname !== '/') {
    res.writeHead(404).end()
    return
  }
  const widgetId = url.searchParams.get('widget') ?? ''
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(page(widgetId))
}).listen(port, '127.0.0.1', () => console.log(`[customer-site] http://127.0.0.1:${port}/?widget=<id>`))
