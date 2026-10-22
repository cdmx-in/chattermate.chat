/*
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
*/

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  BASE_URL, FRAME_ORIGIN, WIDGET_ID,
  api, bringUp, cleanupPage, frame, frames, loadLoader, resetPage,
} from './loaderHarness'

/**
 * A page whose Content-Security-Policy has no frame-src for us refuses the widget's
 * frame. The loader then hands over to the in-page loader (the previous release),
 * which builds the chat under the page's own policy - so a site owner who can't
 * edit their server's headers still gets a working chat.
 */
const LOADER_URL = 'https://app.example.com/webclient/chattermate.min.js'
const IN_PAGE_LOADER_URL = 'https://app.example.com/webclient/chattermate-legacy.min.js'

// The loader's listeners for the page's policy reports. A test can't dispatch a
// trusted event (isTrusted is the browser's alone), so it hands the report over.
let policyHandlers: Array<(e: unknown) => void> = []

function refuseFrame(blockedURI: string, effectiveDirective = 'frame-src', isTrusted = true) {
  policyHandlers.slice().forEach((handler) => handler({ blockedURI, effectiveDirective, isTrusted }))
}

const inPageLoader = () =>
  [...document.querySelectorAll('script')].find((s) => s.src === IN_PAGE_LOADER_URL) as HTMLScriptElement | undefined

/** What the in-page loader does once it runs: replaces the public API. */
function runInPageLoader() {
  const legacy = { on: vi.fn(), open: vi.fn(), toggle: vi.fn() }
  ;(window as any).ChatterMate = legacy
  inPageLoader()!.dispatchEvent(new Event('load'))
  return legacy
}

describe('ChatterMate on a page whose policy refuses the frame', () => {
  beforeEach(() => {
    resetPage()
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    // The loader finds the in-page loader beside its own address
    Object.defineProperty(document, 'currentScript', { configurable: true, get: () => ({ src: LOADER_URL }) })
    policyHandlers = []
    const add = document.addEventListener.bind(document)
    vi.spyOn(document, 'addEventListener').mockImplementation((type: string, handler: any, options?: any) => {
      if (type === 'securitypolicyviolation') policyHandlers.push(handler)
      add(type, handler, options)
    })
    const remove = document.removeEventListener.bind(document)
    vi.spyOn(document, 'removeEventListener').mockImplementation((type: string, handler: any, options?: any) => {
      if (type === 'securitypolicyviolation') policyHandlers = policyHandlers.filter((h) => h !== handler)
      remove(type, handler, options)
    })
  })

  afterEach(() => {
    // The document outlives each test: stop this loader listening to it
    const current = (window as any).ChatterMate
    if (current && typeof current.destroy === 'function') current.destroy()
    delete (document as any).currentScript
    cleanupPage()
  })

  it('builds the chat in the page as soon as the policy refuses our frame', async () => {
    await loadLoader()

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame?host=1`)

    expect(frames()).toHaveLength(0)
    expect(inPageLoader()).toBeDefined()
    expect(document.querySelector('.chattermate-error-ui')).toBeNull()
  })

  it('tells the site owner which frame-src would give them the framed chat', async () => {
    await loadLoader()

    refuseFrame(FRAME_ORIGIN)

    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(`frame-src ${FRAME_ORIGIN}`))
  })

  it('keeps the site\'s event listeners and an open chat', async () => {
    await loadLoader()
    const ready = vi.fn()
    api().on('unread', ready)
    api().open()

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame?host=1`)
    const legacy = runInPageLoader()

    expect(legacy.on).toHaveBeenCalledWith('unread', ready)
    expect(legacy.open).toHaveBeenCalled()
  })

  it('falls back when the frame host it was redirected to is refused and the frame never starts', async () => {
    vi.useFakeTimers()
    await loadLoader({ fakeTimers: true })

    // A redirect to the frame host reports only that host
    refuseFrame('https://widget.example.com')
    expect(inPageLoader()).toBeUndefined()
    frame().dispatchEvent(new Event('load'))
    await vi.advanceTimersByTimeAsync(3000)

    expect(inPageLoader()).toBeDefined()
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(`frame-src ${FRAME_ORIGIN} https://widget.example.com`))
    expect(document.querySelector('.chattermate-error-ui')).toBeNull()
  })

  it('never moves a working chat because some other frame on the page was refused', async () => {
    await loadLoader()
    bringUp()

    refuseFrame('https://ads.example.net/slot')

    expect(inPageLoader()).toBeUndefined()
    expect(frames()).toHaveLength(1)
  })

  it('ignores refusals of anything but frames', async () => {
    await loadLoader()

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`, 'img-src')

    expect(inPageLoader()).toBeUndefined()
    expect(frames()).toHaveLength(1)
  })

  it('falls back only once', async () => {
    await loadLoader()

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`)
    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`)

    expect([...document.querySelectorAll('script')].filter((s) => s.src === IN_PAGE_LOADER_URL)).toHaveLength(1)
  })

  it('shows the usual error when there is no address to find the in-page loader by', async () => {
    delete (document as any).currentScript
    vi.useFakeTimers()
    await loadLoader({ fakeTimers: true })

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`)
    frame().dispatchEvent(new Event('load'))
    await vi.advanceTimersByTimeAsync(3000)

    expect(inPageLoader()).toBeUndefined()
    expect(document.querySelector('.chattermate-error-ui')).not.toBeNull()
  })

  it('ignores a report the page itself made up', async () => {
    await loadLoader()

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`, 'frame-src', false)

    expect(inPageLoader()).toBeUndefined()
    expect(frames()).toHaveLength(1)
  })

  it('a refused ad does not turn an unrelated failure into a CSP fallback', async () => {
    vi.useFakeTimers()
    await loadLoader({ fakeTimers: true })

    refuseFrame('https://ads.example.net/slot?id=1')
    frame().dispatchEvent(new Event('load'))
    await vi.advanceTimersByTimeAsync(3000)

    expect(inPageLoader()).toBeUndefined()
    expect(document.querySelector('.chattermate-error-ui')?.textContent).toContain('check the widget ID')
  })

  it('stops listening once the frame has started', async () => {
    await loadLoader()
    bringUp()
    expect(policyHandlers).toHaveLength(0)
  })

  it('passes the site\'s options and the calls made while it loads to the in-page chat', async () => {
    ;(window as any).chattermateConfig = { launcher: false }
    await loadLoader()
    api().init({ position: { side: 'left' } })

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`)
    api().toggle()
    const legacy = runInPageLoader()

    expect((window as any).chattermateConfig).toMatchObject({ launcher: false, position: { side: 'left' } })
    expect(legacy.toggle).toHaveBeenCalledTimes(1)
  })

  it('goes back to the framed widget and its error when the in-page loader can\'t be fetched', async () => {
    vi.useFakeTimers()
    await loadLoader({ fakeTimers: true })
    vi.spyOn(console, 'error').mockImplementation(() => {})

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`)
    inPageLoader()!.dispatchEvent(new Event('error'))
    expect(frames()).toHaveLength(1)
    // Refused again: no second fallback, the framed widget says it can't load
    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`)
    frame().dispatchEvent(new Event('load'))
    await vi.advanceTimersByTimeAsync(3000)

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('chattermate-legacy.min.js'))
    expect(document.querySelector('.chattermate-error-ui')).not.toBeNull()
  })

  it('says so in the console when the in-page chat doesn\'t start either', async () => {
    vi.useFakeTimers()
    await loadLoader({ fakeTimers: true })
    vi.spyOn(console, 'error').mockImplementation(() => {})

    refuseFrame(`${BASE_URL}/widgets/${WIDGET_ID}/frame`)
    runInPageLoader()
    await vi.advanceTimersByTimeAsync(20000)

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('couldn\'t start inside this page either'))
  })
})
