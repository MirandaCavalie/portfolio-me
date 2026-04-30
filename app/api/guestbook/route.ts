export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import pool from '@/lib/db'

export async function GET() {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, message, created_at FROM guestbook ORDER BY created_at DESC LIMIT 10'
    )
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Sign in to leave a message' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim().slice(0, 100)
    const message = String(body.message ?? '').trim().slice(0, 500)

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    const { rows } = await pool.query(
      'INSERT INTO guestbook (name, message) VALUES ($1, $2) RETURNING *',
      [name, message]
    )
    return NextResponse.json(rows[0])
  } catch {
    return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 })
  }
}
