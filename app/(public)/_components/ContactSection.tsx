'use client'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative -mx-[calc((100vw-100%)/2)] w-screen px-6 py-16 text-white sm:px-10 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-x-0 top-8 mx-auto h-48 w-11/12 rounded-[32px] bg-sky-400/20 blur-[110px]" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-6 text-left shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)] backdrop-blur sm:p-10 md:p-12">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-emerald-100 uppercase">
          Kontakt
        </span>
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Hajde da vidimo šta tvoj tim treba sledeće
          </h2>
          <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
            Javi se za kratku konsultaciju: mapiramo prepreke, biramo prvi
            eksperiment i dogovaramo naredne sprintove. Bez buke, samo konkretan
            plan rasta.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid w-full gap-3 sm:grid-cols-[1.2fr_0.8fr] sm:items-center"
        >
          <label className="sr-only" htmlFor="contact-email">
            Email adresa za kontakt
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="tvoj.email@kompanija.com"
            className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/50 focus:outline-none"
          />
          <button
            type="submit"
            className="group inline-flex items-center justify-center rounded-full border-0 bg-linear-to-r from-emerald-400 via-emerald-500 to-sky-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_-18px_rgba(16,185,129,0.9)] transition-transform duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_18px_40px_-18px_rgba(56,189,248,0.8)] active:scale-[0.99]"
          >
            Dogovori kratki poziv
          </button>
        </form>

        <p className="text-sm text-emerald-100/80">
          Preferiraš direktan ping? Pošalji detalje o timu i cilju, javljam se u
          roku od jednog radnog dana.
        </p>
      </div>
    </section>
  )
}
