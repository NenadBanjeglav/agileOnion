import { type WithChildren } from '@/lib/types'
import { FloatingNav } from './FloatingNav'

type AppShellProps = WithChildren<{
  padded?: boolean
}>

export function AppShell({ children, padded = true }: AppShellProps) {
  const navSpacing = padded
    ? 'mb-8 w-full pt-12 sm:pt-14'
    : 'mb-8 w-full pt-10 sm:pt-12 lg:pt-10'
  const widthClass = padded ? 'mx-auto w-full max-w-6xl' : 'w-screen'

  return (
    <div className="flex min-h-screen w-screen justify-center overflow-x-hidden bg-linear-to-br from-[#050b0a] via-[#0a1714] to-[#0a1020] font-sans">
      <main
        className={`flex min-h-screen ${widthClass} flex-col items-stretch justify-between bg-transparent sm:items-start ${
          padded
            ? 'px-6 py-16 sm:px-12 sm:py-20 md:px-16 md:py-24 lg:px-20'
            : ''
        }`}
      >
        <div className={navSpacing}>
          <FloatingNav />
        </div>
        <div className="w-full flex-1">{children}</div>
      </main>
    </div>
  )
}
