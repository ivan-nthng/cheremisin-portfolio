import { useEffect, useId, useRef, useState } from 'react'
import { Button, Card, Dot, Link, Live, MediaFooter, RoundPlayButton, Tag, Text } from '@hito-ds/react'
import { loadSoundCloud, playerUrl, trackUrl, type SoundCloudEvent, type SoundCloudWidget } from './soundcloud-player'
import styles from './case.module.css'

function formatTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export function CasePlayer() {
  const host = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const engine = useRef<SoundCloudWidget | undefined>(undefined)
  const [state, setState] = useState<'loading' | 'paused' | 'playing' | 'failed'>('loading')
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState<number>()
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const trackList = useId()

  useEffect(() => {
    let active = true
    let widget: SoundCloudWidget | undefined
    let visible = true
    const bound: string[] = []
    const pause = () => widget?.pause()
    const fail = () => { setState('failed'); pause() }
    const timer = window.setTimeout(fail, 20_000)
    const visibility = () => { if (document.hidden) pause() }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible) pause()
    })
    if (host.current) observer.observe(host.current)
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('pagehide', pause)
    loadSoundCloud().then(factory => {
      if (!active || !frame.current) return
      const sound = factory(frame.current)
      engine.current = widget = sound
      function bind(name: string, handler: (event?: SoundCloudEvent) => void) {
        const event = factory.Events[name]
        bound.push(event)
        sound.bind(event, payload => { if (active) handler(payload) })
      }
      bind('READY', () => {
        clearTimeout(timer)
        setState('paused')
        sound.getDuration(value => { if (active && Number.isFinite(value) && value > 0) setDuration(value) })
        sound.getPosition(value => { if (active && Number.isFinite(value) && value >= 0) setPosition(value) })
      })
      function progress(event?: SoundCloudEvent) {
        const value = event?.currentPosition
        if (value !== undefined && Number.isFinite(value) && value >= 0) setPosition(value)
      }
      bind('PLAY_PROGRESS', progress)
      bind('SEEK', progress)
      bind('PLAY', () => {
        if (!visible || document.hidden) pause()
        else setState('playing')
      })
      bind('PAUSE', () => setState(current => current === 'playing' ? 'paused' : current))
      bind('FINISH', () => {
        setState('paused')
        setPosition(0)
        sound.seekTo(0)
        pause()
      })
      bind('ERROR', () => { clearTimeout(timer); fail() })
    }).catch(() => { if (active) { clearTimeout(timer); fail() } })
    return () => {
      active = false
      clearTimeout(timer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('pagehide', pause)
      bound.forEach(event => widget?.unbind(event))
      pause()
      engine.current = undefined
    }
  }, [])

  const playing = state === 'playing'
  const elapsed = duration === undefined ? undefined : Math.min(position, duration)
  const time = elapsed === undefined || duration === undefined ? '–:– / –:–' : `${formatTime(elapsed)} / ${formatTime(duration)}`
  const progress = elapsed === undefined || duration === undefined ? undefined
    : { value: elapsed, max: duration, valueText: `${formatTime(elapsed)} of ${formatTime(duration)}`, label: 'Playback progress' }

  return <div ref={host} className={styles.player} data-hito-native="" data-hito-theme="neutral" data-hito-color-scheme="light" data-audio-state={state}>
    <Card size="compact" layout="fixed" elevation="raised" className={styles.card}>
      <div className={styles.cardBody}>
        <picture className={styles.photo}>
          <source media="(max-width: 767px)" type="image/webp" srcSet="/images/hito/case/coastal-session-mobile.webp" width={1000} height={667} />
          <img className={styles.photoSource} src="/images/hito/case/coastal-session-desktop.webp" alt="Surfers waiting in calm coastal water beneath a cloudy sky"
            width={1200} height={800} fetchPriority="high" />
        </picture>
        <Live className={styles.live} />
        <div className={styles.metadata}><Text as="span" variant="body-sm" emphasis="strong">Vanya Nichego</Text>
          <Dot /><Text as="span" variant="body-sm" className={styles.secondary}>Deep House</Text>
        </div>
        <Text as="h2" variant="heading-lg" className={styles.trackTitle}>You think you’re stuck</Text>
        <div className={styles.playback}>
          <Text as="span" variant="ui-sm" className={styles.timer} data-playback-time="">{time}</Text>
          <RoundPlayButton progress={progress} playing={playing} aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing}
            disabled={state === 'loading' || state === 'failed'} aria-busy={state === 'loading'}
            onClick={() => { if (playing) engine.current?.pause(); else engine.current?.play() }} />
        </div>
        <Text as="p" variant="body-sm" className={styles.trackCopy}>Inspired by old Detroit hip-hop and house, with dusty drums, chopped samples and a warm, rolling bassline. A late-night groove for moving forward.</Text>
        <div className={styles.tags} aria-label="Session details">
          <Tag size="sm" label="Detroit house" /><Tag size="sm" label="Chicago house" /><Tag size="sm" label="Garage house" />
        </div>
      </div>
      <MediaFooter>
        <Button variant="primary" intent="neutral" aria-pressed={saved} onClick={() => setSaved(value => !value)}>{saved ? 'Session saved' : 'Save Session'}</Button>
        <Button variant="soft" intent="neutral" aria-expanded={expanded} aria-controls={trackList} onClick={() => setExpanded(value => !value)}>View Tracklist</Button>
      </MediaFooter>
      <div id={trackList} hidden={!expanded} className={styles.tracklist}><Text variant="body-sm">You think you’re stuck · Vanya Nichego</Text></div>
      <p role="status" className={state === 'failed' ? styles.audioNotice : styles.srOnly}>
        {state === 'failed' ? 'Audio unavailable. Listen on SoundCloud.' : state === 'loading' ? 'Audio loading.' : playing ? 'Audio playing.' : 'Audio paused.'}
      </p>
    </Card>
    <iframe ref={frame} src={playerUrl} width={320} height={166} title="SoundCloud audio engine" tabIndex={-1} aria-hidden="true" allow="autoplay" className={styles.audioEngine} />
    <div className={styles.credits}>
      <Link href="https://www.hitocajon.com/storybook/" size="sm">Built with Hito DS</Link>
      <Link href={trackUrl} size="sm">SoundCloud</Link>
    </div>
  </div>
}
