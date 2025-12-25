'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { blogSections } from '@/lib/content/blog'

type AltLayer = {
  id: string
  title: string
  description: string
  image: string
}

const layerImages: Record<string, string> = {
  'mindset-lab': '/media/trail/trail-notebook.webp',
  'agile-club': '/media/trail/trail-collab.webp',
  'scrum-office': '/media/trail/trail-office.webp',
  'very-agile-personas': '/media/trail/trail-retro.webp',
}

const altLayers: AltLayer[] = blogSections.map((section) => ({
  id: section.slug,
  title: section.title,
  description: section.summary,
  image: layerImages[section.slug] ?? '/media/trail/trail-notes.webp',
}))

export function BlogCategories() {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion
  const headingId = 'blog-layers-alt-heading'

  return (
    <section
      id="layers-alt"
      className="relative -mx-[calc((100vw-100%)/2)] w-screen bg-transparent px-4 py-16 text-white sm:px-8 md:py-20"
      aria-labelledby={headingId}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10">
        <div className="flex flex-col items-center gap-3 text-center sm:text-left lg:items-start">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00B3D5]/30 bg-[#00B3D5]/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#d9fbff] uppercase">
            Agile Onion slojevi
          </span>
          <div className="grid w-full gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
            <div className="space-y-4 sm:space-y-5">
              <h2
                id={headingId}
                className="text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl"
              >
                Budi ti deo Agile Onion zajednice i evo sta dobijas:
              </h2>
            </div>

            <ul className="mx-auto w-full max-w-3xl space-y-3 text-left text-base leading-relaxed text-zinc-200 sm:mx-0 sm:text-lg">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#01DCA0]" />
                <span>
                  redovne odmah primenljive lekcije o Scrum okviru i agilnoj filozofiji;
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#01DCA0]" />
                <span>
                  super-mocne tehnike za razvoj mindseta i prakticne vezbe;
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#01DCA0]" />
                <span>
                  inspirativne price ljudi koji su presli put od ideje do manifestacije;
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#01DCA0]" />
                <span>moju bezrezervnu podrsku.</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm font-semibold tracking-[0.22em] text-[#00B3D5] uppercase sm:text-left">
          Agile Onion blog sadrzi sledece kategorije:
        </p>

        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
          {altLayers.map((layer) => (
            <ColorCard key={layer.id} layer={layer} allowMotion={allowMotion} />
          ))}
        </div>

        <p className="mx-auto max-w-4xl text-center text-base leading-relaxed text-zinc-200 sm:text-lg">
          Otkrivaj sloj po sloj, onako kako tebi prija, i vrlo brzo ces osetiti
          neodoljivi ukus koji te vise nece napustati. Sladak ukus tvog rasta.
        </p>
      </div>
    </section>
  )
}

function ColorCard({
  layer,
  allowMotion,
}: {
  layer: AltLayer
  allowMotion: boolean
}) {
  return (
    <Link
      href={`/blog/category/${layer.id}`}
      className="group block rounded-3xl focus-visible:ring-2 focus-visible:ring-[#00B3D5]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
      aria-label={`${layer.title} category`}
    >
      <motion.article
        id={layer.id}
        className="relative h-[280px] transform-gpu overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 shadow-[0_28px_70px_-38px_rgba(0,0,0,0.9)] ring-1 ring-white/5 transition duration-200"
        whileHover={allowMotion ? 'hover' : undefined}
      >
        <div
          className="absolute inset-0 opacity-85 saturate-100 transition-transform duration-600 group-hover:scale-110"
          style={{
            backgroundImage: `url(${layer.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-95 transition-opacity duration-500 group-hover:opacity-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(12,12,12,0.5), rgba(28,28,28,0.46), rgba(48,48,48,0.42))',
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#0b0f0f] via-black/35 to-transparent"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
          <ArrowUpRight
            className="ml-auto h-6 w-6 text-[#eaffff] transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12"
            aria-hidden="true"
          />

          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-2xl leading-tight font-semibold text-white transition-colors duration-300 sm:text-[26px]">
                {layer.title.split('').map((letter, idx) => (
                  <ShiftLetter
                    key={`${layer.id}-${idx}-${letter}`}
                    letter={letter}
                    allowMotion={allowMotion}
                  />
                ))}
              </h3>
              <p
                className="max-w-xl text-sm leading-relaxed text-zinc-100/90 sm:text-base"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {layer.description}
              </p>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}

function ShiftLetter({
  letter,
  allowMotion,
}: {
  letter: string
  allowMotion: boolean
}) {
  if (letter === ' ') {
    return <span className="inline-block w-[0.45ch]" aria-hidden />
  }

  return (
    <span className="inline-block h-9 overflow-hidden align-bottom sm:h-[38px]">
      <motion.span
        className="flex min-w-1.5 flex-col"
        style={{ y: '0%' }}
        variants={
          allowMotion
            ? {
                hover: { y: '-50%' },
              }
            : undefined
        }
        transition={{ duration: 0.45 }}
        aria-hidden
      >
        <span>{letter}</span>
        <span className="text-[#00B3D5]">{letter}</span>
      </motion.span>
      <span className="sr-only">{letter}</span>
    </span>
  )
}