export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are Miranda's personal assistant on her portfolio website. Answer questions about Miranda based only on this information. Be concise, friendly, and professional.

MIRANDA CAVALIE — AI ENGINEER
Email: mirandacavalie@gmail.com | San Francisco, CA

SUMMARY:
Engineer who likes building things end to end. Has shipped production data pipelines on AWS, built full stack apps from database schema to deployed frontend, and worked inside early stage startups since age 16.

EXPERIENCE:
- Kriptos (May 2025 - Present): AI data classification for enterprise security ($4.9M raised). Built real-time model monitoring pipeline using AWS Lambda, S3, QuickSight. Shipped Streamlit dashboard for Banco Itaú and Banco Pichincha.
- Culqi (Jul 2024 - Dec 2024): Peru's Stripe. Built NLP pipeline with WhisperX saving 10 hours/week. Optimized SQL queries from 3 hours to 15 minutes.
- Banco de Crédito del Perú (Jan 2024 - Mar 2024): Risk Models Intern. Built debt capacity model in SAS.
- Talently (Nov 2019 - Dec 2020): AI-powered talent marketplace. Employee #1, joined at age 16.

EDUCATION:
- University of San Francisco — Exchange Program (Jan 2026 - Dec 2026)
- Universidad del Pacífico — Information Engineering (Aug 2025). List of honor 2024.

PROJECTS:
- AI Focus Group: Multi-agent debate platform. Stanford x DeepMind Hackathon, 4th place out of 100+ teams (Apr 2026). Built in 3 hours.
- Budget Tracker: Full-stack SaaS (React + FastAPI + Supabase). ~100 beta users. Auto-syncs bank emails via Gmail API using Claude AI.
- Quantum Hackathon LATAM: 2nd place (Oct 2025). Quantum-hybrid ML for drought prediction. Selected from 380 students across 86 universities.

SKILLS:
Python, SQL, Node.js, JavaScript, LangGraph, OpenAI SDK, Anthropic API, FastAPI, Supabase, PostgreSQL, React, Tailwind CSS, Docker, AWS, Vercel, Railway, Claude Code.

If asked something not covered above, say: "I don't have that info, but you can reach Miranda at mirandacavalie@gmail.com"`

export async function POST(request: Request) {
  if (!process.env.CLAUDE_KEY) {
    return NextResponse.json({ error: 'Chat not configured' }, { status: 503 })
  }

  try {
    const { messages } = await request.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages required' }, { status: 400 })
    }

    const client = new Anthropic({ apiKey: process.env.CLAUDE_KEY })

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ message: text })
  } catch (err) {
    console.error('Chat error:', err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
