'use client'

import NextImage from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Linkedin } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Container } from './Container'

const quickLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Taste an Onion', href: '#newsletter' },
  { label: 'O meni', href: '#founder' },
  { label: 'Kontakt', href: '#footer' },
]

export function Footer() {
  const [year, setYear] = useState<number | null>(null)
  const pathname = usePathname()
  const showAboutLink = pathname === '/'
  const visibleQuickLinks = quickLinks.filter((link) =>
    link.href === '#founder' ? showAboutLink : true,
  )

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer
      id="footer"
      className="relative mx-auto w-screen max-w-7xl overflow-hidden px-6 pt-14 pb-12 text-white sm:px-10"
      aria-labelledby="site-footer-title"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-[#01DCA0]/0 via-[#00B3D5]/70 to-[#3201dc]/0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(1,220,160,0.2),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(0,179,213,0.18),transparent_28%),radial-gradient(circle_at_50%_60%,rgba(140,0,213,0.12),transparent_45%)]" />
      </div>

      <Container className="flex flex-col items-center gap-10 rounded-[28px] border border-white/10 bg-white/10 p-6 text-center shadow-[0_26px_70px_-40px_rgba(0,0,0,0.95)] backdrop-blur sm:p-10 lg:p-12">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            aria-label="Agile Onion home"
            className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-inner shadow-black/20 transition hover:border-[#00B3D5]/70 focus-visible:ring-2 focus-visible:ring-[#00B3D5]/70 focus-visible:outline-hidden"
          >
            <div className="relative h-full w-full">
              <NextImage
                src="/media/backgrounds/paralax-logo.png"
                alt="Agile Onion"
                fill
                sizes="96px"
                className="rounded-full object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="space-y-3">
          <h2
            id="site-footer-title"
            className="text-2xl leading-tight font-semibold sm:text-3xl"
          >
            Ostanimo u kontaktu
          </h2>
          <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
            Ako odlučiš da podeliš sa mnom svoje iskustvo, imaš neko pitanje ili
            predlog, piši mi. Želim da čujem tvoju priču. Spreman sam da te
            saslušam, radujem se tome.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Kontakt linkovi</h3>
          <div className="flex flex-col items-center gap-3 text-sm text-[#d9fbff] sm:flex-row sm:justify-center">
            <Link
              href="https://www.linkedin.com/in/%C5%BEeljko-kopri%C4%87-0869241a8/"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </Link>
            <a
              href="mailto:agileonion.blog@gmail.com"
              className="font-semibold underline underline-offset-4 transition hover:text-white"
            >
              agileonion.blog@gmail.com
            </a>
          </div>
          <p className="text-sm text-[#d9fbff]/80">
            Preferiraš direktan ping? Piši mi na email. Ako želiš da budeš u
            toku sa onim što se dešava u mojoj agilnoj kuhinji i da ne propustiš
            tekstove, prijavi se na Taste an Onion newsletter.
          </p>
        </div>

        <div className="w-full max-w-md">
          <FooterColumn title="Brzi linkovi" links={visibleQuickLinks} center />
        </div>

        <div className="flex w-full flex-col items-center gap-3 border-t border-white/10 pt-6 text-sm text-zinc-300 sm:flex-row sm:justify-between">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 text-sm sm:justify-center">
            <span className="hidden text-zinc-500 sm:inline">/</span>
            <span className="text-zinc-400">
              Ac {year ? `${year} ` : ''}Agile Onion. Sweet taste of your growth.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
  center = false,
}: {
  title: string
  links: { label: string; href: string }[]
  center?: boolean
}) {
  return (
    <div className={`space-y-4 ${center ? 'text-center' : ''}`}>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul
        className={
          center
            ? 'flex flex-col items-center gap-3 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4'
            : 'space-y-2 text-sm'
        }
      >
        {links.map((link) => (
          <li
            key={`${link.href}-${link.label}`}
            className={center ? '' : undefined}
          >
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-zinc-200 transition hover:text-white"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-[#d9fbff] transition duration-150 group-hover:border-[#01DCA0]/70 group-hover:bg-[#01DCA0]/10 group-hover:text-white">
                &gt;
              </span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
