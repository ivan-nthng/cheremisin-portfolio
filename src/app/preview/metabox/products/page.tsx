import type { Metadata } from 'next'
import ProductsDemo from '@/components/metabox/products/ProductsDemo'

export const metadata: Metadata = {
  title: 'Metabox Products Demo',
  robots: { index: false, follow: false },
}

export default function MetaboxProductsPreview() {
  return <ProductsDemo />
}
