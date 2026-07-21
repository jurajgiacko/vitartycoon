// Úložiště místností: Upstash Redis (nastavené env proměnné) s fallbackem do paměti.
// Fallback v paměti funguje spolehlivě lokálně; na Vercelu (serverless) je pro
// multiplayer potřeba Upstash — viz README.

import { Redis } from '@upstash/redis'

export type Player = {
  id: string
  name: string
  month: number
  valuation: number
  happiness: number
  alive: boolean
  finished: boolean
  won: boolean
  updatedAt: number
}

export type Room = {
  code: string
  seed: string
  createdAt: number
  players: Player[]
}

const TTL_SECONDS = 60 * 60 * 6 // místnost žije 6 hodin

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

const memory: Map<string, Room> = (globalThis as any).__vitarRooms ?? new Map()
;(globalThis as any).__vitarRooms = memory

export async function getRoom(code: string): Promise<Room | null> {
  if (redis) return (await redis.get<Room>(`room:${code}`)) ?? null
  return memory.get(code) ?? null
}

export async function saveRoom(room: Room): Promise<void> {
  if (redis) {
    await redis.set(`room:${room.code}`, room, { ex: TTL_SECONDS })
    return
  }
  memory.set(room.code, room)
}

export function storageMode(): 'redis' | 'memory' {
  return redis ? 'redis' : 'memory'
}
