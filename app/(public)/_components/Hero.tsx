'use client'

import { Button } from '@/components/ui/Button'
import { motion, useInView, useReducedMotion } from 'motion/react'
import NextImage from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Cta = { label: string; href: string }

type HeroProps = {
  kicker?: string
  title: string
  subtitle: string
  primaryCta: Cta
  secondaryCta?: Cta
  image?: { src: string; alt: string }
}

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

export function Hero({
  kicker,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  const [imagesReady, setImagesReady] = useState(false)
  const shouldReduceMotion = !!useReducedMotion()
  const heroRef = useRef<HTMLElement | null>(null)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    let isCancelled = false

    const preloadImages = async () => {
      await Promise.all(
        GRID_IMAGES.map(
          (src) =>
            new Promise<void>((resolve) => {
              const img = new globalThis.Image()
              img.onload = img.onerror = () => resolve()
              img.src = src
            }),
        ),
      )

      if (isCancelled) return
      setImagesReady(true)
    }

    preloadImages()
    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    const updateScroll = () => setIsAtTop(window.scrollY === 0)
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative -mx-[calc((100vw-100%)/2)] w-screen px-5 py-16 text-white sm:px-8 md:py-16 lg:py-14"
    >
      <div className="mx-auto flex min-h-[85vh] w-full max-w-6xl flex-col items-center gap-8 bg-transparent lg:flex-row lg:items-center">
        <div className="flex w-full flex-col items-center space-y-6 text-center sm:space-y-8 lg:items-start lg:text-left">
          <div className="flex w-full justify-center lg:justify-start">
            <NextImage
              src="/media/brand/agile-onion-logo-color.svg"
              alt="Agile Onion"
              width={180}
              height={48}
              className="mx-auto h-auto w-40 sm:w-48 lg:w-56 lg:mx-0"
              priority
            />
          </div>

          {kicker ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-emerald-100 uppercase">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400"
                aria-hidden
              />
              {kicker}
            </span>
          ) : null}

          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-5xl sm:leading-[1.1]">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              {subtitle}
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 text-base font-medium sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
            <Button
              as="a"
              href={primaryCta.href}
              className="group relative w-full overflow-hidden border-0 bg-linear-to-r from-emerald-400 via-emerald-500 to-sky-500 text-black shadow-[0_12px_30px_-18px_rgba(16,185,129,0.9)] transition-transform duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_18px_40px_-18px_rgba(56,189,248,0.8)] active:scale-[0.99] sm:w-auto"
            >
              <span
                className="absolute inset-0 translate-x-[-120%] bg-white/35 blur-sm transition-transform duration-500 ease-out group-hover:translate-x-[120%]"
                aria-hidden
              />
              {primaryCta.label}
            </Button>
            {secondaryCta ? (
              <Button
                as="a"
                href={secondaryCta.href}
                variant="ghost"
                className="w-full border border-emerald-300/50 bg-white/10 text-emerald-100 hover:bg-white/20 sm:w-auto"
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>

        <div className="flex w-full justify-center lg:justify-end">
          <div className="relative w-full max-w-[520px] overflow-visible rounded-2xl bg-transparent shadow-[0_25px_70px_-30px_rgba(0,0,0,0.65)] sm:max-w-[560px]">
            <ShuffleGrid
              startShuffling={imagesReady && !shouldReduceMotion && isAtTop}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

type ShuffleGridProps = {
  startShuffling: boolean
  shouldReduceMotion: boolean
}

function ShuffleGrid({ startShuffling, shouldReduceMotion }: ShuffleGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInView = useInView(containerRef, { margin: '0px 0px -25% 0px' })
  const [isMobile, setIsMobile] = useState(false)
  const [squares, setSquares] = useState<{ id: string; src: string }[]>(() =>
    GRID_IMAGES.slice(0, 16).map((src) => ({ id: src, src })),
  )

  const refreshSquaresForViewport = (mobile: boolean) => {
    const targetImages = mobile
      ? GRID_IMAGES.slice(0, 12)
      : GRID_IMAGES.slice(0, 16)
    setSquares((prev) => {
      if (
        prev.length === targetImages.length &&
        targetImages.every((src) => prev.some((item) => item.src === src))
      ) {
        return prev
      }
      return targetImages.map((src) => ({ id: src, src }))
    })
  }

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640
      setIsMobile(mobile)
      refreshSquaresForViewport(mobile)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!startShuffling || !isInView || isMobile) return undefined

    const shuffleSquares = () => {
      setSquares((prev) => shuffle([...prev]))
      timeoutRef.current = setTimeout(shuffleSquares, 3000)
    }

    timeoutRef.current = setTimeout(shuffleSquares, 0)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [startShuffling, isInView, isMobile])

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="grid h-60 auto-rows-fr grid-cols-3 gap-2 sm:h-72"
      >
        {squares.map(({ id, src }) => (
          <div
            key={id}
            className="h-full w-full overflow-hidden rounded-xl bg-zinc-900/60 shadow-inner shadow-black/40"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      layout={!shouldReduceMotion}
      ref={containerRef}
      className="grid h-60 auto-rows-fr grid-cols-3 gap-2 sm:h-80 sm:grid-cols-4 md:h-[360px]"
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: 'easeOut' }
      }
    >
      {squares.map(({ id, src }) => (
        <motion.div
          key={id}
          layout={!shouldReduceMotion}
          layoutId={id}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            shouldReduceMotion
              ? { opacity: { duration: 0 } }
              : {
                  layout: { type: 'spring', duration: 1.5 },
                  opacity: { duration: 0.25 },
                }
          }
          className="h-full w-full overflow-visible rounded-xl bg-zinc-900/60 shadow-inner shadow-black/40"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </motion.div>
  )
}

function shuffle<T>(list: T[]) {
  const array = [...list]
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
