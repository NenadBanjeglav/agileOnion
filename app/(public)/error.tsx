'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <div className="w-full max-w-lg space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)]">
        <h1 className="text-2xl font-semibold">Doslo je do greske</h1>
        <p className="text-sm text-zinc-300">
          Stranica nije mogla da se ucita. Pokusaj ponovo ili se vrati na
          pocetnu.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Pokusaj ponovo
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:text-white"
          >
            Nazad na pocetnu
          </Link>
        </div>
      </div>
    </div>
  )
}
