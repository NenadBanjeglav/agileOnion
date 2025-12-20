/* eslint-disable @next/next/no-img-element */
'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const SECTION_HEIGHT = 1700
const SECTION_HEIGHT_MOBILE = 1200

const PARALLAX_IMAGES = [
  {
    src: '/media/backgrounds/paralax.jpg',
    alt: 'Parallax background',
    start: -180,
    end: 200,
    className: 'w-full sm:w-1/3',
    quote: '"Budi uporan u viziji, ali fleksibilan u detaljima." — Jeff Bezos',
  },
  {
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop',
    alt: 'Notebook and coffee',
    start: 220,
    end: -260,
    className: 'mx-auto w-full sm:w-2/3',
    quote:
      '"Znanje bez primene je kao seme koje nikad ne proklija." — Paulo Coelho',
  },
  {
    src: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=2000&auto=format&fit=crop',
    alt: 'Person walking on ridge',
    start: -200,
    end: 220,
    className: 'ml-auto hidden w-1/3 sm:block',
    quote:
      '"Agilnost počinje sa skromnošću — onog trenutka kada priznaš da i dalje imaš šta da naučiš." — Mike Cohn',
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop',
    alt: 'Sunlit forest',
    start: 40,
    end: -520,
    className: 'ml-24 hidden w-5/12 md:block',
    quote: '"Disciplinom gradiš slobodu, a navikama snagu."',
  },
]

export function ParallaxSection() {
  return (
    <section className="relative w-full bg-transparent text-white">
      <Hero />
    </section>
  )
}

function Hero() {
  const [sectionHeight, setSectionHeight] = useState(SECTION_HEIGHT)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const updateHeight = () => {
      setSectionHeight(
        window.matchMedia('(max-width: 640px)').matches
          ? SECTION_HEIGHT_MOBILE
          : SECTION_HEIGHT,
      )
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <div
      style={{ height: `calc(${sectionHeight}px + 100vh)` }}
      className="relative w-full"
      ref={heroRef}
    >
      <CenterImage progress={scrollYProgress} />
      <ParallaxImages />
      <div className="absolute right-0 bottom-0 left-0 h-72 bg-linear-to-b from-black/0 to-black sm:h-96" />
    </div>
  )
}

function CenterImage({
  progress,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const fastProgress = useTransform(progress, [0, 0.4], [0, 1])
  const clipPath = useTransform(fastProgress, (value) => {
    const clip1 = 25 - 25 * value
    return `inset(${clip1}% ${clip1}% ${clip1}% ${clip1}% round 1.5rem)`
  })

  const backgroundSize = useTransform(fastProgress, [0, 0.12], ['240%', '100%'])

  return (
    <motion.div className="sticky top-0 h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10">
        <motion.div
          className="absolute inset-0 bg-[url('/media/backgrounds/parallax.jpg')] bg-center bg-no-repeat"
          style={{ clipPath, backgroundSize }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-lg font-semibold text-white sm:text-2xl lg:text-3xl">
          <span
            className="max-w-lg sm:max-w-2xl"
            style={{
              textShadow:
                '0 8px 24px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.6)',
              WebkitTextStroke: '0.6px rgba(0, 0, 0, 0.35)',
            }}
          >
            &quot;Budi uporan u viziji, ali fleksibilan u detaljima.&quot; —
            Jeff Bezos
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function ParallaxImages() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 pt-16 sm:pt-[200px]">
      {PARALLAX_IMAGES.map((image) => (
        <ParallaxImage key={image.src} {...image} />
      ))}
    </div>
  )
}

type ParallaxImageProps = {
  className?: string
  alt: string
  src: string
  start: number
  end: number
  quote: string
}

function ParallaxImage({
  className,
  alt,
  src,
  start,
  end,
  quote,
}: ParallaxImageProps) {
  const ref = useRef<HTMLFrameElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  })

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 1], [start, end])

  return (
    <motion.figure
      ref={ref}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 ring-1 ring-white/5 ${className}`}
      style={{ y, opacity, scale }}
    >
      <img
        src={src}
        alt={alt}
        className="block h-full w-full object-cover"
        loading="lazy"
      />
      <figcaption className="absolute inset-0 flex items-center justify-center px-5 text-center text-sm font-semibold text-white sm:text-base">
        <span className="max-w-88 sm:max-w-md">{quote}</span>
      </figcaption>
    </motion.figure>
  )
}
