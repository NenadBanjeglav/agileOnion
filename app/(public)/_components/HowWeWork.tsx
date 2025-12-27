'use client'

import { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const STEPS = [
  {
    title: 'Agilna praksa',
    description: 'Uvodimo jasan ritam u tvoj svakodnevni rad.',
  },
  {
    title: 'Mindset tehnike',
    description: 'Treniramo brze, pametne odluke.',
  },
  {
    title: 'Scrum okvir',
    description: 'Koristimo sistem za tvoj lični i profesionalni razvoj.',
  },
  {
    title: 'Merenje napretka',
    description: 'Identifikujemo kritične tačke i slavimo svaki sprint napred.',
  },
  {
    title: 'Spreman si za sledeći korak?',
    description:
      'Pridruži se newsletteru i dobijaj planove i alate iz prve ruke.',
    cta: { label: 'Prijavi se', href: '#newsletter' },
  },
]

export function HowWeWork() {
  const [stepsComplete, setStepsComplete] = useState(1)
  const numSteps = STEPS.length
  const activeStep = STEPS[stepsComplete - 1]
  const isCtaStep = Boolean(activeStep?.cta)

  const handleSetStep = (delta: -1 | 1) => {
    if (
      (stepsComplete === 1 && delta === -1) ||
      (stepsComplete === numSteps && delta === 1)
    ) {
      return
    }

    setStepsComplete((prev) => prev + delta)
  }

  return (
    <section
      className="relative -mx-[calc((100vw-100%)/2)] w-screen px-4 py-16 text-white sm:px-8 md:py-20"
      aria-labelledby="how-we-work-title"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00B3D5]/35 bg-[#00B3D5]/10 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-[#e6f9ff] uppercase">
            Kako radimo?
          </span>
          <h2
            id="how-we-work-title"
            className="text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl"
          >
            Svaki sloj je praktičan i merljiv, sa jasnim koracima koje možeš da
            uvedeš odmah.
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#01DCA0]/18 via-[#00B3D5]/16 to-[#8c00d5]/12 p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] sm:p-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'url(/media/hero/team-meeting.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-white/20"
            aria-hidden
          />
          <div className="relative">
            <Steps numSteps={numSteps} stepsComplete={stepsComplete} />

            <div className="my-6 min-h-[220px] rounded-2xl border border-white/10 bg-black/20 p-6 text-center sm:min-h-60 sm:p-8">
              <p className="text-sm font-semibold tracking-[0.3em] text-[#00B3D5] uppercase">
                Fokus korak
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {activeStep.title}
              </h3>
              <p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
                {activeStep.description}
              </p>
              {activeStep.cta ? (
                <div className="mt-6 flex justify-center">
                  <a
                    href={activeStep.cta.href}
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border-0 bg-linear-to-r from-[#01DCA0] via-[#00B3D5] to-[#3201dc] px-6 py-2 text-sm font-semibold text-black shadow-[0_12px_30px_-18px_rgba(1,220,160,0.85)] transition-transform duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_18px_40px_-18px_rgba(0,179,213,0.7)] active:scale-[0.99] sm:w-auto sm:min-w-md"
                  >
                    <span
                      className="absolute inset-0 translate-x-[-120%] bg-white/35 blur-sm transition-transform duration-500 ease-out group-hover:translate-x-[120%]"
                      aria-hidden
                    />
                    {activeStep.cta.label}
                  </a>
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-zinc-200">
                Korak {stepsComplete} od {numSteps}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-[#01DCA0]/60 hover:bg-[#01DCA0]/10"
                  onClick={() => handleSetStep(-1)}
                  type="button"
                >
                  Nazad
                </button>
                {!isCtaStep ? (
                  <button
                    className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#01DCA0]/10 hover:text-white"
                    onClick={() => handleSetStep(1)}
                    type="button"
                  >
                    Napred
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Steps({
  numSteps,
  stepsComplete,
}: {
  numSteps: number
  stepsComplete: number
}) {
  const stepArray = Array.from(Array(numSteps).keys())

  return (
    <div className="flex w-full flex-wrap items-center gap-3 sm:flex-nowrap">
      {stepArray.map((num) => {
        const stepNum = num + 1
        const isCompleted = stepNum < stepsComplete
        const isCurrent = stepNum === stepsComplete

        return (
          <Fragment key={stepNum}>
            <Step
              num={stepNum}
              isCompleted={isCompleted}
              isCurrent={isCurrent}
            />
            {stepNum !== stepArray.length && (
              <div className="relative h-1 flex-1 rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#01DCA0]/90"
                  animate={{ width: isCompleted ? '100%' : '0%' }}
                  transition={{ ease: 'easeIn', duration: 0.3 }}
                />
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

function Step({
  num,
  isCompleted,
  isCurrent,
}: {
  num: number
  isCompleted: boolean
  isCurrent: boolean
}) {
  const isActive = isCompleted || isCurrent

  return (
    <div className="relative">
      <div
        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
          isCurrent
            ? 'scale-110 border-[#00B3D5] bg-[#00B3D5] text-black shadow-[0_0_0_6px_rgba(0,179,213,0.25)]'
            : ''
        } ${
          isCompleted
            ? 'border-[#01DCA0]/70 bg-[#01DCA0]/40 text-white'
            : isCurrent
              ? ''
              : 'border-white/25 text-white/35'
        }`}
      >
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.svg
              key="icon-marker-check"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1.4em"
              width="1.4em"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </motion.svg>
          ) : (
            <motion.span
              key="icon-marker-num"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {num}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isCurrent && (
        <div className="absolute -inset-2 z-0 animate-pulse rounded-full bg-[#00B3D5]/20" />
      )}
    </div>
  )
}
