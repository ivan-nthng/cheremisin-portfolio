import type { RefObject } from 'react'
import { Stopped, type Act } from './stageshow/act'
import type { SceneId } from './scenes'

export type Shot = { x: number; y: number; width: number; height: number }
export type FeatureState = { shot: Shot; query: string }
export const opening: FeatureState = { shot: { x: 52, y: 44, width: 375, height: 600 }, query: '' }
export type Bridge = {
  frame: RefObject<HTMLIFrameElement | null>; width: number; height: number; ready: boolean
  camera: { x: number; y: number }; alive: boolean; visible: boolean; interactive: boolean
  phase: (phase: string) => void; reveal: () => void; cycle: () => void
}
export function nativeDocument(b: Bridge) { return b.frame.current?.contentDocument }
export function nativeButton(b: Bridge, text: string, within?: string) {
  const root = within ? nativeDocument(b)?.querySelector(within) : nativeDocument(b)
  return [...root?.querySelectorAll<HTMLButtonElement>('button') ?? []].find(n => n.textContent?.trim() === text)
}
export function writeQuery(b: Bridge, value: string) {
  const frame = b.frame.current?.contentWindow
  const input = nativeDocument(b)?.querySelector<HTMLInputElement>('[aria-label="Search demo actions"]')
  if (!input || !frame || input.value === value) return
  Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value')?.set?.call(input, value)
  input.dispatchEvent(new (frame as unknown as { Event: typeof Event }).Event('input', { bubbles: true }))
}

/** Every visible change enters through the actual native control and its guards. */
export async function featureLoop(a: Act<FeatureState>, b: Bridge, scene: SceneId, resume = false) {
  const doc = () => nativeDocument(b)!
  const check = () => { if (!b.alive || a.signal.aborted) throw new Stopped() }
  async function until<T>(read: () => T | null | undefined | false, reason: string, timeout = 10000): Promise<T> {
    for (let elapsed = 0; elapsed < timeout; elapsed += 60) {
      check(); const value = read(); if (value) return value; await a.wait(60)
    }
    throw new Error('Native feature loop: ' + reason)
  }
  function key(node: HTMLElement, value: string, metaKey = false, type = 'keydown') {
    const frame = b.frame.current!.contentWindow! as unknown as { KeyboardEvent: typeof KeyboardEvent }
    node.dispatchEvent(new frame.KeyboardEvent(type, { key: value, metaKey, bubbles: true, cancelable: true }))
  }
  function target(node: HTMLElement) {
    const r = node.getBoundingClientRect()
    return { x: Math.min(b.width - 16, Math.max(16, r.x + r.width / 2 - b.camera.x)), y: r.y + r.height / 2 - b.camera.y }
  }
  async function press(node: HTMLButtonElement | undefined | null, hidden = false) {
    if (!node || node.disabled) throw new Error('Native feature loop: action unavailable')
    if (!hidden) { await a.cursor('hand'); await a.click(target(node)) }
    check(); node.click(); await a.wait(hidden ? 80 : 320)
  }
  async function shot(selector: string) {
    const node = await until(() => doc().querySelector<HTMLElement>(selector), 'scene surface missing')
    const area = node.closest<HTMLElement>('[data-right-panel]')
    if (area && area.scrollHeight > area.clientHeight) area.scrollTop += node.getBoundingClientRect().top - area.getBoundingClientRect().top
    let previous: DOMRect | undefined, stable = 0
    const r = await until(() => {
      const next = node.getBoundingClientRect()
      stable = previous && ['x', 'y', 'width', 'height'].every(k => Math.abs((next[k as keyof DOMRect] as number) - (previous![k as keyof DOMRect] as number)) < .05) ? stable + 1 : 0
      previous = next
      return stable >= 3 && next.width > 0 ? next : false
    }, 'scene geometry did not settle')
    // Offscreen WebKit can hold a native drawer at its translated opening pose.
    // Frame the settled layout, not that temporary entrance displacement.
    let x = r.x, y = r.y
    for (let parent: HTMLElement | null = node; parent && parent !== doc().body; parent = parent.parentElement) {
      if (!parent.hasAttribute('data-demo-presence')) continue
      const transform = new DOMMatrix(getComputedStyle(parent).transform)
      x -= transform.m41; y -= transform.m42
    }
    await a.snap({ shot: { x, y, width: r.width, height: r.height } })
  }
  async function reply(hidden: boolean) {
    const input = doc().querySelector<HTMLTextAreaElement>('textarea')!
    if (hidden) await press(doc().querySelector<HTMLButtonElement>('[aria-label="Prepare suggested reply"]'), true)
    else {
      await a.cursor('ibeam')
      const r = input.getBoundingClientRect()
      await a.click({ x: r.x + 18 - b.camera.x, y: r.y + 30 - b.camera.y })
      input.focus({ preventScroll: true })
      // Clear the words once, then leave the desktop arrow parked through Tab.
      await a.cursor('pointer')
      await a.move({ x: r.x - 12 - b.camera.x, y: r.y + 12 - b.camera.y })
      // Focus can be retained or refused in an inert presentation document.
      // Use the existing guarded preparation action if no focus preview appeared.
      const preview = doc().querySelector<HTMLButtonElement>('[aria-label="Accept suggested reply"]')
      if (!preview || preview.disabled) await press(doc().querySelector<HTMLButtonElement>('[aria-label="Prepare suggested reply"]'), true)
    }
    const accept = await until(() => { const n = doc().querySelector<HTMLButtonElement>('[aria-label="Accept suggested reply"]'); return n && !n.disabled && n }, 'native suggestion unavailable')
    if (!hidden) {
      const previewId = input.getAttribute('aria-describedby')?.split(' ').find(id => id.endsWith('-preview'))
      const text = previewId ? doc().getElementById(previewId)?.textContent : ''
      if (!text) throw new Error('Native feature loop: approved suggestion text missing')
      b.phase('Typing the prepared reply')
      for (const [index, letter] of [...text.slice(0, 14)].entries()) {
        key(input, letter)
        await until(() => input.value.length === index + 1 && input.selectionStart === index + 1, 'native typing/caret did not advance')
        if (index === 6) a.mark('chat-typing')
        await a.wait(80)
      }
      a.mark('chat-typed'); await a.wait(700)
    }
    if (hidden) await press(accept, true)
    else {
      // The existing native keycap shows a keyboard press; the pointer does not click it.
      accept.dataset.pressed = 'true'; a.mark('chat-tab-pressed')
      try { await a.wait(140); check(); key(input, 'Tab'); key(input, 'Tab', false, 'keyup') }
      finally { accept.removeAttribute('data-pressed') }
    }
    await until(() => input.value.length > 14, 'native reply not accepted')
    if (!hidden) { a.mark('chat-prepared'); await a.wait(3000) }
    await press(nativeButton(b, 'Send'), hidden)
    if (!hidden) { a.mark('chat-sent'); b.phase('Johnston Serenity is typing') }
    await until(() => doc().body.textContent?.includes('Yes, it was my latest trip'), 'actual rider response missing', 6000)
  }
  async function palette() {
    const input = doc().querySelector<HTMLTextAreaElement>('textarea')!
    input.focus({ preventScroll: true })
    key(input, 'a', true)
    await until(() => doc().querySelector<HTMLDialogElement>('[aria-label="Demo action menu"]')?.open, 'native palette did not open')
  }
  const track = () => doc().querySelector<HTMLElement>('[aria-label="Geographic trip track"]')!
  const beforeOrder = () => doc().querySelector<HTMLButtonElement>('button[aria-label^="Before order at"]')
  const beforePeople = () => { const text = track().querySelector('[aria-label="Trip participants"]')?.textContent; return text?.includes('Before the order') && text.includes('Waiting at pickup') }

  await until(() => b.ready && doc()?.querySelector('[data-native-ready=true]') && doc().fonts.status === 'loaded', 'native document did not finish hydration/fonts', 15000)
  if (resume) {
    // Wait for the native document to relinquish manual focus before resetting it.
    await until(() => doc().querySelector('[data-native-interactive=false]'), 'native input handoff did not settle')
    const close = doc().querySelector<HTMLButtonElement>('[aria-label="Close action menu"]')
    if (close && doc().querySelector<HTMLDialogElement>('[aria-label="Demo action menu"]')?.open) await press(close, true)
    if (scene === 'chat') {
      await press(doc().querySelector<HTMLButtonElement>('button[aria-label="Restart"]'), true)
      await until(() => doc().querySelector<HTMLTextAreaElement>('textarea')?.value === '' && !doc().body.textContent?.includes('Yes, it was my latest trip'), 'native conversation reset after manual input')
    }
    if (scene === 'issue') await press(nativeButton(b, 'Info', '[aria-label="Trip context"]'), true)
    if (scene === 'details' && nativeButton(b, 'Details', '[aria-label="Order information"]')) await press(nativeButton(b, 'Details', '[aria-label="Order information"]'), true)
    await a.snap({ query: '' })
  }
  if ((scene === 'details' || scene === 'map') && !doc().querySelector('[aria-label="Order details"]') && !doc().querySelector('[aria-label="Geographic trip track"]')) {
    if (!doc().body.textContent?.includes('Yes, it was my latest trip')) await reply(true)
    await palette()
    await press(await until(() => nativeButton(b, 'Payment Actions'), 'payment action missing'), true)
    await until(() => doc().querySelector('[aria-label="Order details"]'), 'native order did not open')
    await press(nativeButton(b, 'Details', '[aria-label="Order information"]'), true)
  }
  if (scene === 'map') {
    if (!track()) await press(nativeButton(b, 'Show On Map', '[aria-label="Order details"]'), true)
    // Preparation may run before entry; stop the native clock as soon as it exists.
    await until(() => track(), 'native track did not mount')
    const pause = nativeButton(b, 'Pause', '[aria-label="Geographic trip track"]')
    if (pause) await press(pause, true)
    await until(() => track()?.dataset.mapState === 'ready', 'street map unavailable', 16000)
    await press(beforeOrder(), true)
    await until(() => track().dataset.playback === 'paused' && track().dataset.inspecting === 'true' && beforePeople(), 'native opening event/participants not selected')
  }
  const selector = scene === 'issue' ? '[aria-label="Issue and trip context"]' : scene === 'chat' || scene === 'actions' ? '[aria-label="Fictional conversation"]' : scene === 'details' ? '[aria-label="Order details"]' : '[aria-label="Geographic trip track"]'
  await shot(selector)
  check(); b.reveal()
  // The adapter bounds preparation lifetime. A ready scene holds its genuine
  // opening state; cursor/action playback starts only inside the usable viewport.
  await until(() => b.visible, 'prepared scene never became visible', 30000)
  a.mark(scene + '-opening'); b.phase('Opening · ' + scene); await a.wait(900)

  while (b.alive) {
    if (scene === 'issue') await press(nativeButton(b, 'Scripts', '[aria-label="Trip context"]'))
    if (scene === 'chat') await reply(false)
    if (scene === 'actions') {
      await palette()
      await until(() => doc().querySelector<HTMLDialogElement>('[aria-label="Demo action menu"]')?.open, 'desktop Command-A did not open the native palette')
      a.mark('actions-open'); await a.wait(600)
      const input = doc().querySelector<HTMLInputElement>('[aria-label="Search demo actions"]')!
      await a.cursor('ibeam'); await a.click(target(input))
      await a.type('query', 'Payment', { interval: 110 }); await a.wait(200)
      await until(() => nativeButton(b, 'Payment Actions') && input.value === 'Payment', 'native filter did not update')
      const result = nativeButton(b, 'Payment Actions')!
      await a.cursor('hand'); await a.move(target(result))
    }
    if (scene === 'details') await press(nativeButton(b, 'Payment', '[aria-label="Order information"]'))
    if (scene === 'map') {
      await press(nativeButton(b, 'Play', '[aria-label="Geographic trip track"]'))
      await until(() => track().dataset.playback === 'playing', 'native track did not play')
      await until(() => track().textContent?.includes('Rider onboard') && track().textContent?.includes('In the car'), 'native pickup payoff not reached', 20000)
      await press(nativeButton(b, 'Pause', '[aria-label="Geographic trip track"]'))
      await until(() => track().dataset.playback === 'paused', 'native pickup did not pause')
    }
    check(); a.mark(scene + '-payoff'); b.phase(scene === 'chat' ? 'Actual rider reply received' : 'Payoff · ' + scene)
    await a.wait(scene === 'chat' ? 6000 : 2400)
    if (scene === 'map') {
      const driver = doc().querySelector<HTMLButtonElement>('[data-person="driver"]')
      const passenger = doc().querySelector<HTMLButtonElement>('[data-participant="rider"]')
      if (!driver || !passenger) throw new Error('Native participant controls missing')
      const frame = b.frame.current!.contentWindow! as unknown as { MouseEvent: typeof MouseEvent }
      await a.cursor('hand'); await a.move(target(driver))
      driver.dispatchEvent(new frame.MouseEvent('mouseover', { bubbles: true }))
      await until(() => doc().querySelector('[data-participant="driver"]')?.getAttribute('data-highlighted') === 'true', 'native card hover did not highlight driver')
      a.mark('map-person-hover'); b.phase('Driver card highlights the native marker'); await a.wait(900)
      await press(driver)
      driver.dispatchEvent(new frame.MouseEvent('mouseout', { bubbles: true }))
      await until(() => driver.getAttribute('aria-pressed') === 'true', 'native participant selection missing')
      a.mark('map-person-selected'); await a.wait(900)
      await a.move(target(passenger)); passenger.dispatchEvent(new frame.MouseEvent('mouseenter'))
      await press(passenger)
      await until(() => doc().querySelector('[data-person="rider"]')?.getAttribute('aria-pressed') === 'true', 'native marker did not select passenger card')
      a.mark('map-marker-selected'); b.phase('Passenger marker selects the matching card'); await a.wait(900)
      passenger.dispatchEvent(new frame.MouseEvent('mouseleave'))
      const point = doc().querySelector<HTMLButtonElement>('button[data-event="A"]')
      if (!point) throw new Error('Native feature loop: pickup inspection point missing')
      await a.cursor('hand'); await a.move(target(point))
      point.dispatchEvent(new frame.MouseEvent('mouseenter'))
      await until(() => doc().querySelector('.maplibregl-popup-content')?.textContent?.includes('Pickup'), 'native point tooltip not shown')
      a.mark('map-inspection'); b.phase('Inspect the native pickup point'); await a.wait(2400)
    }
    b.phase('Resetting · ' + scene)
    if (scene === 'chat') {
      await press(doc().querySelector<HTMLButtonElement>('button[aria-label="Restart"]'), true)
      await until(() => !doc().body.textContent?.includes('Yes, it was my latest trip') && doc().querySelector<HTMLTextAreaElement>('textarea')?.value === '', 'native conversation did not reset')
      await shot(selector)
      check()
    }
    if (scene === 'issue') await press(nativeButton(b, 'Info', '[aria-label="Trip context"]'))
    if (scene === 'actions') {
      await press(doc().querySelector<HTMLButtonElement>('[aria-label="Close action menu"]'))
      await until(() => !doc().querySelector<HTMLDialogElement>('[aria-label="Demo action menu"]')?.open, 'native sheet did not close')
      await a.snap({ query: '' })
    }
    if (scene === 'details') await press(nativeButton(b, 'Details', '[aria-label="Order information"]'))
    if (scene === 'map') { await press(beforeOrder()); await until(() => beforePeople(), 'native reset participants not restored') }
    check(); a.mark(scene + '-reset'); b.phase('Native reset · ' + scene); b.cycle(); await a.wait(800)
  }
}
