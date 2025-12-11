import NextImage from 'next/image'
import Link from 'next/link'
import { Linkedin, Mail } from 'lucide-react'

const quickLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'O meni', href: '#founder' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative -mx-[calc((100vw-100%)/2)] mt-16 w-screen overflow-hidden px-6 pt-14 pb-12 text-white sm:px-10 lg:px-14"
      aria-labelledby="site-footer-title"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-emerald-300/0 via-emerald-300/60 to-emerald-300/0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-[28px] border border-white/10 bg-white/5 p-6 text-center shadow-[0_26px_70px_-40px_rgba(0,0,0,0.95)] backdrop-blur sm:p-10 lg:p-12">
        <NextImage
          src="/media/brand/agile-onion-logo-color.svg"
          alt="Agile Onion"
          width={196}
          height={52}
          className="h-auto w-48 sm:w-52"
          priority
        />

        <div className="space-y-3">
          <h2
            id="site-footer-title"
            className="text-2xl leading-tight font-semibold sm:text-3xl"
          >
            Gradimo timove koji rastu sloj po sloj
          </h2>
          <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
            Agile Onion je prostor za timove koji žele jasniji ritam, bolju
            saradnju i rezultate na koje su ponosni. Kroz priče, radionice i
            coaching, pomažem da napredak bude vidljiv svakog sprinta.
          </p>
        </div>

        <div className="w-full max-w-md">
          <FooterColumn title="Brzi linkovi" links={quickLinks} center />
        </div>

        <div className="flex w-full flex-col items-center gap-3 border-t border-white/10 pt-6 text-sm text-zinc-300 sm:flex-row sm:justify-between">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 text-sm sm:justify-center">
            <span className="inline-flex items-center gap-2 text-emerald-100">
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </span>
            <span className="hidden text-zinc-500 sm:inline">/</span>
            <span className="text-zinc-400">
              © {year} Agile Onion. Uvek jedan sloj napred.
            </span>
          </div>
        </div>
      </div>
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
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold text-emerald-100 transition duration-150 group-hover:border-emerald-200 group-hover:bg-emerald-400/10 group-hover:text-white">
                •
              </span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
