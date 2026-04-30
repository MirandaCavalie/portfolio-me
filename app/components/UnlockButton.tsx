'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function UnlockButton({ signedIn }: { signedIn: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!signedIn) {
      signIn()
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error ?? 'Something went wrong')
        setLoading(false)
      }
    } catch {
      alert('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="font-mono text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
    >
      {loading ? 'Redirecting…' : signedIn ? 'Unlock Secret Page ($1)' : 'Sign in to unlock'}
    </button>
  )
}
