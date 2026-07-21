'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function JoinForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [code, setCode] = useState(params.get('code') ?? '')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function join(e: React.FormEvent) {
    e.preventDefault()
    const c = code.trim().toUpperCase()
    const n = name.trim()
    if (c.length !== 4 || !n) {
      setError('Vyplňte 4místný kód a jméno.')
      return
    }
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`/api/rooms/${c}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'join', name: n }),
      })
      if (res.status === 404) {
        setError('Místnost nenalezena. Zkontrolujte kód.')
        setBusy(false)
        return
      }
      if (!res.ok) throw new Error()
      const data = await res.json()
      sessionStorage.setItem(
        `vitar-${c}`,
        JSON.stringify({ playerId: data.playerId, name: n })
      )
      router.push(`/room/${c}`)
    } catch {
      setError('Připojení selhalo. Zkuste to znovu.')
      setBusy(false)
    }
  }

  return (
    <div className="wrap">
      <h1 className="logo" style={{ fontSize: 20 }}>
        Připojit se
      </h1>
      <form onSubmit={join} className="menu">
        <div>
          <div className="label">KÓD MÍSTNOSTI</div>
          <input
            className="field field-code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 4))}
            placeholder="ABCD"
            autoCapitalize="characters"
            autoComplete="off"
          />
        </div>
        <div>
          <div className="label">VAŠE JMÉNO</div>
          <input
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 20))}
            placeholder="např. Petra"
            autoComplete="off"
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Připojuji…' : 'Do hry!'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default function JoinPage() {
  return (
    <Suspense>
      <JoinForm />
    </Suspense>
  )
}
