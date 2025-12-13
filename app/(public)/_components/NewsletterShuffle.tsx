'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

type ListOrderItem = 'front' | 'middle' | 'back'

const cards = [
  {
    imgUrl: '/media/trail/trail-office.webp',
    testimonial:
      'Jedan mejl nedeljno i tačno znam šta da probam sledeće. Željko piše kao prijatelj, ne kao prodavac.',
    author: 'Ana, Scrum Master',
  },
  {
    imgUrl: '/media/trail/trail-speaker.webp',
    testimonial:
      'Taste an Onion me podseti da rast ide sloj po sloj. Blagi podsetnik, bez pritiska.',
    author: 'Miloš, Product Owner',
  },
  {
    imgUrl: '/media/trail/trail-collab.webp',
    testimonial:
      'Najbolji miks mindseta i agilnosti u inboxu. Kratko, jasno, odmah primenljivo.',
    author: 'Ivana, Agile Coach',
  },
]

export function NewsletterShuffle() {
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = !!prefersReducedMotion
  const [order, setOrder] = useState<ListOrderItem[]>([
    'front',
    'middle',
    'back',
  ])

  const handleShuffle = () => {
    setOrder((prev) => {
      const next = [...prev]
      next.unshift(next.pop() as ListOrderItem)
      return next
    })
  }

  return (
    <section
      id="newsletter"
      className="relative -mx-[calc((100vw-100%)/2)] w-screen overflow-x-hidden bg-transparent px-6 py-16 text-white sm:px-10 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:justify-items-start lg:gap-10">
        <div className="flex w-full max-w-xl flex-col items-center space-y-5 text-center lg:max-w-none lg:items-start lg:text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-emerald-100 uppercase">
            Taste an Onion
          </span>
          <div className="space-y-3">
            <h2 className="text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">
              Pridruži se Taste an Onion pismu
            </h2>
            <p className="text-base text-zinc-200 sm:text-lg">
              Prijavom na Taste an Onion ne dobijaš još jedan mejl u inboxu — već mali podsetnik da si na putu rasta. Svake nedelje po jedan komadić slatkog ukusa koji ti pomaže da ne posustaneš.
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

        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center gap-4 lg:max-w-none lg:items-end">
          <div
            className="relative h-[460px] w-full overflow-visible sm:h-[480px] lg:ml-10 xl:ml-16"
            style={{ perspective: 1400 }}
          >
            <AccessibleAnnouncement order={order} />
            {cards.map((card, idx) => (
              <Card
                key={card.author}
                imgUrl={card.imgUrl}
                testimonial={card.testimonial}
                author={card.author}
                handleShuffle={handleShuffle}
                position={order[idx]}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center gap-3 md:justify-end">
            <button
              type="button"
              onClick={handleShuffle}
              className="inline-flex items-center justify-center rounded-full border border-emerald-300/60 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-emerald-50 uppercase transition hover:scale-[1.02] hover:border-emerald-200 active:scale-100"
            >
              Sledeća priča
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function AccessibleAnnouncement({ order }: { order: ListOrderItem[] }) {
  const frontCard = useMemo(() => {
    const index = order.indexOf('front')
    return cards[index] ?? cards[0]
  }, [order])

  return (
    <p className="sr-only" aria-live="polite">
      Trenutna priča: {frontCard?.author}. {frontCard?.testimonial}
    </p>
  )
}

type CardProps = {
  handleShuffle: () => void
  testimonial: string
  position: ListOrderItem
  imgUrl: string
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

  useEffect(() => {
    const update = () => setIsSmallScreen(window.innerWidth < 640)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const middleOffset = isSmallScreen ? '14%' : '18%'
  const backOffset = isSmallScreen ? '28%' : '36%'
  const x =
    position === 'front'
      ? '0%'
      : position === 'middle'
        ? middleOffset
        : backOffset
  const rotateZ =
    position === 'front' ? '-5deg' : position === 'middle' ? '0deg' : '4deg'
  const zIndex = position === 'front' ? 12 : position === 'middle' ? 11 : 10
  const allowMotion = !shouldReduceMotion

  return (
    <motion.div
      style={{ zIndex }}
      animate={allowMotion ? { rotate: rotateZ, x } : { rotate: '0deg', x: 0 }}
      drag={allowMotion ? 'x' : false}
      dragElastic={0.25}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 420, bounceDamping: 38 }}
      dragMomentum={false}
      dragListener={allowMotion}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={
        allowMotion
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
      <Image
        src={imgUrl}
        alt={`Image of ${author}`}
        width={96}
        height={96}
        sizes="96px"
        className="pointer-events-none mx-auto h-24 w-24 rounded-full border border-white/15 bg-white/10 object-cover"
      />
      <span className="text-center text-base text-zinc-200 italic">
        &quot;{testimonial}&quot;
      </span>
      <span className="text-center text-xs font-semibold tracking-[0.14em] text-emerald-100 uppercase">
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
