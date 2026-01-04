export type PostCard = {
  id: string
  title: string
  slug: string
  excerpt: string
  categoryLabel: string
  image: string
  date: string | null
}

export type CategoryCard = {
  slug: string
  title: string
  description: string
  pitch?: string
  image: string
}
