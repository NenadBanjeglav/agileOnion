'use client'

import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useCallback, useRef, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Blog', href: '/blog' },
  { label: 'O meni', href: '#founder' },
  { label: 'Taste an Onion', href: '#newsletter' },
  { label: 'Kontakt', href: '#footer' },
]

export function FloatingNav() {
  const { scrollY } = useScroll()
  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)

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

  return (
    <motion.nav
      aria-hidden={hidden}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ pointerEvents: hidden ? 'none' : undefined }}
      className="fixed top-3 right-3 left-3 z-60 flex max-w-full translate-x-0 flex-wrap items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs text-zinc-100 shadow-md backdrop-blur sm:right-auto sm:left-1/2 sm:w-auto sm:max-w-[720px] sm:-translate-x-1/2 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-2.5 sm:text-sm md:gap-4 md:px-6 md:py-3 md:text-sm lg:top-4 lg:gap-5 lg:px-7 lg:py-3.5 lg:text-base"
    >
      <div
        className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto sm:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
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
        className="h-[18px] leading-none lg:h-[20px]"
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
