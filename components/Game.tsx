'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  GameState,
  ChoiceOutcome,
  newGame,
  eventSequence,
  applyChoice,
  fmtMoney,
  MONTHS,
  TARGET,
} from '@/lib/engine'
import { Sprite, SPRITES, PALETTES } from './Sprite'
import { sfx, initSound, isMuted, toggleMute } from '@/lib/sound'

function useAnimatedNumber(value: number, ms = 600) {
  const [disp, setDisp] = useState(value)
  const fromRef = useRef(value)
  useEffect(() => {
    const from = fromRef.current
    if (from === value) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisp(from + (value - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else fromRef.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, ms])
  return disp
}

export function Game({
  seed,
  playerName,
  onProgress,
  onRestart,
}: {
  seed: string
  playerName?: string
  onProgress?: (s: GameState) => void
  onRestart?: () => void
}) {
  const [state, setState] = useState<GameState>(newGame)
  const [phase, setPhase] = useState<'event' | 'result' | 'end'>('event')
  const [outcome, setOutcome] = useState<ChoiceOutcome | null>(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    initSound()
    setMuted(isMuted())
    // skryté dev zkratky: /play?debug=win|lose|flat
    const dbg = new URLSearchParams(window.location.search).get('debug')
    if (dbg === 'win' || dbg === 'lose' || dbg === 'flat') {
      setState({
        month: 11,
        valuation: dbg === 'win' ? 10_540_000_000 : dbg === 'flat' ? 6_200_000_000 : 740_000_000,
        happiness: dbg === 'lose' ? 0 : 64,
        alive: dbg !== 'lose',
        finished: true,
        won: dbg === 'win',
      })
      setPhase('end')
    }
  }, [])

  const events = useMemo(() => eventSequence(seed), [seed])
  const ev = events[state.month]
  const dispVal = useAnimatedNumber(state.valuation)

  function choose(i: number) {
    const out = applyChoice(seed, state, ev, i)
    setOutcome(out)
    setState(out.state)
    setPhase('result')
    if (out.valPct >= 0) sfx.good()
    else sfx.bad()
    onProgress?.(out.state)
  }

  function next() {
    sfx.click()
    if (state.finished) {
      setPhase('end')
      if (state.won) sfx.win()
      else if (!state.alive) sfx.lose()
    } else {
      setPhase('event')
    }
  }

  function restart() {
    sfx.click()
    if (onRestart) {
      onRestart()
    }
    setState(newGame())
    setOutcome(null)
    setPhase('event')
  }

  async function share() {
    sfx.click()
    const name = playerName ? `${playerName} dotáhl(a)` : 'Dotáhl(a) jsem'
    const text = state.won
      ? `${name} VITAR Group na ${fmtMoney(state.valuation)} — JEDNOROŽEC! 🦄 Zvládneš to taky?`
      : `${name} VITAR Group na ${fmtMoney(state.valuation)}. Zvládneš 10 miliard?`
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    try {
      if (navigator.share) await navigator.share({ text: `${text} ${url}` })
      else {
        await navigator.clipboard.writeText(`${text} ${url}`)
        alert('Zkopírováno do schránky!')
      }
    } catch {}
  }

  const face =
    state.happiness >= 60 ? 'faceHappy' : state.happiness >= 30 ? 'faceMid' : 'faceSad'

  const pal = PALETTES.default

  return (
    <div className="game">
      <header className="hud">
        <div className="hud-item">
          <div className="hud-value">{fmtMoney(dispVal)}</div>
          <div className="goalbar">
            <div
              className="goalbar-fill"
              style={{ width: `${Math.min(100, (state.valuation / TARGET) * 100)}%` }}
            />
          </div>
          <div className="hud-label">Cíl 10 mld</div>
        </div>
        <div className="hud-item hud-center">
          <div className="face-bump" key={state.happiness}>
            <Sprite map={SPRITES[face]} palette={pal} px={4} />
          </div>
          <div className="hapbar">
            <div
              className="hapbar-fill"
              style={{
                width: `${state.happiness}%`,
                background:
                  state.happiness >= 60 ? 'var(--green)' : state.happiness >= 35 ? 'var(--yellow)' : 'var(--red)',
              }}
            />
          </div>
          <div className="hud-label">Nálada</div>
        </div>
        <div className="hud-item hud-right">
          <div className="hud-month">{MONTHS[state.month]}</div>
          <div className="monthbar">
            <div
              className="monthbar-fill"
              style={{ width: `${((state.month + (state.finished ? 1 : 0)) / 12) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {phase === 'event' && ev && (
        <main className="card" key={`ev-${state.month}`}>
          <div className="card-month">
            {MONTHS[state.month]} · {state.month + 1}/12
          </div>
          <div className="card-icon">
            <Sprite map={SPRITES[ev.icon] ?? SPRITES.star} palette={pal} px={7} />
          </div>
          <div className="card-paper">
            <p className="card-text">{ev.text}</p>
          </div>
          <div className="choices">
            {ev.choices.map((c, i) => (
              <button key={i} className="btn" onClick={() => choose(i)}>
                {c.label}
              </button>
            ))}
          </div>
        </main>
      )}

      {phase === 'result' && outcome && (
        <main
          className={`card ${outcome.valPct < 0 ? 'shake' : ''}`}
          key={`res-${state.month}-${state.finished}`}
        >
          <div className={`delta ${outcome.valPct >= 0 ? 'delta-up' : 'delta-down'}`}>
            {outcome.valPct >= 0 ? '+' : ''}
            {outcome.valPct.toLocaleString('cs-CZ')} %
          </div>
          <div className="particles" aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className={outcome.valPct >= 0 ? 'p p-up' : 'p p-down'}
                style={{
                  left: `${(i * 37 + 11) % 100}%`,
                  animationDelay: `${(i % 7) * 90}ms`,
                  background:
                    outcome.valPct >= 0
                      ? i % 3 === 0
                        ? 'var(--yellow)'
                        : 'var(--green)'
                      : i % 3 === 0
                        ? '#8a8a94'
                        : 'var(--red)',
                }}
              />
            ))}
          </div>
          <div className="card-paper">
            <p className="card-text">{outcome.resultText}</p>
            {outcome.burnout && (
              <p className="card-note">! Tým je vyhořelý — růst jen poloviční !</p>
            )}
            {outcome.onFire && <p className="card-note note-good">Tým v laufu! Bonus +15 % k růstu.</p>}
            <p className="card-hap">
              Nálada týmu {outcome.hapDelta >= 0 ? '+' : ''}
              {outcome.hapDelta}
            </p>
          </div>
          <div className="choices">
            <button className="btn" onClick={next}>
              {state.finished ? 'Výsledek' : 'Další měsíc'}
            </button>
          </div>
        </main>
      )}

      {phase === 'end' && (
        <main className="card">
          {state.won && (
            <div className="confetti" aria-hidden>
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className="c"
                  style={{
                    left: `${(i * 29 + 7) % 100}%`,
                    animationDelay: `${(i * 137) % 2600}ms`,
                    animationDuration: `${2200 + ((i * 53) % 1400)}ms`,
                    background: ['var(--yellow)', 'var(--green)', '#64dd6c', '#3b2cff', 'var(--red)', '#fff'][
                      i % 6
                    ],
                  }}
                />
              ))}
            </div>
          )}
          <div className={`card-icon ${state.won ? 'icon-gold' : ''}`}>
            {state.won && (
              <>
                <div className="sparkle sparkle-1">
                  <Sprite map={SPRITES.star} palette={pal} px={3} />
                </div>
                <div className="sparkle sparkle-2">
                  <Sprite map={SPRITES.star} palette={pal} px={2} />
                </div>
              </>
            )}
            <Sprite
              map={state.won ? SPRITES.unicorn : state.alive ? SPRITES.trophy : SPRITES.skull}
              palette={pal}
              px={state.won ? 8 : 9}
            />
          </div>
          <div className="card-paper">
            {state.won && (
              <>
                <p className="card-title">VYHRÁLI JSTE!</p>
                <p className="card-text">
                  VITAR Group má hodnotu {fmtMoney(state.valuation)}! Deset miliard pokořeno —
                  JEDNOROŽEC ZE ZLÍNA, BABY!
                </p>
              </>
            )}
            {!state.won && state.alive && (
              <>
                <p className="card-title">Prosinec je tu.</p>
                <p className="card-text">
                  Hodnota firmy: {fmtMoney(state.valuation)}. Solidní výsledek — ale jednorožec to
                  ještě není. Cíl byl {fmtMoney(TARGET)}.
                </p>
              </>
            )}
            {!state.alive && (
              <>
                <p className="card-title">Tým se sesypal.</p>
                <p className="card-text">
                  Nálada klesla na nulu a lidi odešli. Bez týmu není firma. Hodnota v troskách:{' '}
                  {fmtMoney(state.valuation)}.
                </p>
              </>
            )}
          </div>
          <div className="choices">
            <button className="btn" onClick={share}>
              Sdílet
            </button>
            {onRestart && (
              <button className="btn" onClick={restart}>
                Hrát znovu
              </button>
            )}
          </div>
        </main>
      )}

      <button
        className="mute"
        onClick={() => setMuted(toggleMute())}
        aria-label="Zvuk zap/vyp"
      >
        {muted ? 'ZVUK: OFF' : 'ZVUK: ON'}
      </button>
    </div>
  )
}
