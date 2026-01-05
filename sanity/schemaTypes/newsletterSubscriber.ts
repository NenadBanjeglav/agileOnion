import {defineField, defineType} from 'sanity'

export const newsletterSubscriber = defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Subscribed', value: 'subscribed'},
          {title: 'Unsubscribed', value: 'unsubscribed'},
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
    }),
    defineField({
      name: 'confirmedAt',
      title: 'Confirmed At',
      type: 'datetime',
    }),
    defineField({
      name: 'confirmationToken',
      title: 'Confirmation Token',
      type: 'string',
    }),
    defineField({
      name: 'confirmationSentAt',
      title: 'Confirmation Sent At',
      type: 'datetime',
    }),
    defineField({
      name: 'confirmationExpiresAt',
      title: 'Confirmation Expires At',
      type: 'datetime',
    }),
    defineField({
      name: 'confirmationMessageId',
      title: 'Confirmation Message Id',
      type: 'string',
    }),
    defineField({
      name: 'unsubscribeToken',
      title: 'Unsubscribe Token',
      type: 'string',
    }),
    defineField({
      name: 'unsubscribedAt',
      title: 'Unsubscribed At',
      type: 'datetime',
    }),
    defineField({
      name: 'introEmailSentAt',
      title: 'Intro Email Sent At',
      type: 'datetime',
    }),
    defineField({
      name: 'welcomeMessageId',
      title: 'Welcome Message Id',
      type: 'string',
    }),
    defineField({
      name: 'ip',
      title: 'IP Address',
      type: 'string',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'status',
    },
  },
})
