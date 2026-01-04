import type { CategoryCard } from './types'

export const CATEGORY_LABELS: Record<string, string> = {
  'mindset-lab': 'Mindset Lab',
  'agile-club': 'Agile Club',
  'scrum-office': 'Scrum Office',
  'very-agile-personas': 'Very Agile Personas',
}

export const CATEGORY_CARDS: CategoryCard[] = [
  {
    slug: 'mindset-lab',
    title: 'Mindset Lab',
    description:
      'Zakorači u laboratoriju rasta. Koristićemo esenciju motivacije, discipline, podrške i emocije. Trebaće ti i koja doza napora jer to je glavni sastojak svakog napretka. Mozak je mišić koji raste samo ako ga hraniš eliksirom zdravih misli. Budi spreman da vežbaš. Uporno. Da svaki put pomeraš granice svojih mogućnosti. Biće super zabavno i poučno. Jer rast počinje onog trenutka kad načiniš prvi korak.',
    pitch: 'Obuci mantil. Počinju ogledi.',
    image: '/media/backgrounds/mindsetlab.webp',
  },
  {
    slug: 'agile-club',
    title: 'Agile Club',
    description:
      'Agilnost počinje od pojedinca. Od tebe. Od mene. Od svakog od nas. Treba da znaš da to nije skup veština koje se nauče za par sati na nekom kursu. To je proces. To je razumevanje. To je prilagođavanje. To je fokus. To je prihvatanje. To je različitost. Jer upravo u tome je poenta. Da svako od nas, kao jedinka, izgradi takav pristup prema svetu u kom živi. Ovo je mesto gde ćeš otkriti svoje novo ja. Svoje skrivene talente i nepregledno prostranstvo za sopstveni razvoj. Kad posle nekog vremena pogledaš iza sebe, videćeš koliko daleko možeš stići. A kad zaviriš unutar sebe, upoznaćeš jednu novu, bolju, jaču osobu od koje više nećeš moći da se odvojiš.',
    pitch: 'I zato, upadaj u Agile Club!',
    image: '/media/backgrounds/agileclub.webp',
  },
  {
    slug: 'scrum-office',
    title: 'Scrum Office',
    description:
      'Ovo nije obična kancelarija. Ovo je mesto gde ćeš naučiti sve ono što želiš da znaš o Scrumu. Nema suve teorije i nema učenja napamet. Samo realne situacije i iskustva lidera i timova kojima je agilnost u venama. Ovde mesta ima za sve. Potrebno je samo da sarađuješ. Da daš svoj doprinos. Odgovornost za uspeh delimo ravnomerno. Budi deo jedne velike agilne porodice.',
    pitch: 'Uključi se u Scrum Office.',
    image: '/media/backgrounds/scrumoffice.webp',
  },
  {
    slug: 'very-agile-personas',
    title: 'Very Agile Personas',
    description:
      'Ima li šta vrednije nego upoznati ljude koji su ostvarili svoje velike snove? Možda ne sve, ali one najlepše sigurno jesu. I ne mislim na snove koje sanjamo zatvorenih očiju. Mislim na snove na javi, na one koji nacrtaju onaj nesvesni smešak na licu, a pogled zalepe negde u beskraju. Ugostićemo ljude koji se nisu zadovoljavali postojećim. Koji nisu dozvolili da im snovi tavore u tami – zanemareni. Učićemo, dakle, od sanjara, buntovnika, istraživača, pokretača, učenika, učitelja, inspiratora, lidera. Sve njih povezuje jedno – neodustajanje. A svako od njih ima svoju jedinstvenu agilnu priču.',
    pitch: 'Udobno se smesti i pretvori se u uvo. Ili oko. Kako ti je draže.',
    image: '/media/backgrounds/vap.webp',
  },
]

export const CATEGORY_LOOKUP = new Map(
  CATEGORY_CARDS.map((category) => [category.slug, category]),
)
