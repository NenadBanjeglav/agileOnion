'use client'

import { Button } from '@/components/ui/Button'
import {
  motion,
  useAnimate,
  useReducedMotion,
  type Variants,
} from 'motion/react'
import NextImage from 'next/image'
import { useMemo, useRef, type MouseEventHandler, type ReactNode } from 'react'

const GRID_IMAGES = [
  '/media/hero/team-meeting.webp',
  '/media/trail/trail-workshop.webp',
  '/media/trail/trail-standup.webp',
  '/media/trail/trail-postits.webp',
  '/media/trail/trail-office.webp',
  '/media/trail/trail-notebook.webp',
  '/media/trail/trail-retro.webp',
  '/media/trail/trail-sprint.webp',
  '/media/trail/trail-speaker.webp',
  '/media/trail/trail-collab.webp',
  '/media/trail/trail-kanban.webp',
  '/media/trail/trail-nightshift.webp',
  '/media/trail/trail-notes.webp',
  '/media/trail/trail-street.webp',
  '/media/trail/trail-quote.webp',
  '/media/trail/trail-gear.webp',
]

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion
  const title =
    'OVAJ BLOG JE PUT DO TVOG NESALOMIVOG MINDSETA. POCINJES SADA I TO BAS OVDE. BEZ ODLAGANJA.'
  const subtitle = 'AGILNI PRINCIPI, GROWTH MINDSET METODE, SCRUM OKVIR'
  const primaryCta = { label: 'Prijavi se na newsletter', href: '#newsletter' }
  const secondaryCta = { label: 'Pogledaj blog', href: '#blog' }
  const titleWords = useMemo(() => title.split(' '), [title])
  const subtitleWords = useMemo(() => subtitle.split(' '), [subtitle])
  const wordColors = [
    '#01DCA0',
    '#00B3D5',
    '#6DDCFF',
    '#9B5CFF',
    '#FFD66B',
    '#FF7A7A',
  ]
  const getWordGradient = (i: number) => {
    const start = wordColors[i % wordColors.length]
    const end = wordColors[(i + 2) % wordColors.length]
    return `linear-gradient(120deg, ${start}, ${end})`
  }

  const easing = [0.16, 1, 0.3, 1] as const

  const wordVariants: Variants = {
    hidden: {
      y: 18,
      opacity: 0,
      filter: 'blur(6px)',
      backgroundImage: 'linear-gradient(120deg, #9ca3af, #f3f4f6)',
    },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      backgroundImage: getWordGradient(i),
      transition: { duration: 0.4, delay: i * 0.05, ease: easing },
    }),
  }

  const subtitleVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.28,
        delay: 0.4 + i * 0.04,
        ease: easing,
      },
    }),
  }

  const heroContent = (
    <section
      ref={heroRef}
      id="top"
      className="relative isolate -mx-[calc((100vw-100%)/2)] w-screen overflow-hidden px-5 py-16 text-white sm:px-8 md:py-16 lg:py-14"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-start gap-10 pt-6 text-center sm:pt-8 lg:justify-center lg:pt-0">
        <div className="relative z-20 flex w-full flex-col items-center gap-8 sm:gap-10">
          <div className="relative flex w-full items-center justify-center">
            <div
              className="absolute inset-4 rounded-[28px] bg-[#01DCA0]/20 blur-3xl"
              aria-hidden
            />
            <NextImage
              src="/media/brand/agile-onion-logo-color.svg"
              alt="Agile Onion logo"
              priority
              width={560}
              height={260}
              className="relative h-auto w-[300px] drop-shadow-[0_24px_60px_rgba(16,185,129,0.35)] sm:w-[360px] md:w-[420px]"
            />
          </div>

          <div className="space-y-5 sm:space-y-6">
            {allowMotion ? (
              <motion.h1
                id="hero-title"
                className="relative inline-block max-w-3xl text-3xl leading-tight font-semibold tracking-tight sm:text-5xl sm:leading-[1.05]"
                initial="hidden"
                animate="show"
              >
                {titleWords.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    custom={i}
                    variants={wordVariants}
                    className="inline-block bg-clip-text pr-2 text-transparent"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
            ) : (
              <h1
                id="hero-title"
                className="relative inline-block max-w-3xl text-3xl leading-tight font-semibold tracking-tight sm:text-5xl sm:leading-[1.05]"
              >
                {title}
              </h1>
            )}

            {allowMotion ? (
              <motion.p
                className="mx-auto max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg"
                initial="hidden"
                animate="show"
              >
                {subtitleWords.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    custom={i}
                    variants={subtitleVariants}
                    className="inline-block pr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            ) : (
              <p className="mx-auto max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
                {subtitle}
              </p>
            )}

            <div className="space-y-2">
              {allowMotion ? (
                <motion.div
                  className="mx-auto h-1 w-full max-w-sm origin-left overflow-hidden rounded-full bg-white/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
                >
                  <div className="h-full w-full bg-linear-to-r from-[#01DCA0] via-[#00B3D5] to-[#3201dc]" />
                </motion.div>
              ) : (
                <div className="mx-auto h-1 w-full max-w-sm overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-full bg-linear-to-r from-[#01DCA0] via-[#00B3D5] to-[#3201dc]" />
                </div>
              )}
              <div className="flex justify-center gap-3">
                {allowMotion
                  ? [0.65, 0.9, 1.2].map((delay, idx) => (
                      <motion.span
                        key={idx}
                        className="h-2.5 w-2.5 rounded-full bg-[#01DCA0]/70"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay,
                          duration: 0.35,
                          ease: 'backOut',
                        }}
                      />
                    ))
                  : [0, 1, 2].map((idx) => (
                      <span
                        key={idx}
                        className="h-2.5 w-2.5 rounded-full bg-[#01DCA0]/70"
                      />
                    ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 text-base font-medium sm:flex-row sm:justify-center sm:gap-4">
              <Button
                as="a"
                href={primaryCta.href}
                className="group relative w-full overflow-hidden border-0 bg-linear-to-r from-[#01DCA0] via-[#00B3D5] to-[#3201dc] text-black shadow-[0_12px_30px_-18px_rgba(1,220,160,0.85)] transition-transform duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_18px_40px_-18px_rgba(0,179,213,0.7)] active:scale-[0.99] sm:w-auto"
              >
                <span
                  className="absolute inset-0 translate-x-[-120%] bg-white/35 blur-sm transition-transform duration-500 ease-out group-hover:translate-x-[120%]"
                  aria-hidden
                />
                {primaryCta.label}
              </Button>
              <Button
                as="a"
                href={secondaryCta.href}
                variant="ghost"
                className="w-full border border-[#00B3D5]/50 bg-white/10 text-[#d9fbff] hover:bg-white/20 sm:w-auto"
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  if (!allowMotion) {
    return heroContent
  }

  return (
    <MouseImageTrail
      images={GRID_IMAGES}
      renderImageBuffer={40}
      rotationRange={14}
      className="relative"
    >
      {heroContent}
    </MouseImageTrail>
  )
}

function MouseImageTrail({
  children,
  images,
  renderImageBuffer,
  rotationRange,
  className = '',
}: {
  children: ReactNode
  images: string[]
  renderImageBuffer: number
  rotationRange: number
  className?: string
}) {
  const [scope, animate] = useAnimate()
  const last = useRef({ x: 0, y: 0 })
  const count = useRef(0)

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const { clientX, clientY } = event
    const distance = Math.hypot(
      clientX - last.current.x,
      clientY - last.current.y,
    )
    if (distance < renderImageBuffer) return

    last.current = { x: clientX, y: clientY }
    renderNextImage()
  }

  const renderNextImage = () => {
    const imageIndex = count.current % images.length
    const selector = `[data-trail="${imageIndex}"]`
    const el = document.querySelector(selector) as HTMLElement | null
    if (!el) return

    el.style.top = `${last.current.y}px`
    el.style.left = `${last.current.x}px`
    el.style.zIndex = '0'

    const rotation = Math.random() * rotationRange
    const direction = imageIndex % 2 === 0 ? 1 : -1

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) rotate(${direction * rotation}deg)`,
          `translate(-50%, -50%) scale(1) rotate(${-direction * rotation}deg)`,
        ],
      },
      { type: 'spring', damping: 15, stiffness: 200 },
    )

    animate(
      selector,
      { opacity: [1, 0] },
      { ease: 'linear', duration: 0.5, delay: 1 },
    )

    count.current += 1
  }

  return (
    <div
      ref={scope}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-50">{children}</div>
      <div className="pointer-events-none absolute inset-0 z-0">
        {images.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            data-trail={index}
            className="pointer-events-none absolute top-0 left-0 h-32 w-auto rounded-xl border border-white/10 bg-black/50 object-cover opacity-0"
          />
        ))}
      </div>
    </div>
  )
}
