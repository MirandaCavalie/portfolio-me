import { NextResponse } from 'next/server'

const MOCK_REPOS = [
  {
    name: 'budget-tracker',
    description: 'Full-stack SaaS (React + FastAPI + Supabase). Auto-syncs bank emails via Gmail API, uses Claude AI to extract transactions.',
    stars: 12,
    language: 'TypeScript',
    url: 'https://github.com/mirandacavalie',
  },
  {
    name: 'ai-focus-group',
    description: 'Multi-agent debate platform built at Stanford × DeepMind Hackathon using Gemini and LangGraph. 4th place out of 100+ teams.',
    stars: 8,
    language: 'Python',
    url: 'https://github.com/mirandacavalie',
  },
  {
    name: 'quantum-drought-prediction',
    description: 'Quantum-hybrid ML for drought prediction using variational quantum neural networks and PennyLane. 2nd place LATAM.',
    stars: 5,
    language: 'Python',
    url: 'https://github.com/mirandacavalie',
  },
  {
    name: 'nlp-call-analysis',
    description: 'NLP pipeline with WhisperX for telemarketing call analysis. Saved 10 hours/week at Culqi.',
    stars: 3,
    language: 'Python',
    url: 'https://github.com/mirandacavalie',
  },
]

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'miranda-portfolio',
    }
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }

    const res = await fetch(
      'https://api.github.com/users/mirandacavalie/repos?sort=stars&per_page=5&type=public',
      { headers, next: { revalidate: 3600 } }
    )

    if (!res.ok) throw new Error('GitHub API error')

    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ repos: MOCK_REPOS, mock: true })
    }

    const repos = data.slice(0, 5).map((r: { name: string; description: string | null; stargazers_count: number; language: string | null; html_url: string }) => ({
      name: r.name,
      description: r.description,
      stars: r.stargazers_count,
      language: r.language,
      url: r.html_url,
    }))

    return NextResponse.json({ repos })
  } catch {
    return NextResponse.json({ repos: MOCK_REPOS, mock: true })
  }
}
