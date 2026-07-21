'use client'

import { useEffect, useState } from 'react'
import { Game } from '@/components/Game'
import { randomSeed } from '@/lib/engine'

export default function PlaySolo() {
  // seed až na klientovi — server a klient jinak vygenerují jinou hru (hydration mismatch)
  const [seed, setSeed] = useState<string | null>(null)
  useEffect(() => setSeed(randomSeed()), [])
  if (!seed) return null
  return <Game key={seed} seed={seed} onRestart={() => setSeed(randomSeed())} />
}
