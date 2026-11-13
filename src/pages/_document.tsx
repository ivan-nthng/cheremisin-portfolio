import { Head, Html, Main, NextScript } from 'next/document'
import { nativePageMotion } from '@/components/portfolio/navigation/policy'

export default function PreviewDocument() {
  return <Html lang="en">
    <Head><script dangerouslySetInnerHTML={{ __html: nativePageMotion }} /></Head>
    <body><Main /><NextScript /></body>
  </Html>
}
