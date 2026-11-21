'use client'

import { useState } from 'react'
import { Button, Switch, Text } from '@hito-ds/react'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import styles from './home-demo.module.css'

function HitoPreferences() {
  const [updates, setUpdates] = useState(true)
  const [saved, setSaved] = useState(false)

  return <div className={styles.canvas} data-hito-native="" data-hito-theme="neutral" data-hito-color-scheme="dark">
    <div className={styles.preferences}>
      <div className={styles.header}>
        <div><Text as="p" variant="label-sm">DELIVERY SETTINGS</Text><Text as="h2" variant="heading-md">A calmer weekly routine</Text></div>
        <span className={styles.avatar} aria-hidden="true">J</span>
      </div>
      <div className={styles.setting}>
        <div><Text as="p" variant="body-md">Delivery updates</Text><Text as="p" variant="body-sm">A reminder before your weekly plan arrives</Text></div>
        <Switch label="Delivery updates" checked={updates} onChange={event => { setUpdates(event.target.checked); setSaved(false) }} />
      </div>
      <div className={styles.footer}>
        <Text as="p" variant="body-sm" role="status">{saved ? 'Preferences saved' : 'Changes apply to next week'}</Text>
        <Button size="sm" variant="primary" intent="accent" onClick={() => setSaved(true)}>Save preferences</Button>
      </div>
    </div>
  </div>
}

export default function HitoHomeDemo() {
  return <Stage width={960} height={540}>
    {() => <HitoPreferences />}
  </Stage>
}
