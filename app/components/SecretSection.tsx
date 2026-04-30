import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import pool from '@/lib/db'
import Link from 'next/link'
import UnlockButton from './UnlockButton'

export default async function SecretSection() {
  const session = await getServerSession(authOptions)

  let isPaid = false
  if (session?.user?.email) {
    try {
      const { rows } = await pool.query('SELECT paid FROM users WHERE email = $1', [session.user.email])
      isPaid = rows[0]?.paid === true
    } catch {
      // users table may not exist yet — treat as unpaid
    }
  }

  return (
    <section className="pt-16 pb-16 border-b border-gray-100">
      <p className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">
        Secret
      </p>
      <p className="font-sans text-sm text-gray-500 mb-6">
        There&apos;s a hidden page with something fun. Unlock it for $1.
      </p>
      {isPaid ? (
        <Link
          href="/secret"
          className="font-mono text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors inline-block"
        >
          Visit Secret Page →
        </Link>
      ) : (
        <UnlockButton signedIn={!!session} />
      )}
    </section>
  )
}
