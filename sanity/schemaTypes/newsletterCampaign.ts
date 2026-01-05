import {defineField, defineType} from 'sanity'

export const newsletterCampaign = defineType({
  name: 'newsletterCampaign',
  title: 'Newsletter Campaign',
  type: 'document',
  fields: [
    defineField({
      name: 'postId',
      title: 'Post Id',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postTitle',
      title: 'Post Title',
      type: 'string',
    }),
    defineField({
      name: 'postSlug',
      title: 'Post Slug',
      type: 'string',
    }),
    defineField({
      name: 'postExcerpt',
      title: 'Post Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'postImageUrl',
      title: 'Post Image Url',
      type: 'url',
    }),
    defineField({
      name: 'customMessage',
      title: 'Custom Message',
      type: 'text',
      rows: 4,
      description: 'Optional intro text for the campaign email.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Sending', value: 'sending'},
          {title: 'Completed', value: 'completed'},
          {title: 'Error', value: 'error'},
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'totalRecipients',
      title: 'Total Recipients',
      type: 'number',
    }),
    defineField({
      name: 'sentCount',
      title: 'Sent Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'nextOffset',
      title: 'Next Offset',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'startedAt',
      title: 'Started At',
      type: 'datetime',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed At',
      type: 'datetime',
    }),
    defineField({
      name: 'lastRunAt',
      title: 'Last Run At',
      type: 'datetime',
    }),
    defineField({
      name: 'lastError',
      title: 'Last Error',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'postTitle',
      subtitle: 'status',
    },
  },
})
