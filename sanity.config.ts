import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import {schemaTypes} from './sanity/schemaTypes'
import {SendNewsletterAction} from './sanity/actions/sendNewsletterAction'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET')
}

export default defineConfig({
  name: 'default',
  title: 'AgileOnion Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool()],
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'post') {
        return [SendNewsletterAction, ...prev]
      }
      return prev
    },
  },
  schema: {
    types: schemaTypes,
  },
})
