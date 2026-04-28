'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-end">
        {status === 'loading' ? (
          <div className="h-7 w-28 bg-gray-100 animate-pulse rounded" />
        ) : session ? (
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name ?? ''}
                width={26}
                height={26}
                className="rounded-full"
              />
            )}
            <span className="font-mono text-xs text-gray-600">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="font-mono text-xs text-gray-500 hover:text-black transition-colors"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  )
}
