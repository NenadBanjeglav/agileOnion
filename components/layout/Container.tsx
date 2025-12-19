import { type WithChildren } from '@/lib/types'

type ContainerProps = WithChildren<{
  className?: string
}>

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-24 sm:px-10 ${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </div>
  )
}
