'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Game } from '@/components/Game'
import { GameState, fmtMoney, TARGET } from '@/lib/engine'
import type { Room } from '@/lib/store'

export default function RoomPlay() {
  const { code: rawCode } = useParams<{ code: string }>()
  const code = String(rawCode ?? '').toUpperCase()
  const router = useRouter()
  const [seed, setSeed] = useState<string | null>(null)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [playerName, setPlayerName] = useState('')
  const [room, setRoom] = useState<Room | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const raw = sessionStorage.getItem(`vitar-${code}`)
    if (!raw) {
      router.replace(`/join?code=${code}`)
      return
    }
    const { playerId, name } = JSON.parse(raw)
    setPlayerId(playerId)
    setPlayerName(name)
    fetch(`/api/rooms/${code}`)
      .then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then((data: Room) => setSeed(data.seed))
      .catch(() => setError('Místnost nenalezena nebo vypršela.'))
  }, [code, router])

  // leaderboard poll
  useEffect(() => {
    if (!seed) return
    let stop = false
    const poll = async () => {
      try {
        const r = await fetch(`/api/rooms/${code}`)
        if (r.ok && !stop) setRoom(await r.json())
      } catch {}
    }
    poll()
    const t = setInterval(poll, 3000)
    return () => {
      stop = true
      clearInterval(t)
    }
  }, [seed, code])

  const onProgress = useCallback(
    (s: GameState) => {
      if (!playerId) return
      fetch(`/api/rooms/${code}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'progress',
          playerId,
          month: s.month,
          valuation: s.valuation,
          happiness: s.happiness,
          alive: s.alive,
          finished: s.finished,
          won: s.won,
        }),
      }).catch(() => {})
    },
    [code, playerId]
  )

  if (error)
    return (
      <div className="wrap">
        <div className="error">{error}</div>
      </div>
    )
  if (!seed)
    return (
      <div className="wrap">
        <p className="tagline" style={{ marginTop: 60 }}>
          Načítám místnost…
        </p>
      </div>
    )

  const sorted = room
    ? [...room.players].sort((a, b) => b.valuation - a.valuation)
    : []

  return (
    <div>
      <Game seed={seed} playerName={playerName} onProgress={onProgress} />
      {sorted.length > 1 && (
        <div className="mini-board" style={{ maxWidth: 440, margin: '0 auto', padding: '0 12px 90px' }}>
          <div className="mini-title">
            MÍSTNOST {code} — POŘADÍ
          </div>
          <div className="board-list">
            {sorted.map((p, i) => (
              <div className="rowp" key={p.id}>
                <div className="rowp-rank">{i + 1}.</div>
                <div className="rowp-name">
                  {p.name}
                  {p.id === playerId ? ' (vy)' : ''}
                  {p.won ? ' ★' : !p.alive ? ' ✝' : ''}
                </div>
                <div className="rowp-val">{fmtMoney(p.valuation)}</div>
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
      )}
    </div>
  )
}
