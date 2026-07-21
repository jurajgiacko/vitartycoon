import { NextRequest, NextResponse } from 'next/server'
import { getRoom, saveRoom, Player } from '@/lib/store'

export const dynamic = 'force-dynamic'

// GET /api/rooms/CODE — stav místnosti (leaderboard)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  const room = await getRoom(code.toUpperCase())
  if (!room) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json(room)
}

// POST /api/rooms/CODE — { action: "join", name } nebo { action: "progress", ... }
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  const room = await getRoom(code.toUpperCase())
  if (!room) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'bad_request' }, { status: 400 })

  if (body.action === 'join') {
    const name = String(body.name ?? '').trim().slice(0, 20)
    if (!name) return NextResponse.json({ error: 'name_required' }, { status: 400 })
    if (room.players.length >= 50)
      return NextResponse.json({ error: 'room_full' }, { status: 400 })

    const player: Player = {
      id: Math.random().toString(36).slice(2, 10),
      name,
      month: 0,
      valuation: 1_000_000_000,
      happiness: 70,
      alive: true,
      finished: false,
      won: false,
      updatedAt: Date.now(),
    }
    room.players.push(player)
    await saveRoom(room)
    return NextResponse.json({ playerId: player.id, seed: room.seed })
  }

  if (body.action === 'progress') {
    const p = room.players.find((x) => x.id === body.playerId)
    if (!p) return NextResponse.json({ error: 'player_not_found' }, { status: 404 })
    p.month = Number(body.month) || 0
    p.valuation = Number(body.valuation) || 0
    p.happiness = Number(body.happiness) || 0
    p.alive = Boolean(body.alive)
    p.finished = Boolean(body.finished)
    p.won = Boolean(body.won)
    p.updatedAt = Date.now()
    await saveRoom(room)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'unknown_action' }, { status: 400 })
}
