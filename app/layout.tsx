import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import SessionProviderWrapper from './components/SessionProviderWrapper'
import Navbar from './components/Navbar'

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Miranda Cavalie — AI Engineer',
  description: 'Engineer. I build things end to end and ship them.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Miranda Cavalie — AI Engineer',
    description: 'Engineer. I build things end to end and ship them.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miranda Cavalie — AI Engineer',
    description: 'Engineer. I build things end to end and ship them.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body className="bg-white text-black font-sans antialiased">
        <SessionProviderWrapper>
          <Navbar />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
