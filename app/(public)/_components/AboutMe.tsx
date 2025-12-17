'use client'

import Image from 'next/image'
import { ArrowUpRight, Sparkles, Target } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMemo, useRef } from 'react'

const highlights = [
  'Scrum Master, agilni trener i bloger - radim sa timovima i pojedincima.',
  'Agilnost prevodim u jasne ritmove, povratnu informaciju i merljiv napredak.',
  'Iz fabrike do vodjenja timova: iskustvo mi pomaze da vidim i ljude i procese.',
]

const signals = [
  { label: 'jasna mapa', icon: Target },
  { label: 'ritam i navike', icon: Sparkles },
  { label: 'iskrena povratna', icon: ArrowUpRight },
]

export function AboutMe() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const floatY = useTransform(scrollYProgress, [0, 1], [0, -36])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const bullets = useMemo(() => highlights, [])

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative isolate mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 px-5 py-16 text-white shadow-[0_30px_90px_-65px_rgba(0,0,0,1)] sm:px-10 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <motion.div
          style={{ scale: glowScale }}
          className="absolute inset-x-0 top-6 mx-auto h-72 w-3/4 rounded-[32px] bg-emerald-500/15 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(16,185,129,0.14),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(56,189,248,0.16),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_40%)]" />
      </div>

      <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-16">
        <motion.div
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-100 lg:mx-0">
            Ko sam ja?
          </span>
          <div className="space-y-4">
            <h2
              id="about-heading"
              className="mx-auto text-3xl leading-tight font-semibold sm:text-4xl lg:mx-0"
            >
              Zeljko Kopric, tvoj partner za agilnost koja se zaista desava.
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-200 lg:mx-0">
              Pomazem ljudima da se pomere sa mrtve tacke tako sto pojednostavim
              plan, uvedem ritam i obezbedim da se napredak meri. Bez buke, sa
              dosta poverenja i jasnih odluka.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur">
            {bullets.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 text-left text-sm text-zinc-100 sm:text-base"
              >
                <div className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-emerald-400" />
                <p className="leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {signals.map((signal) => (
              <span
                key={signal.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-100"
              >
                <signal.icon className="h-4 w-4" aria-hidden />
                {signal.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ y: floatY }}
          className="relative w-full max-w-xl self-center"
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-emerald-500/15 via-sky-400/12 to-amber-300/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/80 shadow-[0_32px_80px_-60px_rgba(0,0,0,1)] ring-1 ring-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_38%)]" />
            <Image
              src="/media/aboutme.png"
              alt="Zeljko Kopric"
              width={900}
              height={1200}
              className="h-full w-full object-cover transition duration-500"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-xs uppercase tracking-[0.22em] text-emerald-100">
              <span>Agilno, ali vrlo licno</span>
              <Sparkles className="h-4 w-4 text-amber-200" aria-hidden />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
