'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

type AltLayer = {
  id: string
  title: string
  description: string
  image: string
}

const altLayers: AltLayer[] = [
  {
    id: 'mindset-lab-alt',
    title: 'Mindset Lab',
    description:
      'Eksperimenti za rast: motivacija, disciplina, emocije — pomeraj svoje granice uz mantil na sebi.',
    image: '/media/trail/trail-notebook.webp',
  },
  {
    id: 'agile-club-alt',
    title: 'Agile Club',
    description:
      'Agilnost počinje od tebe: fokus, prilagođavanje i otkrivanje novog ja — upadaj u klub.',
    image: '/media/trail/trail-collab.webp',
  },
  {
    id: 'scrum-office-alt',
    title: 'Scrum Office',
    description:
      'Scrum bez suve teorije: realne situacije, deljena odgovornost i jedna agilna porodica.',
    image: '/media/trail/trail-office.webp',
  },
  {
    id: 'vap-alt',
    title: 'Very Agile Personas',
    description:
      'Priče sanjara i buntovnika koji ne odustaju dok snovi ne postanu stvarnost.',
    image: '/media/trail/trail-retro.webp',
  },
]

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
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-emerald-100 uppercase">
            Istraži blog sekcije
          </span>
          <div className="space-y-3 sm:space-y-4">
            <h2
              id={headingId}
              className="text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl"
            >
              Izaberi sloj koji ti najviše odgovara
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-zinc-200 sm:text-lg">
              Otkrij teme koje te najviše pokreću i uđi dublje u svet agilnosti,
              rasta i ličnog razvoja.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
          {altLayers.map((layer) => (
            <ColorCard key={layer.id} layer={layer} allowMotion={allowMotion} />
          ))}
        </div>
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
    <motion.article
      id={layer.id}
      className="group relative h-[280px] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 shadow-[0_28px_70px_-38px_rgba(0,0,0,0.9)] ring-1 ring-white/5 transition duration-200 focus-visible:ring-2 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
      whileHover={allowMotion ? 'hover' : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        allowMotion
          ? { duration: 0.6, ease: 'easeOut', staggerChildren: 0.035 }
          : { duration: 0.6, ease: 'easeOut' }
      }
      tabIndex={0}
      role="group"
      aria-label={`${layer.title} section`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          event.currentTarget.click()
        }
      }}
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
          className="ml-auto h-6 w-6 text-emerald-50 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12"
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
            <p className="max-w-xl text-sm leading-relaxed text-zinc-100/90 sm:text-base">
              {layer.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
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
        <span className="text-emerald-200">{letter}</span>
      </motion.span>
      <span className="sr-only">{letter}</span>
    </span>
  )
}
