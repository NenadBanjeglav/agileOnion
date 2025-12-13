'use client'

import NextImage from 'next/image'

export function AboutMe() {
  return (
    <section
      id="founder"
      className="relative -mx-[calc((100vw-100%)/2)] w-screen px-6 py-16 text-white sm:px-10 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-x-0 top-8 mx-auto h-64 w-11/12 rounded-4xl bg-emerald-500/25 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.07),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_55%_65%,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.95)] backdrop-blur sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
        <div className="relative order-2 flex justify-center lg:order-1 lg:justify-start">
          <div className="relative h-full max-h-[520px] w-full max-w-[420px]">
            <div className="absolute top-6 -left-10 h-44 w-44 rotate-6 rounded-[42%_58%_48%_52%] bg-emerald-400/18 blur-3xl" />
            <div className="absolute -right-10 bottom-4 h-36 w-36 -rotate-6 rounded-[52%_48%_56%_44%] bg-sky-400/18 blur-3xl" />
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-3xl border border-emerald-200/40 bg-white/5 shadow-[0_32px_90px_-50px_rgba(0,0,0,1)] ring-1 ring-white/15">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.22),transparent_30%)]" />
              <NextImage
                src="/media/aboutme-removebg-preview.png"
                alt="Željko Koprić, osnivač Agile Onion"
                width={480}
                height={520}
                className="relative z-10 mx-auto h-full w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="order-1 space-y-6 text-left lg:order-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-emerald-100 uppercase">
            A ko sam ja?
          </span>
          <div className="space-y-3">
            <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
              Zovem se Željko Koprić. Ja sam Scrum Master, agilni entuzijasta, bloger.
            </h2>
            <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
              Moj profesionalni teren bila je, i još uvek je, farmaceutska industrija. Prešao sam dug i veoma izazovan put od operatera na proizvodnoj liniji, davno, pa sve do pozicije menadžera na kojoj sam već godinama.
            </p>
            <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
              I sad se verovatno pitaš kako sam to postigao. Koji je to recept koji sam primenjivao? Nema recepta. Nema formule. Važan je pristup. Stalno učenje. Učenje u svakom smislu, formalno, neformalno; učenje iz sopstvenih grešaka.
            </p>
            <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
              „Agilnost počinje sa skromnošću — onog trenutka kada priznaš da i dalje imaš šta da naučiš.“ — Mike Cohn
            </p>
            <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
              Nikada se nisam zadovoljavao postojećim i uvek sam tražio nove perspektive. Tako sam došao u kontakt sa agilnom filozofijom i shvatio da mi je agilni kod oduvek bio u genima. Često sam primenjivao principe agilnosti, a da toga nisam ni bio svestan.
            </p>
            <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
              Sada kada imam to saznanje, želim da ga podelim sa tobom. Spreman sam da te saslušam, radujem se tvojoj priči.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-100">
              Rešavamo ono što te stvarno koči:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-200 sm:text-lg">
              <li>sagorevaš i gubiš energiju;</li>
              <li>znaš da možeš više, ali ne vidiš način;</li>
              <li>nemaš jasnu mapu svoje budućnosti;</li>
              <li>plaši te promena, pa ostaješ u mestu;</li>
              <li>započneš motivisano, a onda naglo odustaneš.</li>
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-100">
              Učim te kako da postaneš osoba kakva znaš da možeš biti:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-200 sm:text-lg">
              <li>lider koji se ne lomi, nego vodi;</li>
              <li>osoba sa navikama koje te pokreću čak i kad ti se ne radi;</li>
              <li>neko ko motivaciju i disciplinu pretvara u svoj najjači alat.</li>
            </ul>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-100">
              Kako to radimo?
            </p>
            <p className="text-sm text-emerald-50 sm:text-base">
              “Budi uporan u viziji, ali fleksibilan u detaljima.” — Jeff Bezos
            </p>
            <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed text-zinc-200 sm:text-lg">
              <li>uvodimo agilnu praksu koja donosi jasnoću i ritam;</li>
              <li>treniramo moćne mindset tehnike koje menjaju način na koji razmišljaš i donosiš odluke;</li>
              <li>koristimo Scrum okvir kao sistem za tvoj lični i profesionalni razvoj;</li>
              <li>pratimo i merimo tvoj napredak bez pogađanja i iluzija;</li>
              <li>identifikujemo kritične tačke koje ti crpe energiju;</li>
              <li>gradimo sistem rasta po tvojoj meri;</li>
              <li>slavimo svaki korak napred koji napraviš.</li>
            </ul>
          </div>

          <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
            Ako imaš ideju, viziju sebe i mesta gde želiš da stigneš — to je sasvim dovoljno. Spreman sam da te saslušam, radujem se tvojoj priči.
          </p>
        </div>
      </div>
    </section>
  )
}
