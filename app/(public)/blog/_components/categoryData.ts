import type {CategoryCard} from './types'

export const CATEGORY_LABELS: Record<string, string> = {
  'mindset-lab': 'Mindset Lab',
  'agile-club': 'Agile Club',
  'scrum-office': 'Scrum Office',
  'very-agile-personas': 'Very Agile Personas',
}

export const CATEGORY_CARDS: CategoryCard[] = [
  {
    slug: 'mindset-lab',
    title: 'Mindset Lab',
    description: 'Mindset, disciplina i unutrašnji rast kroz praktične vežbe.',
    image: '/media/trail/trail-notebook.webp',
  },
  {
    slug: 'agile-club',
    title: 'Agile Club',
    description: 'Agilnost u praksi, timovi, promene i lična energija.',
    image: '/media/trail/trail-collab.webp',
  },
  {
    slug: 'scrum-office',
    title: 'Scrum Office',
    description: 'Scrum, rituali i realne situacije iz kancelarije.',
    image: '/media/trail/trail-office.webp',
  },
  {
    slug: 'very-agile-personas',
    title: 'Very Agile Personas',
    description: 'Priče ljudi koji su živeli agilno i hrabro.',
    image: '/media/trail/trail-retro.webp',
  },
]

export const CATEGORY_LOOKUP = new Map(
  CATEGORY_CARDS.map((category) => [category.slug, category])
)
