import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  AlertDialog, Button, Checkbox, CheckboxGroup, Chip, Disclosure, InlineEdit, NumberField,
  RangeSlider, SearchField, Select, Switch, Text, TimePicker, type RangeSliderValue,
} from '@hito-ds/react'
import { WeekdaySelector, type WeekdaySelectorDay, type WeekdaySelectorOption } from '@hito-ds/react/patterns'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import { CaseFeatureCard, CaseFeatureGrid } from '@/components/portfolio/case-story/CaseDetails'
import layout from '@/components/portfolio/case-story/case-draft.module.css'
import editorial from '@/components/portfolio/case-story/case-editorial.module.css'
import styles from './case.module.css'

const days: WeekdaySelectorOption[] = [
  { value: 'mon', label: 'Mon', accessibleLabel: 'Monday' },
  { value: 'tue', label: 'Tue', accessibleLabel: 'Tuesday' },
  { value: 'wed', label: 'Wed', accessibleLabel: 'Wednesday' },
  { value: 'thu', label: 'Thu', accessibleLabel: 'Thursday' },
  { value: 'fri', label: 'Fri', accessibleLabel: 'Friday' },
  { value: 'sat', label: 'Sat', accessibleLabel: 'Saturday' },
  { value: 'sun', label: 'Sun', accessibleLabel: 'Sunday' },
]
const windows = [
  { value: 'morning', label: 'Morning', trailingText: '09:00–12:00' },
  { value: 'afternoon', label: 'Afternoon', trailingText: '12:00–16:00' },
  { value: 'evening', label: 'Evening', trailingText: '16:00–20:00' },
  { value: 'night', label: 'Night', disabled: true },
]
const choices = windows.slice(0, 2).map(({ value, label }) => ({ value, label }))

function Example({ name, detail, children, size, span = 'half' }: { name: string; detail: string; children: ReactNode; size?: 'medium' | 'tall' | 'overlay'; span?: 'half' | 'third' }) {
  return <CaseFeatureCard listItem span={span} title={name} description={detail}>
    <div className={styles.stage} data-example={name} data-stage-size={size} data-hito-native="" data-hito-theme="neutral" data-hito-color-scheme="dark">
      {children}
    </div>
  </CaseFeatureCard>
}

function Chips() {
  const values = ['Terrace', 'Garden']
  const [shown, setShown] = useState(values)
  const [status, setStatus] = useState('')
  const actions = useRef<Record<string, HTMLButtonElement | null>>({})
  const focusNext = useRef<string | null>(null)
  const missing = values.find(value => !shown.includes(value))
  useLayoutEffect(() => {
    if (!focusNext.current) return
    actions.current[focusNext.current]?.focus()
    focusNext.current = null
  }, [shown])
  return <div className={styles.chips}>
    {shown.map((value, index) => <Chip key={value} behavior="removable" label={value} removeLabel={`Remove ${value}`}
      size="md" elevation="flat" ref={node => { actions.current[value] = node }} onRemove={() => {
        focusNext.current = shown[index + 1] ?? shown[index - 1] ?? 'add'
        setShown(current => current.filter(item => item !== value))
        setStatus(`${value} removed.`)
      }} />)}
    <Button variant="soft" intent="neutral" size="sm" ref={node => { actions.current.add = node }} disabled={!missing}
      aria-label={missing ? `Add ${missing}` : "Add"} onClick={() => {
      if (!missing) return
      focusNext.current = missing
      setShown(current => values.filter(value => value === missing || current.includes(value)))
      setStatus(`${missing} restored.`)
    }}>Add</Button>
    <span className={styles.srOnly} role="status">{status}</span>
  </div>
}

function Draft() {
  const [open, setOpen] = useState(false)
  const [present, setPresent] = useState(true)
  const trigger = useRef<HTMLButtonElement>(null)
  return <div className={styles.draft}>
    <Text as="p" variant="body-sm" role="status">{present ? 'Sample draft' : 'Draft discarded'}</Text>
    <Button ref={trigger} variant="soft" intent="neutral" onClick={() => {
      if (present) setOpen(true)
      else setPresent(true)
    }}>{present ? 'Discard draft' : 'Restore sample draft'}</Button>
    <AlertDialog open={open} title="Discard draft?" description="Your sample draft will be cleared. Cancel to keep it."
      cancelLabel="Cancel" confirmLabel="Discard" confirmIntent="destructive" returnFocusRef={trigger}
      onCancel={() => setOpen(false)} onConfirm={() => { setPresent(false); setOpen(false) }} />
  </div>
}

export function Examples() {
  const [updates, setUpdates] = useState(true)
  const [week, setWeek] = useState<WeekdaySelectorDay[]>(['mon', 'wed', 'fri'])
  const [name, setName] = useState('Morning order')
  const [search, setSearch] = useState('Morning orders')
  const [quantity, setQuantity] = useState<number | null>(2)
  const [interval, setInterval] = useState<RangeSliderValue>([20, 80])
  const [time, setTime] = useState('12:00')
  const [timePointerInput, setTimePointerInput] = useState(false)
  const [details, setDetails] = useState(false)
  const [delivery, setDelivery] = useState('morning')
  const [checked, setChecked] = useState<string[]>(['morning'])
  const allChecked = checked.length === choices.length

  return <section className={`${styles.showcase} ${layout.trackSection}`} aria-labelledby="try-hito">
    <RepeatReveal className={styles.galleryIntro}>
      <h2 id="try-hito" className={editorial.sectionTitle}>Try Hito</h2><p>Change a value, choose an option or open a panel in place.</p>
    </RepeatReveal>
    <CaseFeatureGrid variant="tracks">
      <Example name="Switch" detail="Turn delivery updates on or off.">
        <Switch label="Delivery updates" checked={updates} onChange={event => setUpdates(event.target.checked)} />
      </Example>
      <Example name="Weekday selector" detail="Choose the days that suit you.">
        <WeekdaySelector className={styles.weekdays} label="Delivery days" options={days} value={week} onValueChange={value => setWeek([...value])} size="md" />
      </Example>
    </CaseFeatureGrid>
    <CaseFeatureGrid variant="tracks">
      <Example span="third" name="Removable chip" detail="Remove a value, then add it back."><Chips /></Example>
      <Example span="third" name="Inline edit" detail="Rename an order without leaving the row.">
        <InlineEdit label="Order name" value={name} onCommit={setName} showSaveAction showCancelAction width="fill" />
      </Example>
      <Example span="third" name="Search field" detail="Enter a query or clear it in one step.">
        <SearchField aria-label="Search orders" value={search} onValueChange={setSearch} placeholder="Search orders" clearLabel="Clear search" width="fill" />
      </Example>
    </CaseFeatureGrid>
    <CaseFeatureGrid variant="tracks">
      <Example name="Number field" detail="Change the quantity with the steppers." size="medium">
        <NumberField className={styles.number} aria-label="Quantity" value={quantity} onValueChange={setQuantity} mode="integer" min={0} step={1}
          showSteppers incrementLabel="Increase quantity" decrementLabel="Decrease quantity" width="fill" />
      </Example>
      <Example name="Range slider" detail="Drag either handle to set a range." size="medium">
        <RangeSlider className={styles.slider} label="Interval" beginningHandleLabel="Beginning" endHandleLabel="End"
          value={interval} onValueChange={setInterval} min={0} max={100} step={5} />
      </Example>
    </CaseFeatureGrid>
    <CaseFeatureGrid variant="tracks">
      <Example span="third" name="Time picker" detail="Choose a time and confirm it in place." size="tall">
        <div className={styles.timePicker} data-pointer-input={timePointerInput || undefined}
          onPointerDownCapture={() => setTimePointerInput(true)}
          onKeyDownCapture={() => setTimePointerInput(false)}>
          <TimePicker label="Start time" value={time} onValueChange={setTime} locale="en" appearance="soft" size="sm" width="fill" />
        </div>
      </Example>
      <Example span="third" name="Disclosure" detail="Open details and close them again." size="tall">
        <Disclosure title="Additional details" open={details} onOpenChange={setDetails} variant="ghost" className={styles.disclosure}>
          <Text as="p" variant="body-sm">Include context that may help your team. You can close this section and return when you need it; the information stays available.</Text>
        </Disclosure>
      </Example>
      <Example span="third" name="Checkbox group" detail="Select all or change one option." size="tall">
        <div className={styles.choices}>
          <Checkbox label="Select all" checked={allChecked} indeterminate={checked.length > 0 && !allChecked}
            onChange={event => setChecked(event.target.checked ? choices.map(option => option.value) : [])} />
          <CheckboxGroup legend="Delivery options" name="delivery-options" options={choices} value={checked} onValueChange={setChecked} />
        </div>
      </Example>
    </CaseFeatureGrid>
    <CaseFeatureGrid variant="tracks">
      <Example name="Select" detail="Choose a delivery window." size="overlay">
        <div className={styles.select}><Select label="Delivery window" value={delivery} onValueChange={setDelivery} closeLabel="Close" options={windows}
          placeholder="Choose a window" appearance="outlined" size="md" width="fill" /></div>
      </Example>
      <Example name="Alert dialog" detail="Review the decision before discarding a draft." size="overlay"><Draft /></Example>
    </CaseFeatureGrid>
  </section>
}
