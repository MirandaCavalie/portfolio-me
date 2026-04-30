export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { trendingData } from '@/lib/trending-data'

export async function GET() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS guestbook (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS github_trending_ai (
        id SERIAL PRIMARY KEY,
        repo_name VARCHAR(200) NOT NULL,
        author VARCHAR(100) NOT NULL,
        language VARCHAR(50),
        stars INTEGER,
        forks INTEGER,
        description TEXT,
        topic VARCHAR(50)
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        email VARCHAR(255) PRIMARY KEY,
        name VARCHAR(100),
        paid BOOLEAN DEFAULT FALSE,
        paid_at TIMESTAMPTZ
      )
    `)

    const { rows } = await client.query('SELECT COUNT(*) FROM github_trending_ai')
    if (parseInt(rows[0].count) === 0) {
      for (const repo of trendingData) {
        await client.query(
          `INSERT INTO github_trending_ai (repo_name, author, language, stars, forks, description, topic)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [repo.repo_name, repo.author, repo.language, repo.stars, repo.forks, repo.description, repo.topic]
        )
      }
    }

    return NextResponse.json({ ok: true, message: 'Database setup complete' })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  } finally {
    client.release()
  }
}
