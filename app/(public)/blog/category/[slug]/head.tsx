import { notFound } from 'next/navigation'

import { siteConfig } from '@/lib/config/site'
import { CATEGORY_LOOKUP } from '../../_components/categoryData'

type CategoryHeadProps = {
  params: { slug: string }
}

export default function Head({ params }: CategoryHeadProps) {
  const category = CATEGORY_LOOKUP.get(params.slug)
  if (!category) {
    notFound()
  }

  const title = `${category.title} | ${siteConfig.name}`
  const description = category.description?.trim() || siteConfig.description
  const canonical = `${siteConfig.url}/blog/category/${params.slug}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
