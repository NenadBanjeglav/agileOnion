'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { type ElementType, type ReactNode, useCallback, useState } from 'react'
import { blogSections } from '@/lib/content/blog'

type NavItem = {
  label: string
  href: string
  flyout?: ElementType
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Blog', href: '/blog', flyout: BlogFlyout },
  { label: 'Taste an Onion', href: '#newsletter' },
  { label: 'O meni', href: '#founder' },
  { label: 'Kontakt', href: '#footer' },
]

export function FloatingNav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  const handleNavClick = useCallback(
    (href: string, onDone?: () => void) =>
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (href.startsWith('#')) {
          event.preventDefault()
          const target = document.querySelector(href)
          if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
        onDone?.()
      },
    [],
  )

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 250)
  })

  return (
    <nav
      className={`fixed top-0 z-60 w-full overflow-x-hidden px-5 text-white transition-all duration-300 ease-out sm:px-8 lg:overflow-visible lg:px-12 ${
        scrolled ? 'bg-neutral-950 py-3 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <BrandLogo />
        <div className="hidden items-center gap-6 lg:flex">
          <Links onNavClick={handleNavClick} />
        </div>
        <MobileMenu onNavClick={handleNavClick} />
      </div>
    </nav>
  )
}

function BrandLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="Go to home page"
    >
      <Image
        src="/media/brand/agile-onion-logo-color.svg"
        alt="Agile Onion logo"
        width={260}
        height={78}
        className="h-10 w-auto max-w-[70vw] sm:h-12 lg:h-16"
        fetchPriority="high"
      />
    </Link>
  )
}

function Links({
  onNavClick,
}: {
  onNavClick: (
    href: string,
    onDone?: () => void,
  ) => (event: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <div className="flex items-center gap-6">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          FlyoutContent={item.flyout}
          onClick={onNavClick(item.href)}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}

function NavLink({
  children,
  href,
  FlyoutContent,
  onClick,
}: {
  children: ReactNode
  href: string
  FlyoutContent?: ElementType
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const [open, setOpen] = useState(false)
  const showFlyout = FlyoutContent && open
  const showUnderline = open

  return (
    <div
      className="group relative h-fit w-fit"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        onClick={onClick}
        className="relative text-sm font-semibold text-white/80 transition-colors duration-200 ease-out group-hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-emerald-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none sm:text-base"
      >
        <motion.span
          whileHover={{ y: -2 }}
          whileTap={{ y: -1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="inline-flex items-center gap-1"
        >
          {children}
        </motion.span>
        <span
          style={{ transform: showUnderline ? 'scaleX(1)' : 'scaleX(0)' }}
          className="absolute -right-2 -bottom-2 -left-2 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#01DCA0] via-[#00B3D5] to-emerald-200 transition-transform duration-300 ease-out group-hover:scale-x-100 sm:h-1"
        />
      </Link>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: '-50%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-12 left-1/2 z-50"
          >
            <div className="absolute -top-6 right-0 left-0 h-6 bg-transparent" />
            <div className="absolute top-0 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-neutral-900" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BlogFlyout() {
  return (
    <div className="grid w-[520px] grid-cols-2 gap-3 rounded-2xl border border-emerald-900/40 bg-neutral-900 p-5 text-white shadow-xl">
      {blogSections.map((section) => (
        <Link
          key={section.slug}
          href={`/blog/category/${section.slug}`}
          className="group hover:bg-neutral-750 rounded-lg border border-emerald-200/10 bg-neutral-800 p-3 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-emerald-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:outline-none"
        >
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="space-y-1"
          >
            <h3 className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-emerald-100">
              {section.title}
            </h3>
            <p
              className="text-xs text-white/70 transition-colors duration-200 group-hover:text-white/80"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {section.summary}
            </p>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

function MobileMenu({
  onNavClick,
}: {
  onNavClick: (
    href: string,
    onDone?: () => void,
  ) => (event: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const [open, setOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)

  return (
    <div className="block lg:hidden">
      <button onClick={() => setOpen(true)} className="text-2xl text-white">
        <Menu aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-0 left-0 z-60 flex h-screen w-full flex-col bg-neutral-950 text-white"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <BrandLogo />
              <button onClick={() => setOpen(false)}>
                <X className="text-2xl text-white sm:text-3xl" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-neutral-900 p-6">
              {NAV_ITEMS.map((item) =>
                item.flyout ? (
                  <div
                    key={item.href}
                    className="border-b border-white/10 py-5"
                  >
                    <button
                      onClick={() => setBlogOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between text-left text-2xl font-semibold text-white/90 sm:text-3xl"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-6 w-6 text-white/80 transition-transform duration-200 sm:h-7 sm:w-7 ${
                          blogOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        aria-hidden
                      />
                    </button>
                    {blogOpen && (
                      <div className="mt-4 space-y-3 pl-1 text-sm text-white/60">
                        {blogSections.map((section) => (
                          <Link
                            key={section.slug}
                            href={`/blog/category/${section.slug}`}
                            onClick={onNavClick(
                              `/blog/category/${section.slug}`,
                              () => setOpen(false),
                            )}
                            className="block text-base font-medium text-white/90 transition-colors hover:text-emerald-200 sm:text-lg"
                          >
                            {section.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavClick(item.href, () => setOpen(false))}
                    className="flex w-full items-center justify-between border-b border-white/10 py-5 text-2xl font-semibold text-white/90 transition-colors hover:text-emerald-200 sm:text-3xl"
                  >
                    <span>{item.label}</span>
                  </Link>
                ),
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
