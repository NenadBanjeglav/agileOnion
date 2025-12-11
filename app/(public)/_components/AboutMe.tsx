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
            <div
              className="relative mx-auto aspect-[5/6] w-full max-w-[360px] overflow-hidden border-2 border-emerald-200/70 bg-white/5 shadow-[0_32px_90px_-50px_rgba(0,0,0,1)] ring-1 ring-white/25"
              style={{
                borderRadius: '52% 48% 50% 50% / 44% 56% 52% 48%',
                clipPath: 'ellipse(82% 95% at 50% 46%)',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.28),transparent_30%)]" />
              <NextImage
                src="/media/aboutme-removebg-preview.png"
                alt="Željko Koprić, osnivač Agile Onion"
                width={480}
                height={520}
                className="relative z-10 mx-auto h-full w-full translate-y-10 object-contain drop-shadow-[0_30px_60px_-10px_rgba(0,0,0,0.55)]"
                priority
              />
            </div>
          </div>
        </div>

        <div className="order-1 space-y-6 text-left lg:order-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.14em] text-emerald-100 uppercase">
            Osnivač Agile Onion-a
          </span>
          <div className="space-y-3">
            <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">
              Ćao, ja sam Željko Koprić
            </h2>
            <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
              Agile Onion je sigurna baza za timove koji rade u zahtevnim
              okruženjima i moraju da spoje preciznost, usklađenost i agilnost.
              Pomažem ti da sloj po sloj izgradiš jasnu strukturu, otvorenu
              komunikaciju i ritam učenja koji drži tim u pokretu.
            </p>
            <ul className="space-y-2 text-base leading-relaxed text-zinc-200 sm:text-lg">
              <li>
                <span className="font-semibold text-emerald-100">
                  Rešavamo:
                </span>{' '}
                zaglavljene procese, nejasne prioritete, preklapanje
                odgovornosti, spore povratne informacije i “audit stres”.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">Kako:</span>{' '}
                pojednostavimo tok rada, uvedemo jasne dogovore (Definition of
                Done/Ready), olakšamo transparentne board-ove, uvežbamo ritam
                sprintova i retreova, i postavimo merljive povratne petlje.
              </li>
              <li>
                <span className="font-semibold text-emerald-100">
                  Rezultat za tebe:
                </span>{' '}
                brži, predvidljiviji isporuke, manje propuštenih detalja, tim
                koji se slobodnije dogovara i mirniji auditi jer je trag dokaza
                uvek pri ruci.
              </li>
            </ul>
            <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
              Ako želiš da tim u farmi ili drugoj regulisanoj industriji radi
              agilno, precizno i sa osmehom — hajde da sloj po sloj napravimo
              sistem koji radi za ljude, a ne obrnuto.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
