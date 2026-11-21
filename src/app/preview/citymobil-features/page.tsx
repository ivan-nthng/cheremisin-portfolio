import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NativeFeatureDocument from '@/components/citymobil-features/NativeFeatureDocument'
import { scenes, sceneIds, sceneUrl, isSceneId } from '@/components/citymobil-features/scenes'
import styles from '@/components/citymobil-features/features.module.css'

export const metadata: Metadata = {
  title: 'Citymobil — individual native loops',
  description: 'Local, unpublished Citymobil feature-scene rehearsal.',
  robots: { index: false, follow: false },
}

export default async function CitymobilFeaturesPage({ searchParams }: { searchParams: Promise<{ native?: string; scene?: string; width?: string; basemap?: string }> }) {
  const query = await searchParams
  // The published case needs only its five native documents, not review tools.
  if (process.env.NODE_ENV === 'production' && (query.native !== '1' || !query.scene || !isSceneId(query.scene))) notFound()
  if (query.native === '1') return <NativeFeatureDocument scene={query.scene && isSceneId(query.scene) ? query.scene : undefined} width={Math.min(375, Math.max(240, Number(query.width) || 375))} localBasemap={query.scene === 'map' && query.basemap === 'local'}/>
  return <main id="main-content" className={styles.page}>
    <header><h1>Citymobil / Individual native loops</h1><p>Five separate previews. Open one feature to review its own loop; no combined story.</p></header>
    <nav className={styles.links} aria-label="Feature previews">{sceneIds.map(id => <a href={sceneUrl(id)} key={id}><strong>{scenes[id].title}</strong><span>{scenes[id].description}</span></a>)}</nav>
    <p>Local review only. Five independent native-code loops with fictional prepared data.</p>
  </main>
}
