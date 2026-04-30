import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import pool from '@/lib/db'
import Link from 'next/link'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id
  if (!sessionId) redirect('/')

  let verified = false
  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
    if (stripeSession.payment_status === 'paid' && stripeSession.metadata?.email) {
      await pool.query(
        `INSERT INTO users (email, paid, paid_at)
         VALUES ($1, TRUE, NOW())
         ON CONFLICT (email) DO UPDATE SET paid = TRUE, paid_at = NOW()`,
        [stripeSession.metadata.email]
      )
      verified = true
    }
  } catch {
    // stripe or db error — verified stays false
  }

  if (!verified) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-24 text-center">
        <p className="font-mono text-sm text-gray-500 mb-6">Payment could not be verified.</p>
        <Link href="/" className="font-mono text-sm underline hover:text-gray-600 transition-colors">
          Back home
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 pt-24 text-center">
      <h1 className="font-mono font-bold text-2xl mb-4">Payment confirmed!</h1>
      <p className="font-sans text-sm text-gray-600 mb-8">
        You now have access to the secret page.
      </p>
      <Link
        href="/secret"
        className="font-mono text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors inline-block"
      >
        Go to Secret Page →
      </Link>
    </main>
  )
}
