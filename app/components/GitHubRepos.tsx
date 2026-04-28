'use client'
import { useState, useEffect } from 'react'

interface Repo {
  name: string
  description: string | null
  stars: number
  language: string | null
  url: string
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => setRepos(data.repos ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (!loading && repos.length === 0) return null

  return (
    <section className="pt-16 pb-16 border-b border-gray-100">
      <p className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">
        GitHub
      </p>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-50 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#e5e5e5] p-5 flex flex-col gap-2 hover:opacity-75 transition-opacity"
            >
              <h3 className="font-mono font-bold text-sm">{repo.name}</h3>
              {repo.description && (
                <p className="font-sans text-sm text-gray-600 line-clamp-2">{repo.description}</p>
              )}
              <div className="mt-auto pt-2 flex items-center gap-4 font-mono text-xs text-gray-400">
                {repo.language && <span>{repo.language}</span>}
                <span>★ {repo.stars.toLocaleString()}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
