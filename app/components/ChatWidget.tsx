'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const GREETING = "Hi! I'm Miranda's AI assistant. Ask me anything about her experience, projects, or skills 👋"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [messages, open])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message ?? 'Sorry, something went wrong.' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-80 border border-gray-200 bg-white shadow-xl rounded-lg overflow-hidden flex flex-col"
          style={{ height: '420px' }}
        >
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <span className="font-mono text-xs font-bold">Miranda&apos;s AI Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors leading-none text-lg"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="bg-gray-50 rounded p-3 text-xs font-mono text-gray-700 leading-relaxed">
              {GREETING}
            </div>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded p-3 text-xs font-mono leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-50 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 rounded p-3 text-xs font-mono text-gray-400">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-gray-100 p-3 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Ask about Miranda..."
              className="flex-1 text-xs font-mono border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-black text-white rounded px-3 py-2 text-xs font-mono hover:bg-gray-800 disabled:opacity-40 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <span className="text-lg">{open ? '×' : '💬'}</span>
      </button>
    </div>
  )
}
