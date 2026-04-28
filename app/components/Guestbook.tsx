'use client'
import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

interface GuestbookEntry {
  id: number
  name: string
  message: string
  created_at: string
}

export default function Guestbook() {
  const { data: session } = useSession()
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/guestbook')
      const data = await res.json()
      if (Array.isArray(data)) setEntries(data)
    } catch {
      // silently ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  useEffect(() => {
    if (session?.user?.name && !name) {
      setName(session.user.name)
    }
  }, [session, name])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })
      if (!res.ok) throw new Error()
      setMessage('')
      await fetchEntries()
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="pt-16 pb-16 border-b border-gray-100">
      <p className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">
        Guestbook
      </p>

      {session ? (
        <form onSubmit={handleSubmit} className="mb-10 space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-gray-400 transition-colors"
          />
          <textarea
            placeholder="Leave a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            required
            rows={3}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-gray-400 transition-colors resize-none"
          />
          {error && <p className="text-xs font-mono text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={submitting || !name.trim() || !message.trim()}
            className="font-mono text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Sign guestbook'}
          </button>
        </form>
      ) : (
        <div className="mb-10 p-4 border border-gray-100 rounded">
          <p className="text-sm font-mono text-gray-500">
            <button
              onClick={() => signIn('google')}
              className="underline hover:text-black transition-colors"
            >
              Sign in with Google
            </button>{' '}
            to leave a message.
          </p>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-50 animate-pulse rounded" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <p className="text-sm font-mono text-gray-400">No entries yet. Be the first to sign!</p>
      ) : (
        <div className="space-y-5">
          {entries.map((entry) => (
            <div key={entry.id} className="border-b border-gray-100 pb-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-mono text-sm font-bold">{entry.name}</span>
                <span className="font-mono text-xs text-gray-400">
                  {new Date(entry.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="font-sans text-sm text-gray-700">{entry.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
