import type { ComponentPropsWithRef, ReactNode } from 'react'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import styles from '@/components/citymobil-case/features.module.css'
import layout from './case-draft.module.css'

export function CaseDetails({ editorial = true, className, ...props }: ComponentPropsWithRef<'section'> & { editorial?: boolean }) {
  const chapter = [styles.chapter, className].filter(Boolean).join(' ')
  return <section {...props} className={editorial ? chapter : className} data-case-details={editorial || undefined} />
}

/** Reserved media in an unfinished case; never presents an unavailable demo as a control. */
export function CaseDraftSlot({ label, description, format = 'wide' }: { label: string; description?: string; format?: 'wide' | 'compact' }) {
  return <div className={layout.draftSlot} data-format={format}>
    <p className={layout.kicker}>Preview to follow</p>
    <p className="portfolio-type-lg">{label}</p>
    {description && <p>{description}</p>}
  </div>
}

type FeatureGridProps =
  | (ComponentPropsWithRef<'div'> & { editorial?: boolean; tracks?: boolean; columns?: never; variant?: never })
  | (ComponentPropsWithRef<'ul'> & { editorial?: never } & (
    | { columns: 1 | 2 | 3; variant?: never }
    | { columns: 2 | 3; variant: 'text' }
    | { columns?: never; variant: 'tracks' }
  ))

const trackGrid = `${layout.trackCards} portfolio-grid-tracks`

export function CaseFeatureGrid(props: FeatureGridProps) {
  if (props.columns !== undefined || props.variant === 'tracks') {
    const { columns, variant, className = '', ...list } = props
    const tracks = variant === 'tracks'
    const grid = tracks ? trackGrid : layout.cards
    return <ul role={variant ? 'list' : undefined} {...list} className={`${grid} ${className}`}
      data-case-feature-grid={tracks || undefined} data-demo-previews={!variant || undefined}
      data-case-text-features={variant === 'text' || undefined} data-case-columns={columns} />
  }
  const { editorial = true, tracks, className, ...grid } = props
  const gridClass = tracks ? trackGrid : editorial ? styles.grid : className
  return <div {...grid} className={gridClass} data-case-feature-grid={tracks !== undefined || editorial || undefined} />
}

export type CaseTextFeatureProps = { title: string; subheading?: string; description: string }

export function CaseTextFeature({ title, subheading, description, heading: Heading = 'h2' }: CaseTextFeatureProps & { heading?: 'h2' | 'h3' }) {
  return <li>
    <RepeatReveal className={layout.textFeatureCopy}>
      <Heading className="portfolio-type-lg">{title}</Heading>
      <div className={layout.textFeatureSupport}>
        {subheading && <p className={`portfolio-type-body ${layout.textFeatureSubheading}`}>{subheading}</p>}
        <p className="portfolio-type-body">{description}</p>
      </div>
    </RepeatReveal>
  </li>
}

type FeatureSpan = 'half' | 'full' | 'third' | 'two-thirds'

export function CaseFeatureSlot({ editorial = true, className, span, ...props }: ComponentPropsWithRef<'figure'> & { editorial?: boolean; span?: FeatureSpan }) {
  return <figure {...props} className={editorial ? styles.slot : className} data-case-span={span} />
}

export function CaseFeatureCard({ id, eyebrow, title, description, gallery, expanded, listItem, span, children }: {
  id?: string
  eyebrow?: string
  title: ReactNode
  description: string
  gallery?: boolean
  expanded?: boolean
  listItem?: boolean
  span?: FeatureSpan
  children?: ReactNode
}) {
  if (listItem) return <li data-case-span={span} aria-labelledby={id}>
    <RepeatReveal className={layout.cardCaption}>{eyebrow && <p>{eyebrow}</p>}<h3 id={id}>{title}</h3><p>{description}</p></RepeatReveal>
    {children}
  </li>
  return <div className={`${styles.card} ${gallery ? styles.galleryCard : ''} ${expanded ? styles.expandedCard : ''}`}>
    {!gallery && <RepeatReveal><div className={styles.copy} data-case-caption><p>{eyebrow}</p><h3 id={id}>{title}</h3><p>{description}</p></div></RepeatReveal>}
    <div className={styles.demo}>{children}</div>
  </div>
}
