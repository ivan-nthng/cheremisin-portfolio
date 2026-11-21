'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { CaseCounter } from '@/components/portfolio/case-story/CaseCounter'
import editorial from '@/components/portfolio/case-story/case-editorial.module.css'
import citymobil from '@/components/citymobil-case/case.module.css'
import styles from './time-calculator.module.css'

const maxWeeks = 52
const dinnersPerWeek = 5
const deliveriesPerWeek = 1
const minutesPerDinner = 60
const minutesPerHour = 60
const hoursPerDay = 24
const weekLabels = ['one week', 'two weeks', 'three weeks', 'four weeks']
const formatCount = (value: number) => String(value)
const dayFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
const hundredthsPerDay = 100
const formatDays = (hundredths: number) => dayFormatter.format(hundredths / hundredthsPerDay)
const hoursPerWeek = dinnersPerWeek * minutesPerDinner / minutesPerHour
const annualHours = maxWeeks * hoursPerWeek
const annualDays = Math.floor(annualHours / hoursPerDay)
const annualRemainingHours = annualHours % hoursPerDay

export function TimeCalculator({ headingId }: { headingId: string }) {
  const [{ weeks, animate }, setSelection] = useState({ weeks: 1, animate: false })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  const weekLabel = weekLabels[weeks - 1] ?? `${weeks} weeks`
  const dinners = weeks * dinnersPerWeek
  const deliveries = weeks * deliveriesPerWeek
  const hours = weeks * hoursPerWeek
  // CaseCounter interpolates integers, so count in hundredths of a day.
  const dayHundredths = Math.round(hours * hundredthsPerDay / hoursPerDay)
  const metrics = [
    { label: 'Dinners', value: dinners },
    { label: 'Deliveries', value: deliveries },
    { label: 'Estimated hours saved', value: hours },
    { label: 'Estimated days saved', value: dayHundredths, format: formatDays },
  ]

  function updateWeeks(animate: boolean, reset = false) {
    setSelection(current => {
      const next = reset ? 1 : Math.min(current.weeks + 1, maxWeeks)
      return next === current.weeks ? current : { weeks: next, animate }
    })
  }

  return <div className={styles.calculator}>
    <RepeatReveal>
      <h2 id={headingId} className={`${editorial.sectionTitle} ${styles.heading}`} aria-label={`Make room for everyday life. Just add ${weekLabel} and see the difference.`}>
        Make room for everyday life.{' '}
        <span className={styles.prompt}>
          <span className={styles.unbroken}>
            Just{' '}<Button className={`${styles.action} ${styles.add}`} variant="ghost" aria-label="Add one week" aria-disabled={weeks === maxWeeks}
              onClick={event => updateWeeks(event.detail > 0)}><span className={styles.marker}>add</span></Button>
          </span>{' '}
          {weekLabel} and see the{' '}
          <span className={styles.unbroken}>
            difference.<Button className={`${styles.action} ${styles.reset}`} variant="ghost" aria-label="Reset to one week" title="Reset to one week"
              aria-disabled={weeks === 1} onClick={event => updateWeeks(event.detail > 0, true)}><span className={styles.resetIcon} aria-hidden="true" /></Button>
          </span>
        </span>
      </h2>
    </RepeatReveal>
    <p role="status" className="sr-only">Selected period: {weekLabel}. {dinners} dinners, {deliveries} {deliveries === 1 ? 'delivery' : 'deliveries'} and {hours} estimated hours saved, or {formatDays(dayHundredths)} days.</p>
    <dl className={`${citymobil.metrics} ${styles.metrics}`}>
      {metrics.map(({ label, value, format = formatCount }) => <div key={label} className={styles.metric}>
        <dt>{label}</dt>
        <dd>
          <span className="sr-only">{format(value)}</span>
          <CaseCounter className={`${editorial.metric} ${styles.number}`} value={value} format={format} entered reduced={!animate || reducedMotion} staticBeforeHydration />
        </dd>
      </div>)}
    </dl>
    <div className={styles.notes}>
      <p>Illustrative estimate over 1–{maxWeeks} weeks. Assumes {dinnersPerWeek} dinners and {deliveriesPerWeek} delivery per week, with {minutesPerDinner} minutes saved per dinner. Over {maxWeeks} weeks, that’s {annualHours} hours ({annualDays} days and {annualRemainingHours} hours). Actual time saved varies.</p>
      <p className={styles.location}>Designed for everyday life in Florianópolis, Brazil.</p>
    </div>
  </div>
}
