import type { Metadata } from 'next'
import { Inter, Quicksand } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-brand',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'RapportNote - 실시간 상담 기록 서비스',
  description: 'AI를 활용한 정확하고 빠른 심리상담 대화 기록',
  keywords: ['심리상담', '음성 기록', 'AI 음성인식', '실시간 녹음'],
  openGraph: {
    title: 'RapportNote',
    description: '실시간 상담 기록 서비스',
    url: 'https://rapportnote.com',
    siteName: 'RapportNote',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${quicksand.variable}`}>{children}</body>
    </html>
  )
}
