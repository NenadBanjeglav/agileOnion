import { Logo } from '@/components/ui/Logo'

export default function Loading() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-neutral-950">
        <Logo
          variant="color"
          width={240}
          className="animate-pulse"
          aria-label="Loading"
        />
      </div>
    </div>
  )
}
