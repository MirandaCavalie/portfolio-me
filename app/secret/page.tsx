import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import pool from '@/lib/db'
import Link from 'next/link'

export default async function SecretPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/')

  let isPaid = false
  try {
    const { rows } = await pool.query('SELECT paid FROM users WHERE email = $1', [session.user.email])
    isPaid = rows[0]?.paid === true
  } catch {
    // users table may not exist yet
  }

  if (!isPaid) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-24 text-center">
        <p className="font-mono text-sm text-gray-500 mb-6">
          You need to pay to access this page.
        </p>
        <Link href="/" className="font-mono text-sm underline hover:text-gray-600 transition-colors">
          Back home
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 pt-24 pb-24 text-center">
      <h1 className="font-mono font-bold text-3xl mb-8">You unlocked this!</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://cataas.com/cat/gif"
        alt="Secret cat GIF"
        className="mx-auto rounded max-w-sm w-full"
      />
      <p className="font-mono text-xs text-gray-400 mt-8">
        This page is for paying supporters only.
      </p>
    </main>
  )
}
