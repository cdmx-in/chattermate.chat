// A pretend customer website with the ChatterMate widget embedded the way the
// dashboard's install snippet does it. Everything about the embed comes from the
// query string:
//
//   http://127.0.0.1:13000/?widget=<id>
//     &config=<json>   → window.chattermateConfig (launcher, position, trigger, …)
//     &token=<jwt>     → window.chattermateToken (token-authenticated widgets)
//     &trigger=1       → adds a page button with data-chattermate-open
//     &snippet=iframe  → the dashboard's iframe snippet instead of the script
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

interface Embed {
  widgetId: string
  config: string | null
  token: string | null
  trigger: boolean
  iframe: boolean
}

/** The dashboard's iframe snippet (AgentWidgetTab), classed so the page object finds it. */
function iframeSnippet(widgetId: string): string {
  const src = `${apiUrl}/widgets/${encodeURIComponent(widgetId)}/frame`
  return `<iframe class="chattermate-iframe" src="${src}" width="100%" height="600" frameborder="0" title="AI Assistant" allow="clipboard-write"></iframe>`
}

function page(embed: Embed): string {
  if (embed.iframe) {
    return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Acme Store</title></head>
  <body>
    <h1>Acme Store</h1>
    ${iframeSnippet(embed.widgetId)}
  </body>
</html>`
  }
  const globals = [
    `window.chattermateId = ${JSON.stringify(embed.widgetId)};`,
    `window.chattermateBaseUrl = ${JSON.stringify(apiUrl)};`,
    // config arrives as JSON text; parse it here so a malformed value fails the request, not the page.
    embed.config ? `window.chattermateConfig = ${JSON.stringify(JSON.parse(embed.config))};` : '',
    embed.token ? `window.chattermateToken = ${JSON.stringify(embed.token)};` : '',
  ].filter(Boolean).join('\n      ')
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Acme Store</title></head>
  <body>
    <h1>Acme Store</h1>
    ${embed.trigger ? '<button type="button" data-chattermate-open>Chat with us</button>' : ''}
    <script>
      ${globals}
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
  const params = url.searchParams
  let html: string
  try {
    html = page({
      widgetId: params.get('widget') ?? '',
      config: params.get('config'),
      token: params.get('token'),
      trigger: params.get('trigger') === '1',
      iframe: params.get('snippet') === 'iframe',
    })
  } catch {
    res.writeHead(400, { 'content-type': 'text/plain' }).end('config is not valid JSON')
    return
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(html)
}).listen(port, '127.0.0.1', () => console.log(`[customer-site] http://127.0.0.1:${port}/?widget=<id>`))
