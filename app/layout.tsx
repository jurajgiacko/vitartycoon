import type { Metadata, Viewport } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import './globals.css'

const pixel = Press_Start_2P({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-pixel',
  display: 'swap',
})

const body = VT323({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VITAR GROUP TYCOON — Cesta k 10 miliardám',
  description:
    'Rok v křesle šéfa VITAR Group. 12 měsíců, 12 rozhodnutí. Dotáhneš firmu na 10 miliard?',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6f9fd8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className={`${pixel.variable} ${body.variable}`}>
        <div className="sky">
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
        </div>
        <div className="skyline" />
        {children}
      </body>
    </html>
  )
}
