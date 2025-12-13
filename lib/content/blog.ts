export const blogSections = [
  {
    slug: 'mindset-lab',
    title: 'Mindset Lab',
    summary:
      'Zakorači u laboratoriju rasta. Koristićemo esenciju motivacije, discipline, podrške i emocije. Trebaće ti i koja doza napora — to je glavni sastojak svakog napretka. Mozak je mišić koji raste samo ako ga hraniš eliksirom zdravih misli. Budi spreman da vežbaš. Uporno. Da svaki put pomeraš granice svojih mogućnosti. Biće super zabavno i poučno. Jer rast počinje onog trenutka kad načiniš prvi korak. Obuci mantil. Počni ogled.',
  },
  {
    slug: 'agile-club',
    title: 'Agile Club',
    summary:
      'Agilnost počinje od pojedinca. Od tebe. Od mene. Od svakog od nas. Treba da znaš da to nije skup veština koje se nauče za par sati na nekom kursu. To je proces. To je razumevanje. To je prilagođavanje. To je fokus. To je prihvatanje. To je različitost. Jer upravo u tome je poenta. Za svakog od nas, kao jedinka, izgradi takav pristup prema svetu, u kojem diše. Ovo je mesto gde ćeš otkriti svoje novo ja. Svoje skrivene talente i nepregledno prostranstvo za sopstveni razvoj. Kad, posle nekog vremena, pogledaš iza sebe videćeš koliko daleko možeš stići. A kad zaviriš unutar sebe, upoznaćeš jednu novu, bolju, jaču osobu od koje više nećeš moći da se odvojiš. I zato, upadaj u Agile Club!',
  },
  {
    slug: 'scrum-office',
    title: 'Scrum Office',
    summary:
      'Ovo nije obična kancelarija. Ovo je mesto gde ćeš naučiti sve ono što želiš da znaš o Scrum-u. Nema suve teorije i nema učenja napamet. Samo realne situacije i iskustva timova kojima je agilnost u venama. Ovde nema mesta za me us, me. Potrebno je samo da sarađuješ. Da daš svoj doprinos. Odgovornost za uspeh delimo ravnomerno. Budi deo jedne velike agilne porodice. Uključi se u Scrum Office.',
  },
  {
    slug: 'very-agile-personas',
    title: 'Very Agile Personas (VAP)',
    summary:
      'Ima li šta vrednije nego upoznati ljude koji su ostvarili svoje velike snove? Možda ne sve, ali one najlepše sigurno jesu. I ne mislim na snove koje sanjamo zatvorenih očiju. Mislim na snove na javi, na one koji nacrtaju onaj nesvesni smešak na licu, a pogled zaleđe negde u beskraju. Ugostimo ljude koji se nisu zadovoljavali postojećim. Koji nisu dozvolili da im snovi tavore u tami — zamenitelji. Učeničko, dakle, od sanjara, buntovnika, istraživača, pokretača, učenika, učitelja, inspiratora, lidera. Sve njih povezuje jedno — neodustajanje. A svako od njih ima svoju jedinstvenu agilnu priču. Udobno se smesti i pretvori se u uvo. Ili oko. Kako ti je draže.',
  },
];

export type BlogSection = (typeof blogSections)[number];

export const blogPosts = [
  {
    slug: 'cynefin-framework-na-poslu',
    title: 'Kako ti Cynefin Framework može pomoći da ne poludiš na poslu?',
    excerpt:
      'Prepoznaj u kom domenu se nalazi tvoja situacija (Obvious, Complicated, Complex, Chaotic) i izaberi sledeći potez umesto da lutaš u Disorder zoni.',
    body: `Cynefin Framework pomaže da markiraš gde se nalaziš i odlučiš šta dalje. U Disorder polju ne znaš gde si – prvo prepoznaj domen: Obvious (jasna veza uzrok–posledica), Complicated (analiza potrebna), Complex (nepredvidivo, eksperimentiši), Chaotic (stabilizuj odmah). Naša početna tačka je često Chaotic, a cilj je da se krećemo ka stabilnijim domenima. Gde si ti sada i koje prakse primenjuješ?`,
    tags: ['mindset', 'agile'],
  },
  {
    slug: 'zasto-je-planiranje-vazno-za-scrum-tim',
    title: 'Zašto je planiranje toliko važno za Scrum tim?',
    excerpt:
      'Sprint Planning nije birokratija – to je dogovor o vrednosti, fokusu i predvidljivosti. Bez plana, tim upada u haos.',
    body: `Sprint Planning daje sprint goal, transparentnost i zajednički dogovor. Tim razgovara o cilju, razjašnjava nejasnoće iz backlog-a i odlučuje kako da stigne do cilja. Plan donosi fokus, predvidljivost, jasna očekivanja i motivaciju jer svi učestvuju u definisanju puta.`,
    tags: ['scrum', 'planning'],
  },
  {
    slug: 'product-owner-vs-scrum-master',
    title: 'Product Owner vs Scrum Master – sukob ili savez?',
    excerpt:
      'PO daje šta i zašto, SM daje kako i pod kojim uslovima. Umesto sudara, zajedno traže balans između brzine i održivosti.',
    body: `Product Owner je glas biznisa i korisnika, Scrum Master čuva proces i ritam rada. Kada PO želi brže isporuke, a SM vidi rizik za fokus i kvalitet, njihova snaga je u balansu: vrednost se isporučuje bez sagorevanja tima. Kao pilot i kopilot – jedan zna gde avion treba da sleti, drugi obezbeđuje bezbedan let.`,
    tags: ['scrum', 'roles'],
  },
  {
    slug: 'pet-nacina-za-growth-mindset',
    title: '5 načina kako da razviješ growth mindset',
    excerpt:
      'Budi nežan prema sebi, identifikuj gde si na skali, transformiši ograničavajuća uverenja i definiši jasne namere.',
    body: `Budi nežan prema sebi – samokritičnost koristi kao alat, ne kao oružje. Proceni gde si na skali mindseta. Osvesti ograničavajuća uverenja i pretvori ih u podsticaje. Prati svoje A/B tačke (pre i posle inicijative) da vidiš koliko si već rastao. Definiši namere: jasno reci šta želiš da pokreneš i pretvori strahove u smernice.`,
    tags: ['mindset', 'growth'],
  },
];

export type BlogPost = (typeof blogPosts)[number];
