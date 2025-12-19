type SectionHeaderProps = {
  title: string
  subtitle: string
}

export function SectionHeader({title, subtitle}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      <p className="max-w-3xl text-base text-zinc-200 sm:text-lg">{subtitle}</p>
    </div>
  )
}
