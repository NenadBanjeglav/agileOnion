import { AppShell } from '@/components/layout/AppShell'
import { homeContent } from '@/lib/content/home'
import { Hero } from './_components/Hero'
import { AboutMe } from './_components/AboutMe'
import { BlogCategories } from './_components/BlogCategories'
import { LatestBlogs } from './_components/LatestBlogs'
import { NewsletterShuffle } from './_components/NewsletterShuffle'

export default function HomePage() {
  const { hero } = homeContent

  return (
    <AppShell padded={false}>
      <Hero {...hero} />
      <AboutMe />
      <BlogCategories />
      <LatestBlogs />
      <NewsletterShuffle />
    </AppShell>
  )
}
