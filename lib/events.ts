// Herní obsah — všechny texty na jednom místě, ať se snadno upravují / překládají.

export type Choice = {
  label: string
  // změna hodnoty firmy v % — náhodně (seedovaně) z intervalu [valMin, valMax]
  valMin: number
  valMax: number
  // změna nálady týmu (body na škále 0–100)
  hap: number
  // text výsledku, {val} se nahradí skutečnou změnou
  result: string
  // volba nastaví vlajku — za 2–3 měsíce se vrátí navazující událost (FOLLOWUPS)
  flag?: string
}

export type GameEvent = {
  id: string
  icon: string // klíč do SPRITES
  text: string
  choices: Choice[]
  followup?: boolean // důsledek dřívějšího rozhodnutí (zobrazí se s výstrahou)
  // sezónnost: povolené měsíce (0 = leden … 11 = prosinec); bez omezení = kdykoliv
  months?: number[]
}

export const EVENTS: GameEvent[] = [
  {
    id: 'flu',
    months: [0, 1, 2, 9, 10, 11],
    icon: 'virus',
    text: 'Chřipková sezóna! Celé Česko smrká a Maxi Vita Vitamin C mizí z regálů.',
    choices: [
      { label: 'Přesčasy! Vyrábíme nonstop', valMin: 18, valMax: 35, hap: -12, flag: 'crunch', result: 'Linky jely 24/7. Prodeje trhaly rekordy, tým sotva stojí na nohou. {val}' },
      { label: 'Zdražíme o 20 %', valMin: 8, valMax: 18, hap: -2, result: 'Marže krásná, lékárníci prskali, ale zaplatili. {val}' },
    ],
  },
  {
    id: 'tiktok',
    icon: 'phone',
    text: 'Influencerka si dala Energit do ranní rutiny na TikToku. Video má 2 miliony zhlédnutí.',
    choices: [
      { label: 'Podepsat roční spolupráci', valMin: 15, valMax: 30, hap: 5, result: 'Mladí skupují regály. Marketing slaví. {val}' },
      { label: 'Neplatit, vlna dojede sama', valMin: 3, valMax: 14, hap: 0, result: 'Vlna dojela… tak napůl. {val}' },
    ],
  },
  {
    id: 'chain',
    icon: 'box',
    text: 'Velký drogistický řetězec chce slevu 30 % výměnou za regál u pokladen.',
    choices: [
      { label: 'Kývnout — objem je objem', valMin: 10, valMax: 20, hap: -5, result: 'Objemy vyletěly, marže brečí. Obchodníci taky. {val}' },
      { label: 'Odmítnout a držet cenu', valMin: -5, valMax: 10, hap: 6, result: 'Držíme cenu, držíme hrdost. Řetězec se ještě ozve. {val}' },
    ],
  },
  {
    id: 'gummies',
    icon: 'star',
    text: 'Vývoj přinesl prototyp: Maxi Vita Beauty mořský kolagen v gumídcích. Trh po kolagenu šílí.',
    choices: [
      { label: 'Spustit hned, doladíme za pochodu', valMin: 12, valMax: 40, hap: -8, result: 'Launch za tři týdny. Gumídci mizí z regálů. {val}' },
      { label: 'Půl roku pořádně testovat', valMin: 0, valMax: 8, hap: 6, result: 'Kvalita především. Konkurence zatím taky nespí. {val}' },
    ],
  },
  {
    id: 'headhunter',
    icon: 'heart',
    text: 'Headhunter loví vašeho nejlepšího obchodního ředitele. Nabízí mu o 40 % víc.',
    choices: [
      { label: 'Dorovnat a přidat prémie', valMin: -3, valMax: 3, hap: 12, result: 'Zůstává! A celý tým ví, že si lidí vážíte. {val}' },
      { label: 'Nikdo není nenahraditelný', valMin: -15, valMax: -2, hap: -10, result: 'Odešel. I s půlkou kontaktů na klíčové odběratele. {val}' },
    ],
  },
  {
    id: 'eshop',
    icon: 'chart',
    text: 'Naševitaminy.cz spadly přesně ve špičce chřipkové kampaně. IT říká: „Buď záplata, nebo nový systém.“',
    choices: [
      { label: 'Přepsat celý systém hned', valMin: -5, valMax: 25, hap: -6, flag: 'eshop_rebuild', result: 'Měsíc bolesti, ale nový e-shop sviští. {val}' },
      { label: 'Záplatovat a modlit se', valMin: -10, valMax: 8, hap: -2, flag: 'eshop_patch', result: 'Drží to. Zatím. Izolepa je vidět. {val}' },
    ],
  },
  {
    id: 'balkan',
    icon: 'flag',
    text: 'Distributor nabízí expanzi na Balkán. Velký trh, divoké prostředí.',
    choices: [
      { label: 'Jdeme do toho!', valMin: 8, valMax: 45, hap: -5, flag: 'balkan_go', result: 'Bělehrad, Sofie, Záhřeb. Papírování peklo, čísla nebe. {val}' },
      { label: 'Nejdřív pořádně dobýt Slovensko', valMin: 5, valMax: 15, hap: 3, result: 'Krok za krokem. Slovensko roste pěkně. {val}' },
    ],
  },
  {
    id: 'eu',
    icon: 'scroll',
    text: 'EU vydala nová pravidla značení doplňků stravy. Všechny obaly je nutné předělat.',
    choices: [
      { label: 'Právníci, grafici, přes noc!', valMin: -5, valMax: 5, hap: -5, result: 'Zvládnuto první v Česku. Drahé, ale bez pokut. {val}' },
      { label: 'Otočit to v marketing', valMin: 8, valMax: 20, hap: 3, result: '„Schváleno přísnou EU!“ Zákazníci to žerou. {val}' },
    ],
  },
  {
    id: 'pricewar',
    icon: 'chart',
    text: 'Konkurence spustila cenovou válku. Jejich céčko je v akci za polovinu.',
    choices: [
      { label: 'Zdražit a hrát na prémiovost', valMin: -5, valMax: 25, hap: 3, result: 'Kvalita se počítá. Věrní zákazníci zůstali a připlatili. {val}' },
      { label: 'Srovnat ceny', valMin: -10, valMax: 5, hap: -5, result: 'Cenové dno je studené a je tam málo místa. {val}' },
    ],
  },
  {
    id: 'teambuilding',
    icon: 'heart',
    text: 'HR navrhuje třídenní teambuilding v Beskydech. Wellness, kolo, večer kytara.',
    choices: [
      { label: 'Tři dny pro všechny, zasloužíme si to', valMin: -3, valMax: 0, hap: 18, result: 'Tým se vrátil nabitý. A s deseti novými nápady. {val}' },
      { label: 'Zrušit, teď se maká', valMin: 3, valMax: 8, hap: -12, result: 'Čísla dobrá, nálada pod bodem mrazu. {val}' },
    ],
  },
  {
    id: 'grant',
    icon: 'euro',
    text: 'Vypsali dotaci EU na inovace ve výrobě. Papírování na tři měsíce.',
    choices: [
      { label: 'Vrhnout se na papírování', valMin: 10, valMax: 25, hap: -8, result: 'Dotace schválena! Nová linka se objednává. {val}' },
      { label: 'Nemáme na to lidi', valMin: 0, valMax: 5, hap: 2, result: 'Klid na práci. Dotaci vzal konkurent. {val}' },
    ],
  },
  {
    id: 'xmas',
    months: [8, 9, 10],
    icon: 'tv',
    text: 'Blíží se vánoční sezóna. Agentura navrhla kampaň „Zdraví pod stromeček“.',
    choices: [
      { label: 'Billboardy po celé republice', valMin: 15, valMax: 35, hap: -3, result: 'Vitar je vidět z každé dálnice. Prodeje jedou. {val}' },
      { label: 'Jen online, decentně', valMin: 5, valMax: 15, hap: 0, result: 'Solidní výkon za rozumné peníze. {val}' },
    ],
  },
  {
    id: 'machine',
    icon: 'factory',
    text: 'Porucha na hlavní výrobní lince! Náhradní díl jede z Německa dva týdny.',
    choices: [
      { label: 'Noční směny na záložní lince', valMin: -8, valMax: 0, hap: -10, result: 'Zachráněno, ale tým je vyždímaný. {val}' },
      { label: 'Outsourcnout výrobu na měsíc', valMin: -12, valMax: -2, hap: 0, result: 'Drahé řešení, ale zákazníci nic nepoznali. {val}' },
    ],
  },
  {
    id: 'pharma',
    icon: 'pill',
    text: 'Lékárníci si stěžují, že o produktech nic nevědí. Chtějí školení.',
    choices: [
      { label: 'Roadshow po celé republice', valMin: 8, valMax: 18, hap: -4, result: 'Lékárníci teď doporučují vás. To je k nezaplacení. {val}' },
      { label: 'Poslat jim PDF', valMin: -5, valMax: 3, hap: 2, result: 'PDF nikdo neotevřel. Kdo by to byl čekal. {val}' },
    ],
  },
  {
    id: 'amazon',
    icon: 'truck',
    text: 'Amazon.de nabízí listing v Německu. Obří trh, brutální logistika.',
    choices: [
      { label: 'Go! Deutschland, wir kommen!', valMin: 10, valMax: 40, hap: -6, result: 'Ordnung zvládnut. Německo objednává. {val}' },
      { label: 'Logistiku teď nedáme, počkáme', valMin: 0, valMax: 5, hap: 2, result: 'Rozumná opatrnost. Vlak ale trochu ujíždí. {val}' },
    ],
  },
  {
    id: 'cleanlabel',
    icon: 'leaf',
    text: 'Trend „clean label“ sílí. Zákazníci čtou složení a chtějí čistotu bez éček.',
    choices: [
      { label: 'Přeformulovat klíčové produkty', valMin: 5, valMax: 25, hap: -5, result: 'Nové receptury bodují u mladých rodin. {val}' },
      { label: 'Naše receptury jsou svaté', valMin: -10, valMax: 5, hap: 0, result: 'Skalní zákazníci zůstali. Ti noví šli jinam. {val}' },
    ],
  },
  {
    id: 'coffee',
    icon: 'heart',
    text: 'Rozbila se klimatizace i kávovar. Rozpočet správy budov stačí jen na jedno.',
    choices: [
      { label: 'Kávovar, to je jasné', valMin: 0, valMax: 3, hap: 8, result: 'Bez kávy firma nejede. Dobrá volba. {val}' },
      { label: 'Klimatizaci', valMin: 0, valMax: 3, hap: 4, result: 'Chladné hlavy, ale fronta na kafe u benzinky. {val}' },
    ],
  },
  {
    id: 'hockey',
    months: [0, 1, 2, 8, 9, 10, 11],
    icon: 'hockey',
    text: 'Hokejová extraliga hledá partnera. Logo na ledě, miliony diváků.',
    choices: [
      { label: 'Logo na led!', valMin: 12, valMax: 30, hap: 4, result: 'Celá hospoda ví, co je Vitar. {val}' },
      { label: 'Radši 100 malých oddílů', valMin: 5, valMax: 15, hap: 8, result: 'Děti v dresech s logem. Rodiče kupují. Srdcovka. {val}' },
    ],
  },
  {
    id: 'press',
    icon: 'scroll',
    text: 'Novinář píše článek „Doplňky stravy: byznys s placebo efektem?“ a chce vyjádření.',
    choices: [
      { label: 'Transparentně poslat studie a otevřít výrobu', valMin: -5, valMax: 15, hap: 5, result: 'Férový článek. Transparentnost zabodovala. {val}' },
      { label: 'Mlčet, ono to přejde', valMin: -20, valMax: 0, hap: -5, result: '„Firma odmítla komentovat.“ Au. {val}' },
    ],
  },
  {
    id: 'ai',
    icon: 'robot',
    text: 'Marketing chce nasadit AI na kampaně, zákaznický servis i plánování výroby.',
    choices: [
      { label: 'AI všude, plný plyn', valMin: 10, valMax: 30, hap: -8, result: 'Efektivita letí nahoru. Půlka firmy se bojí o místo. {val}' },
      { label: 'AI jen jako pomocník lidí', valMin: 5, valMax: 12, hap: 5, result: 'Lidi + AI = klidný a rychlejší tým. {val}' },
    ],
  },
  {
    id: 'retro',
    icon: 'gift',
    text: 'Ve skladu v Tišnově se našla originální receptura šumivého nápoje z 90. let.',
    choices: [
      { label: 'Limitovaná retro edice!', valMin: 10, valMax: 35, hap: 8, result: 'Nostalgie prodává! Vyprodáno za týden. {val}' },
      { label: 'Nostalgie neprodává', valMin: 0, valMax: 5, hap: -3, result: 'Možná příště. Receptura se vrací do šuplíku. {val}' },
    ],
  },
  {
    id: 'warehouse',
    icon: 'box',
    text: 'Vedle otevřeli obří logistické centrum a přetahují vám skladníky.',
    choices: [
      { label: 'Zvednout mzdy ve skladu', valMin: -5, valMax: 2, hap: 10, result: 'Sklad drží. Lidi vědí, že na ně myslíte. {val}' },
      { label: 'Brigádníci to zvládnou', valMin: -8, valMax: 5, hap: -10, result: 'Zvládli. Až na tři špatně poslané palety do Ostravy. {val}' },
    ],
  },
  {
    id: 'fair',
    icon: 'flag',
    text: 'Veletrh zdraví v Düsseldorfu. Šance potkat nákupčí z celé Evropy.',
    choices: [
      { label: 'Velký stánek, plná paráda', valMin: 8, valMax: 28, hap: -4, result: 'Tři nové kontrakty a plný diář schůzek. {val}' },
      { label: 'Jen letáky a vizitky', valMin: 0, valMax: 6, hap: 0, result: 'Pár kontaktů. Velké ryby braly velké stánky. {val}' },
    ],
  },
  {
    id: 'whitelabel',
    icon: 'factory',
    text: 'Německý drogistický řetězec chce, abyste vyráběli jeho privátní značku. Obří objemy, jejich logo.',
    choices: [
      { label: 'Brát! Tišnov pojede naplno', valMin: 12, valMax: 38, hap: -6, flag: 'wl_full', result: 'Whitelabel export jede. Linky hučí, marže menší, ale objemy obří. {val}' },
      { label: 'Ne, budujeme vlastní značky', valMin: 0, valMax: 8, hap: 4, result: 'Maxi Vita zůstává hvězdou regálu. Kapacita linek ale zeje. {val}' },
    ],
  },
  {
    id: 'whitelabel2',
    icon: 'box',
    text: 'Polský řetězec lékáren poptává privátní řadu vitaminů. Chce ale exkluzivitu pro Polsko.',
    choices: [
      { label: 'Podepsat exkluzivitu', valMin: 8, valMax: 30, hap: -4, flag: 'wl_exclusive', result: 'Kontrakt na tři roky. Tišnov nabírá druhou směnu. {val}' },
      { label: 'Jen bez exkluzivity', valMin: -5, valMax: 12, hap: 2, result: 'Dohoda menší, ale dveře do Polska zůstávají otevřené všem značkám. {val}' },
    ],
  },
  {
    id: 'd2c',
    icon: 'chart',
    text: 'Naševitaminy.cz rostou. Marketing chce přesunout rozpočet z řetězců do vlastního e-shopu.',
    choices: [
      { label: 'D2C plný plyn, marže je naše', valMin: 8, valMax: 30, hap: -4, result: 'Přímý prodej roste, data o zákaznících k nezaplacení. Nákupčí řetězců prskají. {val}' },
      { label: 'Neriskovat vztahy s řetězci', valMin: 2, valMax: 10, hap: 2, result: 'Klid v obchodních vztazích. E-shop roste pomaleji. {val}' },
    ],
  },
  {
    id: 'allegro',
    icon: 'flag',
    text: 'Allegro v Polsku otevírá kategorii zdraví. Šance dostat e-commerce za hranice.',
    choices: [
      { label: 'Nalistovat celé portfolio', valMin: 10, valMax: 35, hap: -5, result: 'Polsko objednává. Logistika sténá, čísla rostou. {val}' },
      { label: 'Jen Energit a Maxi Vita', valMin: 5, valMax: 18, hap: 0, result: 'Best-sellery se chytily. Zbytek portfolia počká. {val}' },
    ],
  },
  {
    id: 'caprisun',
    months: [1, 2, 3, 4],
    icon: 'pill',
    text: 'Licence Capri-Sun se prodlužuje. Licenční poplatky ale rostou o 30 %.',
    choices: [
      { label: 'Prodloužit, značka táhne', valMin: 5, valMax: 18, hap: 0, flag: 'caprisun_keep', result: 'Kapříci zůstávají v portfoliu. Děti jásají. {val}' },
      { label: 'Pustit licenci, tlačit OvoCé', valMin: -8, valMax: 15, hap: 2, flag: 'caprisun_drop', result: 'Vlastní značka dostává šanci. Risk, ale marže je celá vaše. {val}' },
    ],
  },
  {
    id: 'predator',
    months: [4, 5, 6, 7],
    icon: 'virus',
    text: 'Komáří kalamita na jižní Moravě! Poptávka po repelentu Predator trhá rekordy.',
    choices: [
      { label: 'Přehodit kapacity na Predator', valMin: 10, valMax: 28, hap: -6, result: 'Predator vyprodán do posledního kusu. Komáři v šoku. {val}' },
      { label: 'Nenechat se rozptylovat', valMin: 0, valMax: 6, hap: 0, result: 'Sezónní vlna projela kolem. Vitaminy jedou dál. {val}' },
    ],
  },
  {
    id: 'award',
    icon: 'trophy',
    text: 'Maxi Vita Essentials získala ocenění Volba spotřebitelů — Nejlepší novinka roku!',
    choices: [
      { label: 'Opřít o to celou kampaň', valMin: 10, valMax: 25, hap: 6, result: 'Logo ocenění na každém obalu a billboardu. Důvěra prodává. {val}' },
      { label: 'Jen tisková zpráva', valMin: 3, valMax: 10, hap: 3, result: 'Skromnost šlechtí. Ale konkurence by to vytroubila víc. {val}' },
    ],
  },
  {
    id: 'vyprostovak',
    months: [9, 10, 11],
    icon: 'pill',
    text: 'Blíží se večírková sezóna. Řetězce chtějí dvojnásobnou zásobu legendárního Vyprošťováku.',
    choices: [
      { label: 'Navařit dvojnásob', valMin: 8, valMax: 22, hap: -3, result: 'Vyprošťovák zachraňuje rána po celé republice. {val}' },
      { label: 'Držet běžné objemy', valMin: 0, valMax: 6, hap: 0, result: 'Vyprodáno už 27. prosince. Škoda. {val}' },
    ],
  },
  {
    id: 'app',
    icon: 'phone',
    text: 'Produktový tým chce mobilní appku VitaCoach — připomínky, věrnostní body, tipy.',
    choices: [
      { label: 'Vyvinout vlastní appku', valMin: 5, valMax: 30, hap: -6, result: 'Appka žije! Věrní zákazníci nakupují víc. {val}' },
      { label: 'Partnerství s existující appkou', valMin: 5, valMax: 15, hap: 2, result: 'Rychlé, levné, funguje. {val}' },
    ],
  },
]

// Navazující události — vracejí se 2–3 měsíce po rozhodnutí, které nastavilo flag.
export const FOLLOWUPS: Record<string, GameEvent> = {
  crunch: {
    id: 'fu_crunch',
    icon: 'heart',
    followup: true,
    text: 'Účet za nonstop výrobu: tři klíčoví lidé z linky v Tišnově dali výpověď.',
    choices: [
      { label: 'Protinabídky a klidnější směny', valMin: -5, valMax: 2, hap: 8, result: 'Dva zůstali. A výroba dostala lidštější tempo. {val}' },
      { label: 'Nahradíme je, jede se dál', valMin: -12, valMax: -2, hap: -6, result: 'Nábor vázne, zaučení trvá. Linka jede na půl plynu. {val}' },
    ],
  },
  eshop_patch: {
    id: 'fu_eshop_patch',
    icon: 'chart',
    followup: true,
    text: 'Izolepa povolila. Naševitaminy.cz ležely tři dny a Heureka je plná jednohvězdiček.',
    choices: [
      { label: 'Nový systém, teď už bez debat', valMin: -10, valMax: -2, hap: -5, result: 'Draze a pod tlakem, ale konečně pořádně. {val}' },
      { label: 'Další záplata', valMin: -18, valMax: 0, hap: -8, result: 'IT tým mlčky ukazuje na hořící server. {val}' },
    ],
  },
  eshop_rebuild: {
    id: 'fu_eshop_rebuild',
    icon: 'chart',
    followup: true,
    text: 'Nový e-shop sviští! Konverze +40 %. Marketing chce velkou kampaň na Naševitaminy.cz.',
    choices: [
      { label: 'Kampaň! Teď, nebo nikdy', valMin: 10, valMax: 30, hap: 0, result: 'Investice do nového systému se vrací i s úroky. {val}' },
      { label: 'Nechat růst organicky', valMin: 3, valMax: 10, hap: 2, result: 'Roste to samo. Pomalu, ale jistě. {val}' },
    ],
  },
  balkan_go: {
    id: 'fu_balkan',
    icon: 'flag',
    followup: true,
    text: 'Balkánský distributor přestal platit. Dluží faktury za tři měsíce dodávek.',
    choices: [
      { label: 'Právníci a stopka dodávek', valMin: -8, valMax: 5, hap: -2, result: 'Část peněz venku, vztahy na bodu mrazu. Poučení drahé, ale poučení. {val}' },
      { label: 'Vydržet, trh je perspektivní', valMin: -15, valMax: 15, hap: -3, result: 'Hazard. Někdy vyjde, někdy máte drahou pohledávku. {val}' },
    ],
  },
  wl_full: {
    id: 'fu_wl_full',
    icon: 'factory',
    followup: true,
    text: 'Tišnov jede na 110 % pro whitelabel. Na vlastní značky nezbývá kapacita — Maxi Vita chybí v regálech.',
    choices: [
      { label: 'Investovat do rozšíření výroby', valMin: -5, valMax: 20, hap: -5, result: 'Nová hala se staví. Chvíli to bolí, kapacita bude dvojnásobná. {val}' },
      { label: 'Omezit whitelabel kontrakt', valMin: -8, valMax: 8, hap: 3, result: 'Němci skřípou zuby, vlastní značky se vrací do regálů. {val}' },
    ],
  },
  wl_exclusive: {
    id: 'fu_wl_exclusive',
    icon: 'box',
    followup: true,
    text: 'Německý řetězec chce stejnou privátní řadu. Jenže polská exkluzivita to zakazuje.',
    choices: [
      { label: 'Vykoupit se z exkluzivity', valMin: -10, valMax: 12, hap: -3, result: 'Drahý podpis, ale německý trh je otevřený. {val}' },
      { label: 'Němce odmítnout, slovo platí', valMin: -3, valMax: 6, hap: 4, result: 'Poláci si vaší férovosti cení. Objednávají víc. {val}' },
    ],
  },
  caprisun_keep: {
    id: 'fu_caprisun_keep',
    icon: 'pill',
    followup: true,
    text: 'Capri-Sun letí! Licenční sázka vyšla, léto trhá rekordy prodejů.',
    choices: [
      { label: 'Rozšířit řadu o nové příchutě', valMin: 8, valMax: 25, hap: 2, result: 'Nové příchutě mizí z regálů. Licence se platí sama. {val}' },
      { label: 'Držet současnou nabídku', valMin: 3, valMax: 10, hap: 0, result: 'Jistota je jistota. {val}' },
    ],
  },
  caprisun_drop: {
    id: 'fu_caprisun_drop',
    icon: 'pill',
    followup: true,
    text: 'OvoCé bez kapříků bojuje. Obchodníci hlásí: děti chtějí značku, kterou znají z televize.',
    choices: [
      { label: 'Velká kampaň na OvoCé', valMin: -5, valMax: 25, hap: 0, result: 'Buď vybudujete vlastní legendu, nebo draze zaplatíte školné. {val}' },
      { label: 'Vrátit se k jednání o licenci', valMin: -5, valMax: 8, hap: -3, result: 'Licence zpět, ale za horších podmínek. Aspoň že děti jásají. {val}' },
    ],
  },
}
