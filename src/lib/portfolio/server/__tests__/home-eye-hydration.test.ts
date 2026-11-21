import { runInNewContext } from 'node:vm'
import { describe, expect, it } from 'vitest'
import { homeEyeBootstrap } from '@/components/layout/home-eye-bootstrap'
import { attachHomeEyeDecoration } from '@/components/layout/home-eye-decoration'

// Exercise the parser script before React exists. DOM writes on the SSR
// decoration are recorded separately from the document controller's state.
function firstScreen({ failed = false, entry = '/' } = {}) {
  const writes: string[] = []
  const style = (name: string) => new Proxy({
    setProperty(key: string, value: string) { writes.push(`${name}.${key}=${value}`) },
    removeProperty(key: string) { writes.push(`${name}.remove:${key}`) },
  }, { set(_target, key, value) { writes.push(`${name}.${String(key)}=${value}`); return true } })
  const rect = { left: 24, right: 168, top: 24, bottom: 168, width: 144, height: 144 }
  const root = { dataset: {} as Record<string, string>, style: style('root') }
  const element = (name: string) => ({
    style: style(name),
    dataset: new Proxy({}, { set(_target, key, value) { writes.push(`${name}.data:${String(key)}=${value}`); return true } }),
    getBoundingClientRect: () => rect,
  })
  const grid = element('grid'), slot = element('slot'), mark = element('mark'), ring = element('ring')
  const copy = { offsetWidth: 800, offsetHeight: 250, getBoundingClientRect: () => ({ ...rect, top: 400 }) }
  const hero = { offsetHeight: 900, querySelector: () => copy }
  let disconnected: (() => void) | undefined
  const loader = {
    ...element('loader'), isConnected: true, parentElement: {},
    querySelector: (selector: string) => ({ '.home-eye-grid': grid, '.home-eye-slot': slot, '.home-eye-mark': mark, '.home-eye-ring': ring }[selector]),
  }
  const image = {
    complete: true, naturalWidth: failed ? 0 : 1600, currentSrc: '/images/home/surf-1600.avif',
    decode: () => Promise.resolve(), addEventListener() {}, removeEventListener() {},
  }
  const document = {
    documentElement: root, hidden: false,
    querySelector: (selector: string) => ({
      '.home-eye-loader': loader, '.home-eye-mark': mark, '.home-photo-hero': hero,
      '[data-home-eye-ready]': {}, '.home-photo-media img': image,
    }[selector] ?? null),
    querySelectorAll: () => [],
    addEventListener() {},
    removeEventListener() {},
  }
  class Observer {
    constructor(public callback: () => void) {}
    observe(target: unknown) { if (target === loader.parentElement) disconnected = this.callback }
    disconnect() {}
  }
  const context = {
    window: { MutationObserver: Observer, addEventListener() {}, removeEventListener() {} },
    document, location: { pathname: '/' }, URL,
    performance: { now: () => 10, getEntriesByType: (kind: string) => kind === 'navigation'
      ? [{ name: `http://localhost${entry}`, type: 'navigate' }]
      : [] },
    HTMLImageElement: { prototype: { decode() {} } },
    MutationObserver: Observer, ResizeObserver: Observer,
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    getComputedStyle: () => ({ gridTemplateColumns: '100px 100px 100px 100px', columnGap: '16px', getPropertyValue: () => '1' }),
    innerWidth: 1440, innerHeight: 900, scrollY: 0,
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {}, setTimeout: () => 1, clearTimeout() {},
  }
  runInNewContext(homeEyeBootstrap, context)
  const mount = () => runInNewContext(`(${attachHomeEyeDecoration.toString()})(loader)`, { ...context, loader }) as (() => void) | undefined
  return { root, loader, writes, mount, disconnect: () => { loader.isConnected = false; disconnected?.() } }
}

describe('parser bootstrap hydration ownership', () => {
  it('finishes cache-ready decoding without mutating React-owned decoration attributes', async () => {
    const screen = firstScreen()
    await Promise.resolve()
    await Promise.resolve()
    expect(screen.root.dataset.homeSignature).toBe('slot')
    expect(screen.root.dataset.homeEye).toBeUndefined()
    expect(screen.writes.filter(write => !write.startsWith('root.'))).toEqual([])
    screen.disconnect()
    expect(screen.root.dataset.homeSignature).toBeUndefined()
    expect(screen.writes).toContain('root.remove:--home-eye-columns')
    expect(screen.writes).toContain('root.remove:--home-eye-opacity')
  })

  it('still fails open for a failed selected image before hydration', async () => {
    const screen = firstScreen({ failed: true })
    await Promise.resolve()
    expect(screen.root.dataset.homeEye).toBe('fallback')
    expect(screen.root.dataset.homeSignature).toBeUndefined()
    expect(screen.writes).toEqual([])
  })

  it('attaches a settled decoration on a client entry without arming the cover', () => {
    const screen = firstScreen({ entry: '/projects/metabox' })
    expect(screen.root.dataset.homeSignature).toBeUndefined()
    const dispose = screen.mount()
    expect(screen.root.dataset.homeSignature).toBe('slot')
    expect(screen.root.dataset.homeEye).toBeUndefined()
    expect(screen.mount()).toBeUndefined()
    dispose?.()
    expect(screen.root.dataset.homeSignature).toBeUndefined()
  })
})
