import {useState} from 'react'
import type {DocumentActionComponent} from 'sanity'
import {useToast} from '@sanity/ui'

const SECRET = process.env.NEXT_PUBLIC_NEWSLETTER_WEBHOOK_SECRET

export const SendNewsletterAction: DocumentActionComponent = (props) => {
  const {id, type, published} = props
  const toast = useToast()
  const [isSending, setIsSending] = useState(false)

  if (type !== 'post' || !published) {
    return null
  }

  return {
    label: isSending ? 'Šaljem...' : 'Pošalji newsletter',
    onHandle: async () => {
      if (!SECRET) {
        toast.push({
          status: 'error',
          title: 'Missing SANITY_STUDIO_NEWSLETTER_WEBHOOK_SECRET',
        })
        props.onComplete()
        return
      }

      setIsSending(true)
      try {
        const baseUrl = window.location.origin
        await fetch(`${baseUrl}/api/newsletter/campaigns/post-published`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-webhook-secret': SECRET,
          },
          body: JSON.stringify({postId: id}),
        })

        const response = await fetch(
          `${baseUrl}/api/newsletter/campaigns/process`,
          {
            method: 'POST',
            headers: {
              'x-webhook-secret': SECRET,
            },
          },
        )

        if (!response.ok) {
          const body = await response.json().catch(() => ({}))
          throw new Error(body?.error ?? 'Sending failed')
        }

        toast.push({
          status: 'success',
          title: 'Newsletter processing started',
        })
      } catch (error) {
        toast.push({
          status: 'error',
          title: error instanceof Error ? error.message : 'Sending failed',
        })
      } finally {
        setIsSending(false)
        props.onComplete()
      }
    },
  }
}
