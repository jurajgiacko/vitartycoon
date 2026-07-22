import { EVENTS, FOLLOWUPS, GameEvent } from './events'

export const START_VALUATION = 1_000_000_000 // 1 mld Kč
export const TARGET = 10_000_000_000 // 10 mld Kč
export const START_HAPPINESS = 60
export const GROWTH_BOOST = 1.38

export const MONTHS = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec',
]

// všechny události (základní i navazující) podle id
export const EVENT_MAP: Record<string, GameEvent> = Object.fromEntries([
  ...EVENTS.map((e) => [e.id, e]),
  ...Object.values(FOLLOWUPS).map((e) => [e.id, e]),
])

export type GameState = {
  month: number // 0–11, index právě hraného měsíce
  valuation: number
  happiness: number // 0–100
  alive: boolean
  finished: boolean
  won: boolean
  currentEventId: string
  used: string[] // už použité základní události
  pending: { id: string; due: number }[] // naplánované navazující události
}

// --- seedovaná náhoda (mulberry32) ---

export function hashSeed(s: string): number {
  let h = 1779033703 ^ s.length
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// zamíchaný celý základní pool pro daný seed — stejný seed => stejná hra
export function eventSequence(seed: string): GameEvent[] {
  const rng = mulberry32(hashSeed(seed))
  const pool = [...EVENTS]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool
}

// další nepoužitá základní událost vhodná pro daný měsíc (sezónnost);
// když žádná sezónně nesedí, vezme se první nepoužitá
export function pickBaseEvent(seed: string, used: string[], month: number): GameEvent {
  const pool = eventSequence(seed)
  return (
    pool.find((e) => !used.includes(e.id) && (!e.months || e.months.includes(month))) ??
    pool.find((e) => !used.includes(e.id))!
  )
}

export function newGame(seed: string): GameState {
  const first = pickBaseEvent(seed, [], 0)
  return {
    month: 0,
    valuation: START_VALUATION,
    happiness: START_HAPPINESS,
    alive: true,
    finished: false,
    won: false,
    currentEventId: first.id,
    used: [first.id],
    pending: [],
  }
}

export type ChoiceOutcome = {
  state: GameState
  valPct: number // skutečná změna hodnoty v %
  hapDelta: number
  resultText: string
  burnout: boolean // růst byl zpomalen vyhořením
  onFire: boolean // růst byl posílen náladou
}

// Výsledek volby je seedovaný podle (seed, měsíc, volba) — deterministický.
export function applyChoice(
  seed: string,
  state: GameState,
  event: GameEvent,
  choiceIndex: number
): ChoiceOutcome {
  const choice = event.choices[choiceIndex]
  const rng = mulberry32(hashSeed(`${seed}:${state.month}:${choiceIndex}`))
  let pct = choice.valMin + rng() * (choice.valMax - choice.valMin)

  // globální škálování růstu — ladí obtížnost dosažení 10 mld za 12 měsíců
  if (pct > 0) pct *= GROWTH_BOOST

  let burnout = false
  let onFire = false
  if (pct > 0 && state.happiness < 35) {
    pct *= 0.5
    burnout = true
  } else if (pct > 0 && state.happiness >= 85) {
    pct *= 1.25
    onFire = true
  }
  pct = Math.round(pct * 10) / 10

  const valuation = Math.max(0, Math.round(state.valuation * (1 + pct / 100)))
  const happiness = Math.min(100, Math.max(0, state.happiness + choice.hap))
  const alive = happiness > 0
  const nextMonth = state.month + 1
  const finished = !alive || nextMonth >= 12
  const won = finished && alive && valuation >= TARGET

  // naplánovat navazující událost (o 2–3 měsíce později)
  const pending = [...state.pending]
  if (choice.flag && FOLLOWUPS[choice.flag]) {
    const frng = mulberry32(hashSeed(`${seed}:fu:${choice.flag}`))
    const due = state.month + 2 + Math.floor(frng() * 2)
    if (due <= 11) pending.push({ id: FOLLOWUPS[choice.flag].id, due })
  }

  // určit událost dalšího měsíce: splatný followup má přednost před základním poolem
  let currentEventId = state.currentEventId
  const used = [...state.used]
  if (!finished) {
    pending.sort((a, b) => a.due - b.due)
    const dueIdx = pending.findIndex((p) => p.due <= nextMonth)
    if (dueIdx >= 0) {
      currentEventId = pending[dueIdx].id
      pending.splice(dueIdx, 1)
    } else {
      const next = pickBaseEvent(seed, used, nextMonth)
      currentEventId = next.id
      used.push(next.id)
    }
  }

  const valText =
    pct >= 0 ? `Hodnota firmy +${pct.toLocaleString('cs-CZ')} %.` : `Hodnota firmy ${pct.toLocaleString('cs-CZ')} %.`

  return {
    state: {
      month: finished ? state.month : nextMonth,
      valuation,
      happiness,
      alive,
      finished,
      won,
      currentEventId,
      used,
      pending,
    },
    valPct: pct,
    hapDelta: choice.hap,
    resultText: choice.result.replace('{val}', valText),
    burnout,
    onFire,
  }
}

export function fmtMoney(v: number): string {
  if (v >= 1e9) {
    const b = v / 1e9
    return `${b.toLocaleString('cs-CZ', { minimumFractionDigits: b < 10 ? 2 : 1, maximumFractionDigits: b < 10 ? 2 : 1 })} mld Kč`
  }
  return `${Math.round(v / 1e6).toLocaleString('cs-CZ')} mil. Kč`
}

export function randomSeed(): string {
  return Math.random().toString(36).slice(2, 10)
}
