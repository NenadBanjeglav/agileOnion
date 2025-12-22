import { AppShell } from '@/components/layout/AppShell'
import { siteConfig } from '@/lib/config/site'
import { homeContent } from '@/lib/content/home'
import { Hero } from './_components/Hero'
import { BlogCategories } from './_components/BlogCategories'
import { LatestBlogs } from './_components/LatestBlogs'
import { ParallaxLogos } from './_components/ParallaxLogos'
import { ParallaxSection } from './_components/ParallaxSection'
import ReactLenis from 'lenis/react'
import { NewsletterShuffle } from './_components/NewsletterShuffle'
import { AboutMe } from './_components/AboutMe'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'

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
      <JsonLd data={structuredData} />
      <AppShell padded={false}>
        <ParallaxLogos />
        <Hero {...hero} />
        <ParallaxSection />
        <BlogCategories />
        <LatestBlogs />
        <NewsletterShuffle />
        <AboutMe />
        <Footer />
      </AppShell>
    </ReactLenis>
  )
}
