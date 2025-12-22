'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { sanityClient } from '@/lib/sanity/client'

type TestimonialCard = {
  id?: string
  imgUrl?: string
  testimonial: string
  author: string
}

type SanityTestimonial = {
  _id: string
  quote: string
  shortQuote?: string
  authorName: string
  authorRole?: string
  authorCompany?: string
  imageUrl?: string
}

const TESTIMONIALS_QUERY = `*[
  _type == "testimonial" &&
  defined(quote)
] | order(coalesce(order, _createdAt) asc) {
  _id,
  quote,
  shortQuote,
  authorName,
  authorRole,
  authorCompany,
  "imageUrl": image.asset->url
}`

const shuffleCards = (cards: TestimonialCard[]) => {
  const shuffled = [...cards]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const formatAuthorLine = (item: SanityTestimonial) => {
  const details = [item.authorRole, item.authorCompany]
    .filter(Boolean)
    .join(', ')
  return details ? `${item.authorName} - ${details}` : item.authorName
}

const getInitials = (name: string) => {
  const cleanName = name.split(' - ')[0] ?? name
  const parts = cleanName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return `${first}${last}`.toUpperCase()
}

const getAvatarColor = (name: string) => {
  const palette = [
    '#22c55e',
    '#0ea5e9',
    '#f97316',
    '#eab308',
    '#14b8a6',
    '#8b5cf6',
    '#f43f5e',
    '#6366f1',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % palette.length
  }
  return palette[hash]
}

const getAvatarStyle = (name: string) => {
  const backgroundColor = getAvatarColor(name)
  const hex = backgroundColor.replace('#', '')
  const r = Number.parseInt(hex.slice(0, 2), 16) / 255
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const color = luminance > 0.6 ? '#0f172a' : '#f8fafc'
  return { backgroundColor, color }
}

export function NewsletterShuffle() {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = !!prefersReducedMotion
  const [order, setOrder] = useState<number[]>([])
  const [cards, setCards] = useState<TestimonialCard[]>([])

  useEffect(() => {
    let isMounted = true

    const loadTestimonials = async () => {
      try {
        const items =
          await sanityClient.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY)

        if (!isMounted || items.length === 0) {
          return
        }

        const mapped = items.map((item) => ({
          id: item._id,
          imgUrl: item.imageUrl ?? undefined,
          testimonial: item.shortQuote?.trim() || item.quote.trim(),
          author: formatAuthorLine(item),
        }))

        const randomized = shuffleCards(mapped)
        setCards(randomized)
      } catch {
        // Keep fallback testimonials on any fetch issues.
      }
    }

    loadTestimonials()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    setOrder(cards.map((_, index) => index))
  }, [cards])

  const handleShuffle = () => {
    setOrder((prev) => {
      const next = [...prev]
      if (next.length > 1) {
        next.unshift(next.pop() as number)
      }
      return next
    })
  }

  return (
    <section
      id="newsletter"
      className="relative mx-auto flex w-screen max-w-6xl flex-col items-center gap-16 overflow-x-hidden bg-transparent px-6 py-20 text-white sm:px-10 lg:flex-row lg:justify-between lg:px-12 lg:py-24"
    >
      <div className="flex w-full max-w-xl flex-col items-center space-y-5 text-center lg:max-w-none lg:items-start lg:text-left">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-emerald-100 uppercase">
          Taste an Onion
        </span>
        <div className="space-y-3">
          <h2 className="text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">
            Pridruži se Taste an Onion pismu
          </h2>
          <p className="text-base text-zinc-200 sm:text-lg">
            Prijavom na Taste an Onion ne dobijaš još jedan mejl u inboxu — već
            mali podsetnik da si na putu rasta. Svake nedelje po jedan komadić
            slatkog ukusa koji ti pomaže da ne posustaneš.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full flex-col gap-3 sm:max-w-[440px]"
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email adresa za prijavu na newsletter
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Unesi svoj email"
            className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/50 focus:outline-none"
          />
          <button
            type="submit"
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border-0 bg-linear-to-r from-emerald-400 via-emerald-500 to-sky-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_-18px_rgba(16,185,129,0.9)] transition-transform duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_18px_40px_-18px_rgba(56,189,248,0.8)] active:scale-[0.99]"
          >
            <span
              className="absolute inset-0 translate-x-[-120%] bg-white/35 blur-sm transition-transform duration-500 ease-out group-hover:translate-x-[120%]"
              aria-hidden
            />
            <span className="relative">Prijavi se ovde</span>
          </button>
        </form>

        <p className="text-sm text-emerald-100/80">
          Bez spama. Jedva čekam da se upoznamo.
        </p>
      </div>

      {cards.length > 0 ? (
        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-4 lg:max-w-none lg:items-end">
          <div
            className="relative h-[460px] w-full overflow-visible sm:h-[480px] lg:ml-10 xl:ml-16"
            style={{ perspective: 1400 }}
          >
            <AccessibleAnnouncement order={order} cards={cards} />
            {order.map((cardIndex, idx) => {
              const card = cards[cardIndex]
              if (!card) return null
              return (
                <Card
                  key={card.id ?? `${card.author}-${cardIndex}`}
                  imgUrl={card.imgUrl}
                  testimonial={card.testimonial}
                  author={card.author}
                  handleShuffle={handleShuffle}
                  stackIndex={idx}
                  totalCards={order.length}
                  shouldReduceMotion={shouldReduceMotion}
                />
              )
            })}
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3 md:justify-start">
            <button
              type="button"
              onClick={handleShuffle}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-emerald-50 uppercase transition hover:scale-[1.02] hover:border-emerald-200 active:scale-100"
            >
              Sledeća priča
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function AccessibleAnnouncement({
  order,
  cards,
}: {
  order: number[]
  cards: TestimonialCard[]
}) {
  const frontCard = useMemo(() => {
    if (cards.length === 0) {
      return null
    }
    const index = order[0] ?? 0
    return cards[index] ?? cards[0]
  }, [order, cards])

  if (!frontCard) {
    return null
  }

  return (
    <p className="sr-only" aria-live="polite">
      Trenutna priča: {frontCard.author}. {frontCard.testimonial}
    </p>
  )
}

type CardProps = {
  handleShuffle: () => void
  testimonial: string
  stackIndex: number
  totalCards: number
  imgUrl?: string
  author: string
  shouldReduceMotion: boolean
}

function Card({
  handleShuffle,
  testimonial,
  stackIndex,
  totalCards,
  imgUrl,
  author,
  shouldReduceMotion,
}: CardProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const update = () => setIsSmallScreen(window.innerWidth < 640)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const totalSteps = Math.max(totalCards - 1, 1)
  const maxOffsetX = isSmallScreen ? 90 : 150
  const maxOffsetY = isSmallScreen ? 60 : 90
  const stepX = totalCards > 1 ? maxOffsetX / totalSteps : 0
  const stepY = totalCards > 1 ? maxOffsetY / totalSteps : 0
  const maxRotate = 10
  const rotateZ =
    totalCards > 1 ? -maxRotate / 2 + (maxRotate * stackIndex) / totalSteps : -5
  const scale = totalCards > 1 ? 1 - 0.12 * (stackIndex / totalSteps) : 1
  const opacity =
    totalCards > 1 ? Math.max(0.35, 1 - 0.7 * (stackIndex / totalSteps)) : 1
  const x = stepX * stackIndex
  const y = stepY * stackIndex
  const zIndex = totalCards - stackIndex
  const allowMotion = !shouldReduceMotion
  const isFront = stackIndex === 0

  return (
    <motion.div
      style={{ zIndex, opacity }}
      animate={
        allowMotion
          ? { rotate: rotateZ, x, y, scale }
          : { rotate: '0deg', x: 0, y: 0, scale: 1 }
      }
      drag={allowMotion && isFront ? 'x' : false}
      dragElastic={0.25}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 420, bounceDamping: 38 }}
      dragMomentum={false}
      dragListener={allowMotion && isFront}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={
        allowMotion && isFront
          ? (_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -500) {
                handleShuffle()
              }
            }
          : undefined
      }
      transition={{ duration: allowMotion ? 0.35 : 0 }}
      className="absolute top-0 left-1/2 grid h-[360px] w-60 -translate-x-1/2 cursor-grab place-content-center space-y-5 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_22px_70px_-38px_rgba(0,0,0,0.95)] backdrop-blur-xl select-none active:cursor-grabbing sm:h-[380px] sm:w-[260px] md:h-[430px] md:w-[320px] lg:h-[470px] lg:w-[350px]"
    >
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={`Image of ${author}`}
          width={96}
          height={96}
          sizes="96px"
          className="pointer-events-none mx-auto h-12 w-12 rounded-full border border-white/15 bg-white/10 object-cover sm:h-24 sm:w-24"
        />
      ) : (
        <div
          className="pointer-events-none mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[10px] font-semibold sm:h-24 sm:w-24 sm:text-sm"
          style={getAvatarStyle(author)}
          aria-hidden
        >
          {getInitials(author)}
        </div>
      )}
      <span className="text-center text-xs text-zinc-200 italic sm:text-base">
        &quot;{testimonial}&quot;
      </span>
      <span className="text-center text-[9px] font-semibold tracking-[0.14em] text-emerald-100 uppercase sm:text-xs">
        {author}
      </span>
      {allowMotion ? (
        <span className="text-center text-[11px] text-zinc-400">
          Prevuci levo da vidiš sledeću priču
        </span>
      ) : null}
    </motion.div>
  )
}
