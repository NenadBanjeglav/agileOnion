export const blogSections = [
  {
    slug: "mindset-lab",
    title: "Mindset Lab",
    summary:
      "Laboratorija rasta sa esencijom motivacije, discipline, podrške i emocije. Mozak je mišić koji raste kada ga hraniš zdravim mislima.",
  },
  {
    slug: "agile-club",
    title: "Agile Club",
    summary:
      "Agilnost počinje od pojedinca. Ovde otkrivaš svoje novo ja, gradiš prilagodljivost i fokus dok učiš da dišeš u ritmu agilnosti.",
  },
  {
    slug: "scrum-office",
    title: "Scrum Office",
    summary:
      "Praktično mesto za Scrum — bez suve teorije. Realne situacije, iskustva timova i deljena odgovornost za uspeh.",
  },
  {
    slug: "very-agile-personas",
    title: "Very Agile Personas (VAP)",
    summary:
      "Sanjari i pokretači koji ne odustaju. Upoznaj njihove jedinstvene agilne priče i prenesi ih na svoj put.",
  },
];

export type BlogSection = (typeof blogSections)[number];

export const blogPosts = [
  {
    slug: "cynefin-framework-na-poslu",
    title: "Kako ti Cynefin Framework može pomoći da ne poludiš na poslu?",
    excerpt:
      "Prepoznaj u kom domenu se nalazi tvoja situacija (Obvious, Complicated, Complex, Chaotic) i izaberi sledeći potez umesto da lutaš u Disorder zoni.",
    body: `Cynefin Framework pomaže da markiraš gde se nalaziš i odlučiš šta dalje. U Disorder polju ne znaš gde si — prvo prepoznaj domen: Obvious (jasna veza uzrok–posledica), Complicated (analiza potrebna), Complex (nepredvidivo, eksperimentiši), Chaotic (stabilizuj odmah). Naša početna tačka je često Chaotic, a cilj je da se krećemo ka stabilnijim domenima. Gde si ti sada i koje prakse primenjuješ?`,
    tags: ["mindset", "agile"],
  },
  {
    slug: "zasto-je-planiranje-vazno-za-scrum-tim",
    title: "Zašto je planiranje toliko važno za Scrum tim?",
    excerpt:
      "Sprint Planning nije birokratija — to je dogovor o vrednosti, fokusu i predvidljivosti. Bez plana, tim upada u haos.",
    body: `Sprint Planning daje sprint goal, transparentnost i zajednički dogovor. Tim razgovara o cilju, razjašnjava nejasnoće iz backlog-a i odlučuje kako da stigne do cilja. Plan donosi fokus, predvidljivost, jasna očekivanja i motivaciju jer svi učestvuju u definisanju puta.`,
    tags: ["scrum", "planning"],
  },
  {
    slug: "product-owner-vs-scrum-master",
    title: "Product Owner vs Scrum Master — sukob ili savez?",
    excerpt:
      "PO daje šta i zašto, SM daje kako i pod kojim uslovima. Umesto sudara, zajedno traže balans između brzine i održivosti.",
    body: `Product Owner je glas biznisa i korisnika, Scrum Master čuva proces i ritam rada. Kada PO želi brže isporuke, a SM vidi rizik za fokus i kvalitet, njihova snaga je u balansu: vrednost se isporučuje bez sagorevanja tima. Kao pilot i kopilot — jedan zna gde avion treba da sleti, drugi obezbeđuje bezbedan let.`,
    tags: ["scrum", "roles"],
  },
  {
    slug: "pet-nacina-za-growth-mindset",
    title: "5 načina kako da razviješ growth mindset",
    excerpt:
      "Budi nežan prema sebi, identifikuj gde si na skali, transformiši ograničavajuća uverenja i definiši jasne namere.",
    body: `Budi nežan prema sebi — samokritičnost koristi kao alat, ne kao oružje. Proceni gde si na skali mindseta. Osvesti ograničavajuća uverenja i pretvori ih u podsticaje. Prati svoje A/B tačke (pre i posle inicijative) da vidiš koliko si već rastao. Definiši namere: jasno reci šta želiš da pokreneš i pretvori strahove u smernice.`,
    tags: ["mindset", "growth"],
  },
];

export type BlogPost = (typeof blogPosts)[number];
