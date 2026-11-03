'use client'

import { useEffect, useRef, useState } from 'react'
import cm from '@/components/citymobil-demo/preview.module.css'
import styles from './background.module.css'

export default function CitymobilBackgroundPreview() {
  const stage = useRef<HTMLElement>(null)
  const [paused, setPaused] = useState(false)
  const [withInterface, setWithInterface] = useState(false)
  const [visible, setVisible] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(document.visibilityState === 'visible')
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting && entry.intersectionRatio > 0)
    }, { threshold: 0.01 })
    if (stage.current) observer.observe(stage.current)
    return () => {
      document.removeEventListener('visibilitychange', updateVisibility)
      observer.disconnect()
    }
  }, [])

  const running = !paused && visible && inView

  return <main id="main-content" className={`${cm.preview} ${styles.page}`} data-theme="dark">
    <div className={styles.content}>
      <header className={styles.intro}>
        <h1>One inbox</h1>
        <p>Messages from the app, the web, and social channels come into one workspace.</p>
      </header>
      <div className={styles.controls} aria-label="Presentation controls">
        <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          {paused ? 'Resume motion' : 'Pause motion'}
        </button>
        <button type="button" aria-pressed={!withInterface} onClick={() => setWithInterface(value => !value)}>
          {withInterface ? 'Background only' : 'Show interface'}
        </button>
      </div>
      <figure ref={stage} className={styles.stage} data-running={running} data-visible={visible} data-in-view={inView} data-interface={withInterface}>
        <div className={styles.decoration} aria-hidden="true">
          <div className={styles.blur}>
            {Array.from({ length: 6 }, (_, index) => <i key={index} className={styles.shape} />)}
          </div>
          <div className={styles.grain} />
        </div>
        {withInterface && <div className={styles.media}>
          {/* Exact Figma UI subtree 8356:20662; presentation media, not a live demo. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/citymobil/background/native-interface.png" width={648} height={688}
            alt="Original Citymobil support interface: Jason McBright's conversation and reply composer. A composer detail is shown on narrow screens." />
        </div>}
      </figure>
      <p className={styles.caption}>{withInterface ? <>
        Original interface · <span className={styles.desktopCaption}>static presentation</span><span className={styles.mobileCaption}>composer detail</span>
      </> : 'Background study'}</p>
    </div>
  </main>
}
