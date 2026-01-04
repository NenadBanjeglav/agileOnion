import NextImage from 'next/image'

const PROBLEMS = [
  'Sagorevaš i gubiš energiju',
  'Osećaš jaz između obrazovanja i realnih veština',
  'Nemaš jasan mapu svoje budućnosti',
  'Plašiš se promena, pa ostaješ u mestu',
  'Započneš motivisano, a onda naglo odustaneš',
]

const OUTCOME = [
  'Lider koji se ne lomi, nego vodi',
  'Profesionalac sa navikama koje te pokreću čak i kad ti se ne radi',
  'Ličnost koja motivaciju i disciplinu pretvara u svoj najjači alat',
]

const YOU_GET = [
  'Redovne, odmah primenljive lekcije o Scrum okviru i agilnoj filozofiji',
  'Super-moćne tehnike za razvoj mindseta i praktične vežbe',
  'Inspirativne priče ljudi koji su prešli put od ideje do manifestacije',
  'Moju bezrezervnu podršku',
]

export function MissionSection() {
  return (
    <section
      className="relative isolate -mx-[calc((100vw-100%)/2)] w-screen overflow-hidden"
      aria-labelledby="mission-title"
    >
      <div className="relative min-h-screen w-full">
        <div className="absolute inset-y-0 right-0 left-0 sm:right-8 sm:left-8 lg:right-0 lg:left-0">
          <NextImage
            src="/media/backgrounds/network-overlay.jpg"
            alt="Abstract editorial background"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-xl space-y-6 text-left text-white">
            <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.4em] text-[#00B3D5] uppercase">
              O BLOGU
              <span className="h-px w-12 bg-[#01DCA0]/70" aria-hidden />
            </span>
            <h2
              id="mission-title"
              className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-[1.05]"
            >
              Mesto za ljude koji hoće jasno, mirno i stvarno kretanje.
            </h2>
            <div className="space-y-6 text-sm text-zinc-200 sm:text-base">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#00B3D5] uppercase">
                  Rešavamo ono što te stvarno koči:
                </p>
                <ul className="space-y-3">
                  {PROBLEMS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#01DCA0]"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#00B3D5] uppercase">
                  Učim te kako da postaneš osoba kakva znaš da možeš biti:
                </p>
                <ul className="space-y-3">
                  {OUTCOME.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#01DCA0]"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.22em] text-[#00B3D5] uppercase">
                  Na ovom blogu ćeš pronaći:
                </p>
                <ul className="space-y-3">
                  {YOU_GET.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#01DCA0]"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
