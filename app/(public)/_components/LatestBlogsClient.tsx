'use client'

import Image from 'next/image'
import Link from 'next/link'
import {motion, useReducedMotion} from 'motion/react'
import {useEffect, useMemo, useRef, useState} from 'react'
import {ArrowLeft, ArrowRight} from 'lucide-react'

const CARD_WIDTH = 320
const CARD_GAP = 18
const CARD_SIZE = CARD_WIDTH + CARD_GAP

export type LatestBlogsPost = {
  slug: string
  title: string
  excerpt: string
  image: string
  categoryLabel: string
}

const clampOffset = (value: number, limit: number) =>
  Math.max(-limit, Math.min(0, value))

export function LatestBlogsClient({
  posts,
}: {
  posts: LatestBlogsPost[]
}) {
  const {width, ref} = useContainerWidth<HTMLDivElement>()
  const shouldReduceMotion = !!useReducedMotion()
  const [offset, setOffset] = useState(0)

  const visibleCards = useMemo(() => {
    if (width > 1180) return 3
    if (width > 760) return 2
    return 1
  }, [width])

  const maxOffset = Math.max(0, CARD_SIZE * (posts.length - visibleCards))
  const clampedOffset = clampOffset(offset, maxOffset)
  const canShiftLeft = clampedOffset < 0
  const canShiftRight = Math.abs(clampedOffset) < maxOffset - 1

  const shiftLeft = () => {
    if (!canShiftLeft) return
    setOffset((prev) => clampOffset(prev + CARD_SIZE, maxOffset))
  }

  const shiftRight = () => {
    if (!canShiftRight) return
    setOffset((prev) => clampOffset(prev - CARD_SIZE, maxOffset))
  }

  const motionOffset = shouldReduceMotion ? 0 : clampedOffset

  return (
    <section
      id="blog"
      className="relative -mx-[calc((100vw-100%)/2)] w-screen px-5 py-16 text-white sm:px-8 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-10 mx-auto h-60 w-11/12 rounded-full bg-emerald-500/20 blur-[110px]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 45%)',
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-emerald-100 uppercase">
              Novo na blogu
            </span>
            <div className="space-y-2">
              <h2 className="text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">
                Najnovije priče iz Agile Onion-a
              </h2>
              <p className="max-w-3xl text-base leading-relaxed text-zinc-200 sm:text-lg">
                Najnovije priče koje će ti pomoći da unaprediš svoje znanje o
                agilnosti, Scrum-u i ličnom razvoju.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 p-1 shadow-inner shadow-black/30 backdrop-blur">
            <CarouselButton
              direction="left"
              disabled={!canShiftLeft}
              onClick={shiftLeft}
              label="Prethodne priče"
            />
            <CarouselButton
              direction="right"
              disabled={!canShiftRight}
              onClick={shiftRight}
              label="Sledeće priče"
            />
          </div>
        </div>

        <div
          ref={ref}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-2 py-5 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.95)]"
        >
          <motion.div
            animate={{x: motionOffset}}
            drag="x"
            dragConstraints={{left: -maxOffset, right: 0}}
            dragElastic={0.08}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              const nextOffset = clampOffset(offset + info.offset.x, maxOffset)
              if (nextOffset !== offset) {
                setOffset(nextOffset)
              }
            }}
            transition={{
              ease: 'easeInOut',
              duration: shouldReduceMotion ? 0 : 0.45,
            }}
            className="flex"
          >
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                allowMotion={!shouldReduceMotion}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BlogCard({
  post,
  allowMotion,
}: {
  post: LatestBlogsPost
  allowMotion: boolean
}) {
  const primaryTag = post.categoryLabel || 'Blog'
  const excerpt = post.excerpt || 'Novi tekst na blogu.'

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block shrink-0 focus-visible:outline-none"
      style={{width: CARD_WIDTH, marginRight: CARD_GAP}}
      aria-label={`Procitaj: ${post.title}`}
    >
      <motion.article
        className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-4 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.9)] ring-1 ring-white/5 transition duration-200 group-hover:border-emerald-200/50 group-hover:ring-emerald-200/40"
        whileHover={allowMotion ? {y: -10} : undefined}
        transition={allowMotion ? {type: 'tween', duration: 0.14} : undefined}
      >
        <div className="relative h-40 overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={`Ilustracija za ${post.title}`}
            fill
            sizes="(min-width: 1024px) 360px, 80vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/25 to-black/40" />
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full border border-emerald-300/60 bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-emerald-50 uppercase shadow-inner shadow-emerald-500/20">
            {primaryTag}
          </span>
        </div>

        <div className="mt-4 flex flex-1 flex-col space-y-3">
          <div className="space-y-2">
            <h3 className="text-xl leading-tight font-semibold text-white">
              {post.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-200">{excerpt}</p>
          </div>

          <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition duration-150 group-hover:gap-3">
            Pročitaj ceo tekst
            <ArrowRight className="h-4 w-4" aria-hidden />
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

function CarouselButton({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
  label: string
}) {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`cursor-pointer rounded-full border border-white/20 bg-white/10 p-2 text-white transition duration-200 hover:border-emerald-200/60 hover:bg-emerald-400/10 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none ${
        disabled ? 'opacity-40' : ''
      }`}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  )
}

function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const win = typeof window !== 'undefined' ? window : null
    const node = ref.current
    if (!node || !win) return undefined

    const updateWidth = () => {
      setWidth(node.getBoundingClientRect().width)
    }

    updateWidth()

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver((entries) => {
        const entryWidth = entries[0]?.contentRect.width
        if (entryWidth) {
          setWidth(entryWidth)
        }
      })
      observer.observe(node)
      return () => observer.disconnect()
    }

    win.addEventListener('resize', updateWidth)
    return () => win.removeEventListener('resize', updateWidth)
  }, [])

  return {ref, width}
}
