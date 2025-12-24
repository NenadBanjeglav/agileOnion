'use client'

import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMemo, useRef } from 'react'

const highlights = ['Scrum Master', 'Agilni entuzijasta', 'Bloger']

export function AboutMe() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const floatY = useTransform(scrollYProgress, [0, 1], [0, -36])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 240])
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 18])
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  const bullets = useMemo(() => highlights, [])

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 px-6 py-16 text-white shadow-[0_30px_90px_-65px_rgba(0,0,0,1)] sm:px-10 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <motion.div
          style={{ scale: glowScale }}
          className="absolute inset-x-0 top-6 mx-auto h-72 w-3/4 rounded-4xl bg-emerald-500/15 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(16,185,129,0.14),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(56,189,248,0.16),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_40%)]" />
        <motion.img
          src="/media/backgrounds/paralax-logo.png"
          alt=""
          aria-hidden
          className="absolute top-10 -right-10 w-52 opacity-70 lg:top-6 lg:-right-6 lg:w-64"
          style={{ y: logoY, rotate: logoRotate, scale: logoScale }}
        />
      </div>

      <div className="mt-6 lg:mt-8 lg:flow-root">
        <motion.div
          className="space-y-6 text-center lg:text-left"
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-emerald-100 uppercase lg:mx-0">
            Ko sam ja?
          </span>
          <div className="space-y-5">
            <h2
              id="about-heading"
              className="mx-auto text-3xl leading-tight font-semibold sm:text-4xl lg:mx-0"
            >
              Ja sam Željko Koprić, tvoj partner za agilnost koja se zaista
              dešava.
            </h2>
            <motion.div
              style={{ y: floatY }}
              className="relative mx-auto w-full max-w-md sm:max-w-lg lg:float-right lg:mx-0 lg:mb-6 lg:ml-10 lg:w-[420px] lg:max-w-none"
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute -inset-6 rounded-[36px] bg-linear-to-br from-emerald-500/15 via-sky-400/12 to-amber-300/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/80 shadow-[0_32px_80px_-60px_rgba(0,0,0,1)] ring-1 ring-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_38%)]" />
                <Image
                  src="/media/aboutme.jpg"
                  alt="Željko Koprić"
                  width={900}
                  height={1200}
                  className="h-full w-full object-cover transition duration-500"
                  priority
                />
                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-xs tracking-[0.22em] text-emerald-100 uppercase">
                  <span>Agilno, ali vrlo lično</span>
                  <Sparkles className="h-4 w-4 text-amber-200" aria-hidden />
                </div>
              </div>
            </motion.div>
            <div className="space-y-4 text-base leading-relaxed text-zinc-200 sm:text-lg">
              <p className="lg:mx-0">
                Pomažem ljudima, da ostvare svoje ciljeve, da prevaziđu stečena
                ograničenja, da naprave pokret u svojim karijerama i životima.
                Zajedno konkretizujemo plan, određujemo prioritete, uvodimo
                ritam kroz kratke iteracije, i obezbedimo da se napredak prati i
                meri. Bez panike i straha, uz obostranu podršku i poverenje.
              </p>
              <p className="lg:mx-0">
                Iskustvo od preko 15 godina u raznim granama industrije mi
                pomaže da vidim i osetim i ljude i procese. Prešao sam dug i
                veoma izazovan put od operatera na proizvodnoj liniji, preko
                vođe pozicije menadžera na kojoj sam već godinama. I sad se
                sigurno pitaš kako sam to postigao. Koji je to recept koji sam
                primenjivao?
              </p>
              <p className="lg:mx-0">Nema recepta. Nema formule.</p>
              <p className="lg:mx-0">
                Važan je pristup. Stalno učenje. Učenje u svakom smislu,
                formalno, neformalno; učenje iz sopstvenih grešaka. Ipak, u mom
                vokabularu reč &quot;greška&quot; ne postoji, nego samo signal
                da idući put kada dođem na to isto mesto uradim drugačije.
              </p>
              <p className="lg:mx-0">Jednom rečju bio sam agilan.</p>
            </div>
          </div>

          <div className="grid w-full max-w-md gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm text-zinc-100 backdrop-blur sm:max-w-none sm:grid-cols-3 sm:text-base">
            {bullets.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
