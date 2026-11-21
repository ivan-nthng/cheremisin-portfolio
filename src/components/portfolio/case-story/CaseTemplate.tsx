import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import styles from '@/components/citymobil-case/case.module.css'
import { PageReady } from '@/components/portfolio/navigation/PageMotion'

type MainProps = ComponentPropsWithoutRef<'main'>
type SectionProps = ComponentPropsWithoutRef<'section'>

export function CaseTemplate({ hero, context, statistics, showcase, details, further, footer, className = '', ...props }: MainProps & {
  hero: ReactNode
  context?: ReactNode
  statistics?: ReactNode
  showcase?: ReactNode
  details: ReactNode
  further?: ReactNode
  footer?: ReactNode
}) {
  return <>
    <main {...props} id="main-content" className={`${styles.template} ${className}`}>
      <PageReady />{hero}{context}{statistics}{showcase}{details}{further}
    </main>
    {footer}
  </>
}

export function CaseStatistics({ sectionRef, pinRef, pinClassName = '', children, afterPin, ...props }: SectionProps & {
  sectionRef: Ref<HTMLElement>
  pinRef?: Ref<HTMLDivElement>
  pinClassName?: string
  afterPin?: ReactNode
}) {
  return <section {...props} ref={sectionRef} className={`${styles.statsTrack} ${props.className ?? ''}`}>
    <div ref={pinRef} className={`${styles.statsPin} ${pinClassName}`}>{children}</div>
    {afterPin}
  </section>
}

export function CaseShowcase({ sectionRef, headingRef, frameRef, entryRef, pinRef, pinClassName = '', headingId, kicker, lines, backdrop, chrome, preview, entry, mobile, ...props }: SectionProps & {
  sectionRef: Ref<HTMLElement>
  headingRef: Ref<HTMLDivElement>
  frameRef: Ref<HTMLDivElement>
  entryRef: Ref<HTMLDivElement>
  pinRef?: Ref<HTMLDivElement>
  pinClassName?: string
  headingId: string
  kicker: string
  lines: [string, string]
  backdrop?: ReactNode
  chrome: string
  preview: ReactNode
  entry: ReactNode
  mobile?: ReactNode
}) {
  return <section {...props} ref={sectionRef} className={`${styles.showcase} ${props.className ?? ''}`} aria-labelledby={headingId} tabIndex={-1}>
    <div ref={pinRef} className={`${styles.showcasePin} ${pinClassName}`}>
      {backdrop}
      <div ref={headingRef} className={styles.showcaseHeading} data-case-showcase-heading>
        <p>{kicker}</p>
        <h2 id={headingId}>{lines.map(line => <span key={line} className={styles.headingLine}><span>{line}</span></span>)}</h2>
      </div>
      <div ref={frameRef} className={styles.browser} data-case-browser>
        <div className={styles.previewSurface} data-case-preview>
          <div className={styles.chrome} aria-hidden="true">{chrome}</div>
          {preview}
        </div>
        <div ref={entryRef} className={styles.demoEntry} data-case-entry>{entry}</div>
      </div>
      {mobile}
    </div>
  </section>
}

export function CaseDemoArrow() {
  return <span className={styles.entryArrow} aria-hidden="true" />
}
