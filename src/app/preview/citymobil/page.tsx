import type { Metadata } from 'next'
import CityMobileInteractivePreview from '@/components/CityMobileInteractivePreview'
import styles from '@/components/citymobil-demo/preview.module.css'

export const metadata: Metadata = {
  title: 'Citymobil — local product preview',
  description: 'Local fictional Citymobil product UI demonstration.',
  robots: { index: false, follow: false },
}

export default function CitymobilPreviewPage() {
  return <main id="main-content" className={styles.standalone}>
    <CityMobileInteractivePreview />
  </main>
}
