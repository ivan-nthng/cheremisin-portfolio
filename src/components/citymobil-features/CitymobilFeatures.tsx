'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MapAttribution } from '@/components/citymobil-demo/MapAttribution'
import { CaseExpandTrigger } from '@/components/portfolio/case-story/CaseExpandTrigger'
import { Stage } from './stageshow/stage'
import { useReducedMotion } from './stageshow/reduced-motion'
import { Stopped, createPlaybackClock, type Act } from './stageshow/act'
import { featureLoop, opening, writeQuery, type Bridge, type FeatureState } from './story'
import { scenes, sceneIds, sceneUrl, type SceneId } from './scenes'
import styles from './features.module.css'
import compatibility from './stage-host.module.css'

type Disposal = { canvases: number; simulators: number }

function NativeCamera({ state, bridge, scene, retained, interactive }: { state: FeatureState; bridge: Bridge; scene: SceneId; retained: boolean; interactive: boolean }) {
  const initialWidth = useRef(bridge.width).current
  const committedShot = useRef(state.shot)
  const shot = bridge.interactive ? committedShot.current : state.shot
  useLayoutEffect(() => { committedShot.current = shot }, [shot])
  const source = '/preview/citymobil-features?native=1&scene=' + scene + '&width=' + (retained ? initialWidth : bridge.width) + (retained && scene === 'map' ? '&basemap=local' : '')
  useEffect(() => { if (!bridge.interactive) writeQuery(bridge, state.query) }, [bridge, state.query])
  const request = useRef({ interactive, sequence: 0 })
  if (request.current.interactive !== interactive) request.current = { interactive, sequence: request.current.sequence + 1 }
  const [acknowledged, setAcknowledged] = useState(-1)
  const control = useCallback(() => {
    bridge.frame.current?.contentWindow?.postMessage({ type: 'cm-feature-control', sequence: request.current.sequence, interactive, crop: { x: shot.x, y: shot.y, width: bridge.width, height: bridge.height } }, location.origin)
  }, [bridge, interactive, shot])
  useLayoutEffect(control, [control])
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.source !== bridge.frame.current?.contentWindow || event.origin !== location.origin) return
      if (event.data?.type === 'cm-feature-ready') control()
      if (event.data?.type === 'cm-feature-controlled' && event.data.sequence === request.current.sequence) setAcknowledged(event.data.sequence)
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [bridge, control])
  // The native handlers must commit the requested mode before accepting input.
  const controlled = interactive && acknowledged === request.current.sequence
  const r = shot
  // One native surface at 1:1; its document viewport fills the scene without an outer gutter.
  bridge.camera = { x: r.x, y: r.y }
  const nativeWidth = Math.max(802, 427 + bridge.width), nativeHeight = bridge.height + 44
  return <iframe ref={bridge.frame} className={styles.nativeFrame} title="Native fictional Citymobil scene" src={source} onLoad={() => bridge.frame.current?.contentWindow?.postMessage({ type: 'cm-feature-connect' }, location.origin)} width={nativeWidth} height={nativeHeight} tabIndex={controlled ? 0 : -1} inert={!controlled} aria-hidden={!controlled} data-interactive={controlled}
    style={{ width: nativeWidth, height: nativeHeight, transform: `translate(${-bridge.camera.x}px,${-bridge.camera.y}px)`, clipPath: `inset(${Math.max(0,r.y)}px ${Math.max(0,nativeWidth-r.x-bridge.width)}px ${Math.max(0,nativeHeight-r.y-bridge.height)}px ${Math.max(0,r.x)}px round var(--feature-radius))` }}/>
}

function Story({ scene, width, height, phase, reveal, cycle, onDisposed, onFailure, onTakeover, stopping, visible, prepareOffscreen, retained, interactive, manual }: { scene: SceneId; width: number; height: number; phase: (value: string) => void; reveal: () => void; cycle: () => void; onDisposed: (result?: Disposal) => void; onFailure: () => void; onTakeover: () => void; stopping: boolean; visible: boolean; prepareOffscreen: boolean; retained: boolean; interactive: boolean; manual: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const interrupt = useRef<(() => void) | null>(null)
  const [playback] = useState(createPlaybackClock)
  const prepared = useRef(false)
  const bridge = useRef<Bridge>({ frame, width, height, ready: false, camera: { x: 0, y: 0 }, alive: true, visible, interactive, phase, reveal, cycle }).current
  bridge.width = width
  bridge.height = height
  bridge.visible = visible
  bridge.interactive = manual
  const park = useCallback(() => {
    if (!retained) return
    const parked = document.hidden || (prepared.current && !bridge.visible)
    playback.setPaused(parked || prepared.current && bridge.interactive)
    frame.current?.contentWindow?.postMessage({ type: 'cm-feature-suspend', parked }, location.origin)
  }, [bridge, playback, retained])
  bridge.reveal = () => { prepared.current = true; park(); reveal() }
  useLayoutEffect(() => {
    park()
    document.addEventListener('visibilitychange', park)
    return () => document.removeEventListener('visibilitychange', park)
  }, [park, visible, manual])
  useLayoutEffect(() => {
    if (!interactive) return
    const takeOver = (event: Event) => {
      if ((event as CustomEvent<HTMLIFrameElement>).detail !== frame.current) return
      bridge.interactive = true
      interrupt.current?.()
      onTakeover()
    }
    window.addEventListener('cm-feature-takeover', takeOver)
    return () => window.removeEventListener('cm-feature-takeover', takeOver)
  }, [bridge, interactive, onTakeover])
  useEffect(() => { if (retained) frame.current?.contentWindow?.postMessage({ type: 'cm-feature-resize', width }, location.origin) }, [retained, width])
  useLayoutEffect(() => { bridge.alive = true; return () => { bridge.alive = false } }, [bridge])
  useEffect(() => {
    const nativeFrame = (node: HTMLElement) => node instanceof HTMLIFrameElement && Boolean(node.closest('[data-native-feature]'))
    let hostFocus = document.activeElement instanceof HTMLElement && !nativeFrame(document.activeElement) ? document.activeElement : document.body
    const rememberFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement && !nativeFrame(event.target)) {
        hostFocus = event.target
      }
    }
    const focus = (event: Event) => {
      if ((event as CustomEvent<HTMLIFrameElement>).detail !== frame.current || bridge.interactive) return
      // Capture the host at this focus event. A preceding scripted action can
      // predate an intentional user scroll or a Result/Process transition.
      const left = window.scrollX, top = window.scrollY
      const target = hostFocus.isConnected ? hostFocus : document.body
      if (document.activeElement === frame.current) {
        // Blurring an iframe alone can leave WebKit's keyboard focus inside it.
        // Restore the actual host target, including the initially focused body.
        const temporary = (target === document.body || target === document.documentElement) && !target.hasAttribute('tabindex')
        if (temporary) target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
        if (temporary) target.removeAttribute('tabindex')
      }
      // Native fragments already reveal only their own panels. Repair any
      // synchronous focus jump, never replay an old Y over later user scroll.
      if (window.scrollX !== left || window.scrollY !== top) window.scrollTo({ left, top, behavior: 'instant' })
    }
    const receive = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== location.origin) return
      if (event.data?.type === 'cm-feature-ready') {
        bridge.ready = true
        if (retained) frame.current?.contentWindow?.postMessage({ type: 'cm-feature-resize', width: bridge.width }, location.origin)
        park()
      }
      if (event.data?.type === 'cm-feature-ready' && !bridge.alive) frame.current?.contentWindow?.postMessage({ type: 'cm-feature-dispose' }, location.origin)
      if (event.data?.type === 'cm-feature-disposed') { onDisposed(event.data); window.dispatchEvent(new CustomEvent('cm-feature-disposed', { detail: event.data })) }
    }
    window.addEventListener('message', receive); window.addEventListener('cm-feature-focus-sync', focus)
    document.addEventListener('focusin', rememberFocus)
    return () => {
      window.removeEventListener('message', receive); window.removeEventListener('cm-feature-focus-sync', focus)
      document.removeEventListener('focusin', rememberFocus)
    }
  }, [bridge, onDisposed, retained, park])
  useEffect(() => {
    if (!stopping) return
    bridge.alive = false
    frame.current?.contentWindow?.postMessage({ type: 'cm-feature-dispose' }, location.origin)
    // A still-loading frame has no React tree yet; removal is safe after its load boundary.
    if (!frame.current?.contentDocument?.querySelector('#citymobil-demo')) onDisposed()
  }, [stopping, bridge, onDisposed])
  const script = useCallback(async (a: Act<FeatureState>) => {
    if (stopping) return
    try {
      const resume = prepared.current
      prepared.current = false; park()
      await featureLoop(a, bridge, scene, resume)
    }
    catch (error) { if (!(error instanceof Stopped)) { console.error('Native ' + scene + ' loop failed', error); onFailure() } }
  }, [bridge, stopping, onFailure, scene, park])
  return <div className={compatibility.host}>
    <Stage width={width} height={height} initial={opening} poster={opening} script={script} manual={manual} interrupt={retained ? interrupt : undefined} prepareReduced={retained} play="once" prepareOffscreen={prepareOffscreen} playbackClock={retained ? playback : undefined} fidelity="realistic" cursor={{ at: { x: 300, y: height - 60 }, idle: false, ripple: false, style: 'real' }} className={styles.presentation}>
      {state => <NativeCamera state={state} bridge={bridge} scene={scene} retained={retained} interactive={interactive}/>}
    </Stage>
  </div>
}

type FeatureProps = { scene: SceneId; embedded?: boolean; gallery?: boolean; paused?: boolean; suspended?: boolean; retained?: boolean; interactive?: boolean; prepare?: boolean; preparing?: boolean; prepared?: boolean; preparationFailed?: boolean; onPrepared?: () => void; onPreparationFailed?: () => void; onExpand?: (entry: HTMLButtonElement) => void }

export default function CitymobilFeatures(props: FeatureProps) { return <FeatureInstance {...props}/> }

function FeatureInstance({ scene, embedded = false, gallery = false, paused = false, suspended = false, retained = false, interactive = false, prepare = false, preparing = false, prepared = false, preparationFailed = false, onPrepared, onPreparationFailed, onExpand }: FeatureProps) {
  const host = useRef<HTMLDivElement>(null)
  const requested = useRef(false), wasInteractive = useRef(false), didPrepare = useRef(false)
  const onPreparedRef = useRef(onPrepared), onPreparationFailedRef = useRef(onPreparationFailed)
  onPreparedRef.current = onPrepared
  onPreparationFailedRef.current = onPreparationFailed
  if (interactive) requested.current = true
  const inView = useRef(false)
  const navigation = useRef<string | null>(null)
  const cleanup = useRef<Disposal | null>(null)
  const [{ width, height }, setSize] = useState({ width: 375, height: scenes[scene].height as number })
  const [active, setActive] = useState(false)
  const [stopping, setStopping] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [taken, setTaken] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [entered, setEntered] = useState(false)
  const [looping, setLooping] = useState(true)
  const [available, setAvailable] = useState(false)
  const [run, setRun] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [ready, setReady] = useState(false)
  const [phase, setPhase] = useState('Preparing preview')
  const [creditsOpen, setCreditsOpen] = useState(true)
  const reduced = useReducedMotion()
  const definition = scenes[scene]
  if (prepared) didPrepare.current = true
  useEffect(() => setReady(true), [])
  useLayoutEffect(() => {
    if (wasInteractive.current && !interactive && (taken || reduced)) {
      setTaken(false); setRestoring(true); setRevealed(false)
    }
    wasInteractive.current = interactive
  }, [interactive, taken, reduced])
  const takeOver = useCallback(() => setTaken(true), [])
  const reveal = useCallback(() => {
    setRestoring(false); setRevealed(true)
    if (!didPrepare.current) { didPrepare.current = true; onPreparedRef.current?.() }
  }, [])
  const cycle = useCallback(() => setCycles(n => n + 1), [])
  const fail = useCallback(() => {
    if (!didPrepare.current) onPreparationFailedRef.current?.()
    setLooping(false); setRevealed(false); setStopping(true); setPhase('Preview interrupted · Replay to try again')
  }, [])
  const dispose = useCallback((result?: Disposal) => {
    cleanup.current = result ? { canvases: result.canvases, simulators: result.simulators } : null
    setActive(false); setStopping(false); setRevealed(false)
    if (navigation.current) window.location.assign(navigation.current)
  }, [])
  useLayoutEffect(() => {
    let measuredWidth = 0, measuredHeight = 0
    let frame = 0
    const measure = () => {
      frame = 0
      const width = Math.round(host.current!.clientWidth), height = Math.round(host.current!.clientHeight)
      if (measuredWidth === width && measuredHeight === height) return
      measuredWidth = width; measuredHeight = height
      if (!retained) setRevealed(false)
      setSize(previous => previous.width === width && previous.height === height ? previous : { width, height })
    }
    const resize = new ResizeObserver(() => { if (!frame) frame = requestAnimationFrame(measure) })
    resize.observe(host.current!); return () => { resize.disconnect(); cancelAnimationFrame(frame) }
  }, [retained])
  useEffect(() => {
    const update = () => {
      let visible = inView.current && !document.hidden
      if (retained && visible) for (let node: HTMLElement | null = host.current; node && node !== document.body; node = node.parentElement) {
        const css = getComputedStyle(node)
        if (Number(css.opacity) === 0 || css.visibility === 'hidden' || css.display === 'none') { visible = false; break }
      }
      setAvailable(visible)
    }
    let observer: IntersectionObserver
    const observe = () => {
      observer?.disconnect()
      const header = retained ? document.querySelector('.context-header')?.getBoundingClientRect().height ?? 0 : 0
      const nav = retained ? document.querySelector('nav[aria-label="Citymobil case views"]') : null
      const bottom = nav && getComputedStyle(nav).position === 'fixed' ? nav.getBoundingClientRect().height : 0
      observer = new IntersectionObserver(entries => { inView.current = Boolean(entries.at(-1)?.isIntersecting); update() }, { rootMargin: `-${header}px 0px -${bottom}px 0px` })
      observer.observe(host.current!)
    }
    observe(); window.addEventListener('resize', observe)
    // Observe only visibility state. Native layout, clipping and opacity belong
    // to the real ancestors; nothing is copied into a separate painted layer.
    const visibility = new MutationObserver(update)
    const ancestors: HTMLElement[] = []
    if (retained) for (let node = host.current!.parentElement; node && node !== document.body; node = node.parentElement) {
      visibility.observe(node, { attributes: true, attributeFilter: ['style', 'class', 'hidden', 'data-reveal'] })
      node.addEventListener('transitionend', update)
      ancestors.push(node)
    }
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); window.removeEventListener('resize', observe); visibility.disconnect(); ancestors.forEach(node => node.removeEventListener('transitionend', update)); document.removeEventListener('visibilitychange', update) }
  }, [retained])
  useEffect(() => {
    if (available && revealed) setEntered(true)
  }, [available, revealed])
  useEffect(() => {
    // Disposal owns its completion. Reasserting stopping in the same effect
    // flush can otherwise leave a resized, already-removed frame stuck here.
    const wanted = (retained ? prepare : available && !paused && !suspended) && (!reduced || retained && requested.current) && looping
    if (active && !stopping && !wanted) { setRevealed(false); setStopping(true) }
    else if (ready && wanted && !active && !stopping) {
      setRun(n => n + 1); setPhase('Preparing preview'); setRevealed(false); setActive(true)
    }
  }, [ready, available, reduced, paused, suspended, looping, active, stopping, retained, interactive, prepare])
  function replay() {
    setCycles(0); setLooping(true)
    if (active) { setRevealed(false); setStopping(true) }
  }
  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    if (!active) { window.location.assign(href); return }
    navigation.current = href; setLooping(false); setRevealed(false); setStopping(true)
  }
  const failed = phase.startsWith('Preview interrupted')
  const playing = !suspended && (available || interactive) && (interactive && taken || !paused && !reduced)
  const still = reduced || paused || !looping
  const staticPreview = (reduced || paused) && !interactive
  const showPreparing = !still && !restoring && !revealed && (!retained || preparing || active && !didPrepare.current)
  const status = reduced ? 'Reduced motion · static ' + definition.title : paused || !looping ? (failed ? phase : retained ? 'Paused' : 'Paused · Play starts a fresh loop') : retained && preparationFailed ? 'Preparation failed · Retry' : retained && !prepare ? 'Queued for page preparation' : didPrepare.current ? (available ? phase : 'Ready · waiting for visibility') : !available && !retained ? 'Preview waits until visible' : !revealed ? 'Preparing preview' : phase
  const Wrapper = embedded ? 'div' : 'main'
  return <Wrapper id={embedded ? undefined : 'main-content'} className={embedded ? styles.embedded : styles.page} data-feature-embed={embedded || undefined} data-feature-gallery={gallery || undefined} data-feature-retained={retained || undefined} data-scene={scene} data-feature-interactive={interactive} data-feature-still={staticPreview}>
    {!embedded && <header><h1>Citymobil / {definition.title}</h1><p>{definition.description} Fictional local demonstration.</p></header>}
    {!embedded && <div className={styles.controls}>
      <button type="button" disabled={!ready || reduced} onClick={() => {
        setLooping(value => !value)
        if (active) { setRevealed(false); setStopping(true) }
      }}>{looping ? 'Pause loop' : 'Play loop'}</button>
      <button type="button" disabled={!ready || reduced} onClick={replay}>Replay</button>
    </div>}
    <p className={embedded ? styles.srOnly : styles.phase} role="status" aria-live={embedded ? 'off' : undefined}>{status}</p>
    <div ref={host} className={styles.media} style={embedded ? undefined : { height: definition.height }} data-native-feature data-feature-slot={retained ? scene : undefined} data-preparation-state={retained ? preparationFailed ? 'failed' : didPrepare.current ? 'ready' : preparing ? 'preparing' : 'queued' : undefined} data-preparation-ready={retained ? didPrepare.current : undefined} data-preparation-requested={retained ? preparing : undefined} data-parked={!playing} data-scene={scene} data-entered={entered} data-revealed={revealed} data-loop-count={cycles} data-visible={available} data-playback={stopping ? 'disposing' : active ? revealed ? playing ? 'playing' : 'ready' : 'preparing' : 'paused'} data-native-cleanup={cleanup.current ? JSON.stringify(cleanup.current) : undefined}>
      {active && <div className={styles.sceneLayer} data-revealed={revealed}>
        <Story key={retained ? run : `${run}-${width}-${height}`} scene={scene} width={width} height={height} phase={setPhase} reveal={reveal} cycle={cycle} onDisposed={dispose} onFailure={fail} onTakeover={takeOver} stopping={stopping} visible={playing} prepareOffscreen={retained} retained={retained} interactive={interactive && revealed} manual={revealed && (taken || reduced)}/>
      </div>}
      {(!revealed || staticPreview) && <>
        <img draggable={false} className={`${styles.scenePoster}${showPreparing ? ` ${styles.loadingPoster}` : ''}`} src={'/images/citymobil/features/' + scene + '.webp'} alt={still ? 'Static native ' + definition.title + ' payoff; fictional demonstration' : ''} width={375} height={definition.height}/>
        {showPreparing && <div className={styles.preparing}><span className={styles.loader} aria-hidden="true"/>Preparing {definition.title}…</div>}
        {failed && <div className={styles.failure}><p>Preview interrupted.</p><button type="button" onClick={replay}>Try again</button></div>}
      </>}
      {onExpand && <CaseExpandTrigger title={definition.title} hidden={interactive}
        disabled={!revealed && !reduced && !restoring} available={revealed || reduced} onExpand={onExpand} />}
      {scene === 'map' && embedded && retained &&
        <p className={styles.mapSource} data-map-credit><MapAttribution linked={!interactive} /></p>}
    </div>
    {scene === 'map' && !gallery && !retained && <details className={styles.attribution} open={creditsOpen} onToggle={event => setCreditsOpen(event.currentTarget.open)}><summary>Map sources</summary><p><MapAttribution/></p></details>}
    {!embedded && <><p>Independent native-code loop. Pause disposes the application; Play and Replay start fresh. Fictional prepared data, with no live service connected.</p>
    <nav className={styles.links} aria-label="Feature previews">
      <Link href="/preview/citymobil-features" prefetch={false} onClick={event => navigate(event, '/preview/citymobil-features')}>All previews</Link>
      {sceneIds.map(id => <Link key={id} href={sceneUrl(id)} prefetch={false} aria-current={id === scene ? 'page' : undefined} onClick={event => navigate(event, sceneUrl(id))}>{scenes[id].title}</Link>)}
    </nav></>}
  </Wrapper>
}
