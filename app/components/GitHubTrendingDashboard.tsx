'use client'
import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

interface TrendingRepo {
  repo_name: string
  author: string
  language: string
  stars: number
  forks: number
  description: string
  topic: string
}

const TOPIC_COLORS: Record<string, string> = {
  LLM: '#000000',
  'Computer Vision': '#333333',
  MLOps: '#666666',
  Agents: '#999999',
  'Data Tools': '#cccccc',
}

export default function GitHubTrendingDashboard() {
  const [repos, setRepos] = useState<TrendingRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch('/api/github-trending')
      .then((r) => r.json())
      .then((data) => setRepos(data.repos ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const top10 = [...repos].sort((a, b) => b.stars - a.stars).slice(0, 10)

  const pieData = Object.entries(
    repos.reduce((acc, r) => {
      acc[r.topic] = (acc[r.topic] ?? 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }))

  if (loading || !mounted) {
    return (
      <section className="pt-16 pb-16 border-b border-gray-100">
        <p className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">
          Trending AI/ML on GitHub
        </p>
        <div className="h-72 bg-gray-50 animate-pulse rounded" />
      </section>
    )
  }

  if (repos.length === 0) return null

  return (
    <section className="pt-16 pb-16 border-b border-gray-100">
      <p className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
        Trending AI/ML on GitHub
      </p>
      <p className="font-mono text-xs text-gray-400 mb-10">
        30 repositories · 5 categories · mock dataset
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <p className="font-mono text-xs text-gray-500 mb-4">Top 10 by Stars</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top10} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
              <XAxis
                type="number"
                tick={{ fontSize: 9, fontFamily: 'var(--font-mono)' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="repo_name"
                tick={{ fontSize: 9, fontFamily: 'var(--font-mono)' }}
                width={110}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [typeof value === 'number' ? value.toLocaleString() : String(value), 'Stars']}
                contentStyle={{ fontFamily: 'var(--font-mono)', fontSize: 11, border: '1px solid #e5e5e5' }}
              />
              <Bar dataKey="stars" fill="#000000" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="font-mono text-xs text-gray-500 mb-4">Distribution by Topic</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="42%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={TOPIC_COLORS[entry.name] ?? '#aaaaaa'} />
                ))}
              </Pie>
              <Legend
                iconSize={8}
                formatter={(value) => (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{value}</span>
                )}
              />
              <Tooltip
                formatter={(value) => [value, 'repos']}
                contentStyle={{ fontFamily: 'var(--font-mono)', fontSize: 11, border: '1px solid #e5e5e5' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
