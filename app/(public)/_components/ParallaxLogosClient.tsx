'use client'

import dynamic from 'next/dynamic'

const ParallaxLogos = dynamic(
  () => import('./ParallaxLogos').then((mod) => mod.ParallaxLogos),
  { ssr: false },
)

export function ParallaxLogosClient() {
  return <ParallaxLogos />
}
