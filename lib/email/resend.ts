import {render} from '@react-email/render'
import {Resend} from 'resend'
import type {ReactElement} from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)
const SENDER = 'Agile Onion <newsletter@agileonion.rs>'

type SendEmailArgs = {
  to: string
  subject: string
  react: ReactElement
  replyTo?: string
}

export const sendEmail = async ({to, subject, react, replyTo}: SendEmailArgs) => {
  const html = await render(react)
  const text = await render(react, {plainText: true})

  return resend.emails.send({
    from: SENDER,
    to,
    subject,
    html,
    text,
    replyTo,
  })
}
