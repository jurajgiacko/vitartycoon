import { NextResponse } from 'next/server'
import { randomSeed, roomCode } from '@/lib/engine'
import { getRoom, saveRoom, storageMode } from '@/lib/store'

export const dynamic = 'force-dynamic'

// POST /api/rooms — založí místnost
export async function POST() {
  let code = roomCode()
  for (let i = 0; i < 5 && (await getRoom(code)); i++) code = roomCode()

  const room = {
    code,
    seed: randomSeed(),
    createdAt: Date.now(),
    players: [],
  }
  await saveRoom(room)
  return NextResponse.json({ code: room.code, seed: room.seed, storage: storageMode() })
}
