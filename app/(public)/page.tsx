import { AppShell } from '@/components/layout/AppShell'
import { siteConfig } from '@/lib/config/site'
import { homeContent } from '@/lib/content/home'

import { Hero } from './_components/Hero'

import { AboutMe } from './_components/AboutMe'
import { BlogCategories } from './_components/BlogCategories'
import { LatestBlogs } from './_components/LatestBlogs'
import { NewsletterShuffle } from './_components/NewsletterShuffle'
import { ParallaxLogos } from './_components/ParallaxLogos'
import { ParallaxSection } from './_components/ParallaxSection'
import ReactLenis from 'lenis/react'

export default function HomePage() {
  const { hero } = homeContent
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AppShell padded={false}>
        <ParallaxLogos />
        <Hero {...hero} />
        <ParallaxSection />
        <BlogCategories />
        <LatestBlogs />
        <NewsletterShuffle />
        <AboutMe />
      </AppShell>
    </ReactLenis>
  )
}
