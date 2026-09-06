import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Frank_Ruhl_Libre, Heebo } from 'next/font/google'
import './globals.css'

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-frank-ruhl',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'לוֹטוּס · מטפחות סאטן יוקרתיות',
  description:
    'בוטיק יוקרה למטפחות ראש וכיסויי שיער לנשים. מטפחות סאטן חלקות שלא מחליקות, במידה 1×1 מ׳, בגוונים רכים ואלגנטיים.',
  generator: 'v0.app',
  verification: {
    google: 'NZpXKNzVFn3ytf2MAU6MHuLcmxJSDjHX-S_mQMTEaiQ',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5efe6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`light ${frankRuhl.variable} ${heebo.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
