'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fmtMoney, MONTHS, TARGET } from '@/lib/engine'
import type { Room } from '@/lib/store'

export default function Board() {
  const { code: rawCode } = useParams<{ code: string }>()
  const code = String(rawCode ?? '').toUpperCase()
  const [room, setRoom] = useState<Room | null>(null)
  const [error, setError] = useState('')
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    setOrigin(window.location.host)
    let stop = false
    const poll = async () => {
      try {
        const r = await fetch(`/api/rooms/${code}`)
        if (r.status === 404) {
          if (!stop) setError('Místnost nenalezena nebo vypršela.')
          return
        }
        if (r.ok && !stop) setRoom(await r.json())
      } catch {}
    }
    poll()
    const t = setInterval(poll, 2000)
    return () => {
      stop = true
      clearInterval(t)
    }
  }, [code])

  if (error)
    return (
      <div className="board center">
        <div className="error">{error}</div>
      </div>
    )

  const sorted = room ? [...room.players].sort((a, b) => b.valuation - a.valuation) : []
  const winner = sorted.find((p) => p.won)

  return (
    <div className="board">
      <div className="center">
        <h1 className="logo" style={{ fontSize: 22 }}>
          VITAR TYCOON — TURNAJ
        </h1>
        <div className="board-code">{code}</div>
        <p className="board-join">
          Hraje se na mobilu: <b>{origin}/join</b> → zadejte kód <b>{code}</b> a jméno.
          <br />
          Cíl: dotáhnout firmu z 1 mld na {fmtMoney(TARGET)}.
        </p>
      </div>

      {winner && (
        <div className="card-paper center" style={{ marginBottom: 18, background: 'var(--yellow)' }}>
          <p className="card-title">JEDNOROŽEC! {winner.name} — {fmtMoney(winner.valuation)}</p>
        </div>
      )}

      {sorted.length === 0 && (
        <p className="tagline center">Čekám na hráče… (připojte se kódem)</p>
      )}

      <div className="board-list">
        {sorted.map((p, i) => (
          <div className="rowp" key={p.id}>
            <div className="rowp-rank">{i + 1}.</div>
            <div className="rowp-name">
              {p.name}
              {p.won ? ' ★' : !p.alive ? ' ✝' : ''}
            </div>
            <div className="rowp-val">{fmtMoney(p.valuation)}</div>
            <div className="rowp-status">
              {p.won
                ? 'UNICORN!'
                : !p.alive
                  ? 'tým se sesypal'
                  : p.finished
                    ? 'dohráno'
                    : `${MONTHS[Math.min(p.month, 11)]} · nálada ${p.happiness}`}
            </div>
            <div className="rowp-bar">
              <div
                className={`rowp-bar-fill ${p.won ? 'gold' : !p.alive ? 'dead' : ''}`}
                style={{ width: `${Math.min(100, (p.valuation / TARGET) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
