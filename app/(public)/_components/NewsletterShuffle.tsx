'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
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

type ListOrderItem = 'front' | 'middle' | 'back' | 'rear'

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

const getAuthorInitials = (authorLine: string) => {
  const namePart = authorLine.split('-')[0]?.trim() ?? ''
  const tokens = namePart.split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return '?'
  const first = tokens[0]?.[0] ?? ''
  const last = tokens.length > 1 ? (tokens[tokens.length - 1]?.[0] ?? '') : ''
  return `${first}${last}`.toUpperCase()
}

export function NewsletterShuffle({
  hideShuffleCards = false,
}: {
  hideShuffleCards?: boolean
}) {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = !!prefersReducedMotion
  const [order, setOrder] = useState<ListOrderItem[]>([
    'front',
    'middle',
    'back',
    'rear',
  ])
  const [cards, setCards] = useState<TestimonialCard[]>([])
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [notice, setNotice] = useState('')
  const [showSpamNotice, setShowSpamNotice] = useState(false)
  const sectionLayout = hideShuffleCards
    ? 'lg:flex-col lg:items-center lg:justify-center'
    : 'lg:flex-row lg:justify-between'
  const contentLayout = hideShuffleCards
    ? 'lg:mx-auto lg:max-w-2xl lg:items-center lg:text-center'
    : 'lg:max-w-none lg:items-start lg:text-left'

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

        const randomized = shuffleCards(mapped).slice(0, 4)
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
    if (cards.length >= 4) {
      setOrder(['front', 'middle', 'back', 'rear'])
      return
    }

    if (cards.length >= 3) {
      setOrder(['front', 'middle', 'back'])
      return
    }

    setOrder(cards.map(() => 'front'))
  }, [cards])

  const handleShuffle = () => {
    setOrder((prev) => {
      const next = [...prev]
      if (next.length > 1) {
        next.unshift(next.pop() as ListOrderItem)
      }
      return next
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setNotice('')
    setShowSpamNotice(false)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'newsletter-shuffle',
          company,
        }),
      })
      const data = (await response.json().catch(() => null)) as {
        error?: string
        alreadySubscribed?: boolean
      } | null

      if (!response.ok) {
        throw new Error(data?.error ?? 'Request failed')
      }

      setStatus('success')
      setNotice(() => {
        if (data?.alreadySubscribed) {
          setShowSpamNotice(false)
          return 'Vec si prijavljen. Hvala!'
        }
        setShowSpamNotice(true)
        return 'Hvala! Proveri email i potvrdi prijavu!'
      })
      setEmail('')
      setCompany('')
    } catch {
      setStatus('error')
      setNotice('Nesto nije uspelo. Pokusaj ponovo.')
    }
  }

  return (
    <section
      id="newsletter"
      className={`relative mx-auto flex w-screen max-w-6xl flex-col items-center gap-16 overflow-x-hidden bg-transparent px-6 py-20 text-white sm:px-10 lg:px-12 lg:py-24 ${sectionLayout}`}
    >
      <div
        className={`flex w-full max-w-xl flex-col items-center space-y-5 text-center ${contentLayout}`}
      >
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00B3D5]/30 bg-[#00B3D5]/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#d9fbff] uppercase">
          Taste an Onion
        </span>
        <div className="space-y-3">
          <h2 className="text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">
            Pridruži se Taste an Onion pismu
          </h2>
          <p className="text-base text-zinc-200 sm:text-lg">
            Prijavom na Taste an Onion ne dobijaš još jedan mejl u inboxu već
            mali podsetnik da si na putu rasta. Redovno, po jedan komadić
            slatkog ukusa koji ti pomaze da ne posustaneš.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            inputMode="email"
            className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition placeholder:text-zinc-400 focus:border-[#00B3D5] focus:ring-2 focus:ring-[#00B3D5]/50 focus:outline-none"
          />
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full border-0 bg-linear-to-r from-[#01DCA0] via-[#00B3D5] to-[#3201dc] px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_-18px_rgba(1,220,160,0.85)] transition-transform duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_18px_40px_-18px_rgba(0,179,213,0.7)] active:scale-[0.99]"
          >
            <span
              className="absolute inset-0 translate-x-[-120%] bg-white/35 blur-sm transition-transform duration-500 ease-out group-hover:translate-x-[120%]"
              aria-hidden
            />
            <span
              className="relative inline-flex items-center gap-2"
              aria-label={status === 'loading' ? 'Ucitavanje' : undefined}
            >
              {status === 'loading' ? (
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              ) : (
                'Prijavi se ovde'
              )}
            </span>
          </button>
          {status === 'loading' ? (
            <p className="text-sm text-[#d9fbff]/80" role="status">
              Učitavanje u toku...
            </p>
          ) : null}
          {notice ? (
            <p className="text-sm text-[#d9fbff]/80" role="status">
              {notice}
            </p>
          ) : null}
          {showSpamNotice ? (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200/90">
              <AlertCircle className="h-4 w-4" aria-hidden />
              Proveri i spam/promotions folder.
            </p>
          ) : null}
        </form>

        <p className="text-sm text-[#d9fbff]/80">Jedva čekam da se upoznamo.</p>
      </div>

      {!hideShuffleCards && cards.length > 0 ? (
        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-4 lg:max-w-none lg:items-end">
          <div
            className="relative h-[460px] w-full overflow-visible sm:h-[480px] lg:ml-10 xl:ml-16"
            style={{ perspective: 1400 }}
          >
            <AccessibleAnnouncement order={order} cards={cards} />
            {cards.map((card, index) => (
              <Card
                key={card.id ?? `${card.author}-${index}`}
                imgUrl={card.imgUrl}
                testimonial={card.testimonial}
                author={card.author}
                handleShuffle={handleShuffle}
                position={order[index] ?? 'front'}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3 md:justify-center">
            <button
              type="button"
              onClick={handleShuffle}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#00B3D5]/60 bg-[#00B3D5]/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#e6f9ff] uppercase transition hover:scale-[1.02] hover:border-[#00B3D5] active:scale-100"
            >
              Sledeća prica
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
  order: ListOrderItem[]
  cards: TestimonialCard[]
}) {
  const frontCard = useMemo(() => {
    if (cards.length === 0) {
      return null
    }
    const frontIndex = order.indexOf('front')
    if (frontIndex === -1) return cards[0]
    return cards[frontIndex] ?? cards[0]
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
  position: ListOrderItem
  imgUrl?: string
  author: string
  shouldReduceMotion: boolean
}

function Card({
  handleShuffle,
  testimonial,
  position,
  imgUrl,
  author,
  shouldReduceMotion,
}: CardProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const dragStartX = useRef(0)

  useEffect(() => {
    const update = () => setIsSmallScreen(window.innerWidth < 640)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const middleOffsetX = isSmallScreen ? '7%' : '20%'
  const backOffsetX = isSmallScreen ? '14%' : '40%'
  const rearOffsetX = isSmallScreen ? '21%' : '60%'
  const x =
    position === 'front'
      ? '0%'
      : position === 'middle'
        ? middleOffsetX
        : position === 'back'
          ? backOffsetX
          : rearOffsetX
  const rotateZ =
    position === 'front'
      ? '-7deg'
      : position === 'middle'
        ? '-2deg'
        : position === 'back'
          ? '2deg'
          : '7deg'
  const zIndex =
    position === 'front'
      ? 3
      : position === 'middle'
        ? 2
        : position === 'back'
          ? 1
          : 0
  const opacity = position === 'rear' ? 0.55 : position === 'back' ? 0.75 : 1
  const allowMotion = !shouldReduceMotion
  const isFront = position === 'front'

  return (
    <motion.div
      style={{ zIndex, opacity }}
      animate={allowMotion ? { rotate: rotateZ, x } : { rotate: '0deg', x: 0 }}
      drag={allowMotion && isFront ? 'x' : false}
      dragElastic={0.35}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 420, bounceDamping: 38 }}
      dragMomentum={false}
      dragListener={allowMotion && isFront}
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={
        allowMotion && isFront
          ? (_, info) => {
              dragStartX.current = info.point.x
            }
          : undefined
      }
      onDragEnd={
        allowMotion && isFront
          ? (_, info) => {
              const diff = dragStartX.current - info.point.x
              if (diff > 150) {
                handleShuffle()
              }
              dragStartX.current = 0
            }
          : undefined
      }
      transition={{ duration: allowMotion ? 0.35 : 0 }}
      className="absolute top-0 left-1/2 grid h-80 w-56 -translate-x-1/2 cursor-grab place-content-center space-y-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_22px_70px_-38px_rgba(0,0,0,0.95)] backdrop-blur-xl select-none active:cursor-grabbing sm:h-[350px] sm:w-60 md:h-[400px] md:w-[300px] lg:h-[440px] lg:w-[320px]"
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
        <div className="pointer-events-none mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-zinc-800/70 text-xs font-semibold text-[#d9fbff] sm:h-24 sm:w-24 sm:text-base">
          {getAuthorInitials(author)}
        </div>
      )}
      <span className="text-center text-xs text-zinc-200 italic sm:text-base">
        &quot;{testimonial}&quot;
      </span>
      <span className="text-center text-[9px] font-semibold tracking-[0.14em] text-[#d9fbff] uppercase sm:text-xs">
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
