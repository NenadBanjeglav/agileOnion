'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Taste an Onion', href: '#newsletter' },
  { label: 'O meni', href: '#founder' },
  { label: 'Kontakt', href: '#footer' },
]

export function FloatingNav() {
  const { scrollY } = useScroll()
  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)

  const handleNavClick = useCallback((href: string) => {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        event.preventDefault()
        const target = document.querySelector(href)
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }, [])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = lastY.current
    const diff = latest - prev

    if (latest < 10) {
      setHidden(false)
    } else if (diff > 0) {
      setHidden(true)
    } else if (diff < 0) {
      setHidden(false)
    }

    lastY.current = latest
  })

  useEffect(() => {
    if (!hidden || !navRef.current) return
    const active = document.activeElement
    if (active instanceof HTMLElement && navRef.current.contains(active)) {
      active.blur()
    }
  }, [hidden])

  return (
    <motion.nav
      ref={navRef}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ pointerEvents: hidden ? 'none' : undefined }}
      className="fixed top-3 left-1/2 z-60 flex w-auto max-w-[88vw] -translate-x-1/2 flex-wrap items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-zinc-100 shadow-md backdrop-blur sm:max-w-[720px] sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-2.5 sm:text-sm md:gap-4 md:px-6 md:py-3 md:text-sm lg:top-4 lg:gap-5 lg:px-7 lg:py-3.5 lg:text-base"
    >
      <div
        className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto sm:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        <NavLogo isHidden={hidden} />
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={handleNavClick(item.href)}
            isHidden={hidden}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <NavLogo isHidden={hidden} />
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={handleNavClick(item.href)}
            isHidden={hidden}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  )
}

function NavLogo({ isHidden }: { isHidden?: boolean }) {
  return (
    <Link
      href="/"
      tabIndex={isHidden ? -1 : undefined}
      className="group flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-inner shadow-emerald-500/10 transition hover:border-emerald-200/60 hover:bg-emerald-400/10"
      aria-label="Go to home page"
    >
      <Image
        src="/media/backgrounds/paralax-logo.png"
        alt="Agile Onion"
        width={28}
        height={28}
        className="h-7 w-7 rounded-full"
        priority
      />
    </Link>
  )
}

function NavLink({
  children,
  href,
  onClick,
  isHidden,
}: {
  children: string
  href: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  isHidden?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      tabIndex={isHidden ? -1 : undefined}
      className="block shrink-0 overflow-hidden px-1 lg:px-1.5"
    >
      <motion.div
        whileHover={{ y: -18 }}
        whileTap={{ y: -18 }}
        transition={{ ease: 'backInOut', duration: 0.5 }}
        className="h-[18px] leading-none lg:h-5"
      >
        <span className="flex h-[18px] items-center whitespace-nowrap text-zinc-300">
          {children}
        </span>
        <span className="flex h-[18px] items-center whitespace-nowrap text-emerald-200">
          {children}
        </span>
      </motion.div>
    </Link>
  )
}
