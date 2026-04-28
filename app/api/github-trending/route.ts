import { NextResponse } from 'next/server'

const CATEGORIES = [
  { topic: 'LLM',             q: 'topic:llm' },
  { topic: 'Computer Vision', q: 'topic:computer-vision' },
  { topic: 'MLOps',           q: 'topic:mlops' },
  { topic: 'Agents',          q: 'topic:ai-agent' },
  { topic: 'Data Tools',      q: 'topic:data-engineering' },
]

async function fetchCategory(topic: string, q: string) {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'miranda-portfolio',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=6`
  const res = await fetch(url, { headers, next: { revalidate: 86400 } })
  if (!res.ok) return []

  const data = await res.json()
  return (data.items ?? []).map((r: {
    name: string
    owner: { login: string }
    language: string | null
    stargazers_count: number
    forks_count: number
    description: string | null
  }) => ({
    repo_name: r.name,
    author: r.owner.login,
    language: r.language ?? 'N/A',
    stars: r.stargazers_count,
    forks: r.forks_count,
    description: r.description ?? '',
    topic,
  }))
}

export async function GET() {
  try {
    const results = await Promise.all(
      CATEGORIES.map(({ topic, q }) => fetchCategory(topic, q))
    )
    return NextResponse.json({ repos: results.flat() })
  } catch {
    return NextResponse.json({ repos: [] })
  }
}
