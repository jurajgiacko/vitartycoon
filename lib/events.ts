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
}

export type GameEvent = {
  id: string
  icon: string // klíč do SPRITES
  text: string
  choices: Choice[]
}

export const EVENTS: GameEvent[] = [
  {
    id: 'flu',
    icon: 'virus',
    text: 'Chřipková sezóna! Celé Česko smrká a poptávka po vitamínu C letí nahoru.',
    choices: [
      { label: 'Přesčasy! Vyrábíme nonstop', valMin: 18, valMax: 35, hap: -12, result: 'Linky jely 24/7. Prodeje trhaly rekordy, tým sotva stojí na nohou. {val}' },
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
    text: 'Vývoj přinesl prototyp kolagenových gumídků. Trh po nich šílí.',
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
    text: 'E-shop spadl přesně ve špičce chřipkové kampaně. IT říká: „Buď záplata, nebo nový systém.“',
    choices: [
      { label: 'Přepsat celý systém hned', valMin: -5, valMax: 25, hap: -6, result: 'Měsíc bolesti, ale nový e-shop sviští. {val}' },
      { label: 'Záplatovat a modlit se', valMin: -10, valMax: 8, hap: -2, result: 'Drží to. Zatím. Izolepa je vidět. {val}' },
    ],
  },
  {
    id: 'balkan',
    icon: 'flag',
    text: 'Distributor nabízí expanzi na Balkán. Velký trh, divoké prostředí.',
    choices: [
      { label: 'Jdeme do toho!', valMin: 8, valMax: 45, hap: -5, result: 'Bělehrad, Sofie, Záhřeb. Papírování peklo, čísla nebe. {val}' },
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
    text: 'Ve skladu se našla originální receptura šumivého nápoje z 90. let.',
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
    id: 'app',
    icon: 'phone',
    text: 'Produktový tým chce mobilní appku VitaCoach — připomínky, věrnostní body, tipy.',
    choices: [
      { label: 'Vyvinout vlastní appku', valMin: 5, valMax: 30, hap: -6, result: 'Appka žije! Věrní zákazníci nakupují víc. {val}' },
      { label: 'Partnerství s existující appkou', valMin: 5, valMax: 15, hap: 2, result: 'Rychlé, levné, funguje. {val}' },
    ],
  },
]
