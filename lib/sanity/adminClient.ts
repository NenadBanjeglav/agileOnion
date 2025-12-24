import {createClient} from '@sanity/client'

export const sanityAdminClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-12-20',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
