import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FusionCRAFT STUDIOS - Portfolio',
  description: 'Personal portfolio showcasing Architecture, Music, Art, Coding, and Fashion',
  keywords: ['portfolio', 'architecture', 'music', 'art', 'coding', 'fashion', 'fusioncraft'],
  authors: [{ name: 'FusionCRAFT STUDIOS' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
} 