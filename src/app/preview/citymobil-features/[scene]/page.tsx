import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CitymobilFeatures from '@/components/citymobil-features/CitymobilFeatures'
import { isSceneId, scenes } from '@/components/citymobil-features/scenes'

type Props = { params: Promise<{ scene: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { scene } = await params
  return { title: isSceneId(scene) ? 'Citymobil / ' + scenes[scene].title : 'Citymobil preview', robots: { index: false, follow: false } }
}
export default async function FeaturePreviewPage({ params }: Props) {
  const { scene } = await params
  if (!isSceneId(scene)) notFound()
  return <CitymobilFeatures key={scene} scene={scene}/>
}
