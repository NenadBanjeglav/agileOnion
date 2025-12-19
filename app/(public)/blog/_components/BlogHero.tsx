export function BlogHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] sm:px-10 sm:py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      >
        <div className="absolute top-10 -left-24 h-64 w-64 rounded-full bg-emerald-400/25 blur-[120px]" />
        <div className="absolute -right-24 bottom-6 h-64 w-64 rounded-full bg-cyan-400/15 blur-[120px]" />
      </div>

      <div className="relative z-10 space-y-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-emerald-100 uppercase">
          Agile Onion Blog
        </span>
        <h1 className="text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl">
          Priče o agilnosti, ličnom rastu i liderstvu.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-zinc-200 sm:text-lg">
          Magazin za ljude koji žele jasne uvide, praktične korake i iskrene
          priče iz stvarnog rada sa timovima i sobom.
        </p>
      </div>
    </section>
  )
}
