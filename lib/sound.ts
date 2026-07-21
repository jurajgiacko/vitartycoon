// Malé 8-bit zvuky přes WebAudio — žádné soubory.
'use client'

let ctx: AudioContext | null = null
let muted = false

export function initSound() {
  if (typeof window === 'undefined') return
  muted = localStorage.getItem('vitar-muted') === '1'
}

export function isMuted() {
  return muted
}

export function toggleMute(): boolean {
  muted = !muted
  try {
    localStorage.setItem('vitar-muted', muted ? '1' : '0')
  } catch {}
  return muted
}

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function beep(freq: number, dur: number, when = 0, type: OscillatorType = 'square', vol = 0.12) {
  if (muted) return
  const c = ac()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(vol, c.currentTime + when)
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + when + dur)
  o.connect(g)
  g.connect(c.destination)
  o.start(c.currentTime + when)
  o.stop(c.currentTime + when + dur)
}

export const sfx = {
  click() {
    beep(660, 0.06)
  },
  good() {
    beep(523, 0.09)
    beep(659, 0.09, 0.09)
    beep(784, 0.12, 0.18)
  },
  bad() {
    beep(330, 0.12)
    beep(247, 0.18, 0.12)
  },
  win() {
    const notes = [523, 659, 784, 1047, 784, 1047, 1319]
    notes.forEach((n, i) => beep(n, 0.14, i * 0.12, 'square', 0.14))
  },
  lose() {
    const notes = [392, 349, 311, 262]
    notes.forEach((n, i) => beep(n, 0.22, i * 0.2, 'sawtooth', 0.1))
  },
}
