export const homeContent = {
  hero: {
    title: 'Nema više sutra. Počinješ sada.',
    subtitle:
      'Čist fokus, agilna praksa i snažan mindset da rešiš ono što te koči.',
    bulletLead: 'Resavamo ono sto te koci:',
    bullets: [
      'izgorevas i gubis energiju, pa ne vidis put napred;',
      'nema jasne mape buducnosti i plasi te promena;',
      'pocnes motivisano, pa stanes i odustanes.',
    ],
    primaryCta: {
      label: 'Javi mi se',
      href: '#contact',
    },
    secondaryCta: {
      label: 'Prijavi se na Taste an Onion',
      href: '#newsletter',
    },
    image: {
      src: '/media/hero/team-meeting.jpg',
      alt: 'Tim deli ideje oko tabli',
    },
  },
}

export type HomeContent = typeof homeContent
