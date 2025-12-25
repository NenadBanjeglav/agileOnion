import { AppShell } from '@/components/layout/AppShell'
import { siteConfig } from '@/lib/config/site'
import { Hero } from './_components/Hero'
import { MissionSection } from './_components/MissionSection'
import { BlogCategories } from './_components/BlogCategories'
import { LatestBlogs } from './_components/LatestBlogs'
import { NewsletterShuffle } from './_components/NewsletterShuffle'
import { AboutMe } from './_components/AboutMe'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { ParallaxLogosClient } from './_components/ParallaxLogosClient'

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <AppShell padded={false}>
        <ParallaxLogosClient />
        <Hero />
        <MissionSection />
        <BlogCategories />
        <LatestBlogs />
        <NewsletterShuffle />
        <AboutMe />
        <Footer />
      </AppShell>
    </>
  )
}
