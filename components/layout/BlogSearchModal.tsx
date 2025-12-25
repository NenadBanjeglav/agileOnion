'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CATEGORY_LABELS } from '@/app/(public)/blog/_components/categoryData'
import Image from 'next/image'

type SearchResult = {
  id: string
  title: string
  slug: string
  category?: string
  coverImage?: string
}

type BlogSearchModalProps = {
  open: boolean
  onClose: () => void
}

const CATEGORY_OPTIONS = [
  { value: '', label: 'Sve' },
  ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label,
  })),
]

const FALLBACK_IMAGE = '/media/trail/trail-notes.webp'

export function BlogSearchModal({ open, onClose }: BlogSearchModalProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const emptyState = useMemo(() => query.trim().length === 0, [query])

  useEffect(() => {
    if (!open) return
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (query.trim()) params.set('q', query.trim())
        if (category) params.set('category', category)
        const res = await fetch(`/api/search/blog?${params.toString()}`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error('Search failed')
        const data = (await res.json()) as { results: SearchResult[] }
        setResults(data.results)
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setResults([])
        }
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, category, open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/70 px-4 py-6 backdrop-blur sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 text-white shadow-2xl max-h-[85vh] sm:max-h-[80vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.25em] text-emerald-200/80 uppercase">
                <Search className="h-4 w-4" aria-hidden />
                Pretraga
              </div>
              <button
                onClick={onClose}
                className="cursor-pointer rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
                aria-label="Zatvori pretragu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              <div className="space-y-3">
                <label className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                  Pretraga po nazivu
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3">
                  <Search className="h-4 w-4 text-white/60" aria-hidden />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Unesi naziv bloga..."
                    className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                  Kategorija
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                        category === option.value
                          ? 'border-emerald-200 bg-emerald-200/10 text-emerald-100'
                          : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="blog-category"
                        value={option.value}
                        checked={category === option.value}
                        onChange={() => setCategory(option.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                  <span>{emptyState ? 'Najnoviji blogovi' : 'Rezultati'}</span>
                  {loading && (
                    <span className="text-emerald-200">Pretraga...</span>
                  )}
                </div>
                <div className="space-y-2">
                  {!loading && results.length === 0 && (
                    <p className="rounded-2xl border border-white/10 bg-neutral-900/60 px-4 py-6 text-sm text-white/60">
                      Nema rezultata. Probaj drugi naziv ili kategoriju.
                    </p>
                  )}
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/blog/${result.slug}`}
                      onClick={onClose}
                      className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-900/70 px-4 py-3 transition hover:border-emerald-200/60 hover:bg-neutral-900 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-neutral-800">
                          <Image
                            src={result.coverImage ?? FALLBACK_IMAGE}
                            alt=""
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-base font-semibold text-white group-hover:text-emerald-100">
                            {result.title}
                          </p>
                          <p className="text-xs text-white/50">
                            {CATEGORY_LABELS[result.category ?? ''] ?? 'Blog'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-200">
                        Pogledaj
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
