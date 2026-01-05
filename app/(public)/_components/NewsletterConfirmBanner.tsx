'use client'

import {useSearchParams} from 'next/navigation'

const MESSAGES: Record<string, string> = {
  confirmed: 'Prijava je potvrđena. Dobrodošao/la u Agile Onion!',
  invalid: 'Link za potvrdu nije važeći. Pokušaj ponovo.',
  expired: 'Link za potvrdu je istekao. Prijavi se ponovo.',
  unsubscribed: 'Odjava je uspešna. Više nećeš dobijati mejlove.',
}

export function NewsletterConfirmBanner() {
  const searchParams = useSearchParams()
  const status = searchParams.get('newsletter')
  const message = status ? MESSAGES[status] : undefined

  if (!message) return null

  return (
    <div
      className="mx-auto w-full max-w-6xl px-6 pt-6 sm:px-10 lg:px-12"
      role="status"
    >
      <div className="rounded-2xl border border-[#00B3D5]/40 bg-[#00B3D5]/10 px-4 py-3 text-sm text-[#d9fbff]">
        {message}
      </div>
    </div>
  )
}
