'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sprite, SPRITES, PALETTES } from '@/components/Sprite'

export default function Menu() {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  async function createRoom() {
    setCreating(true)
    setError('')
    try {
      const res = await fetch('/api/rooms', { method: 'POST' })
      if (!res.ok) throw new Error()
      const data = await res.json()
      router.push(`/board/${data.code}`)
    } catch {
      setError('Místnost se nepodařilo založit. Zkuste to znovu.')
      setCreating(false)
    }
  }

  return (
    <div className="wrap">
      <div className="logo-row">
        <span>VITAR</span>
        <Sprite map={SPRITES.asterisk} palette={PALETTES.brand} px={3} />
        <span>GROUP</span>
      </div>
      <h1 className="logo">TYCOON</h1>
      <p className="tagline">Cesta k 10 miliardám</p>

      <div className="card-paper" style={{ marginBottom: 20 }}>
        <p className="card-text">
          Rok v křesle šéfa VITAR Group. 12 měsíců, 12 rozhodnutí. Start: firma za 1 mld Kč. Cíl:
          10 mld Kč. A hlavně — nezničit náladu týmu.
        </p>
      </div>

      <div className="menu">
        <Link href="/play" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Hrát sólo
        </Link>
        <button className="btn" onClick={createRoom} disabled={creating}>
          {creating ? 'Zakládám…' : 'Založit místnost (turnaj)'}
        </button>
        <Link href="/join" className="btn" style={{ textDecoration: 'none' }}>
          Připojit se ke hře
        </Link>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="spacer" />
      <p className="tagline" style={{ fontSize: 8, marginTop: 24 }}>
        Turnaj: založte místnost na projektoru, hráči se připojí kódem z mobilu.
      </p>
    </div>
  )
}
