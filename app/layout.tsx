import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { NotificationProvider } from '../components/NotificationSystem'
import KeyboardShortcuts from '../components/KeyboardShortcuts'
import ThemeProvider from '../components/ThemeProvider'

export const metadata: Metadata = {
  title: 'FusionCRAFT STUDIOS - Materializing ideas through structural ingenuity',
  description: 'A creative studio that brings together architecture, music, art, technology, and fashion to create innovative solutions and beautiful experiences.',
  keywords: 'architecture, music, art, design, software development, fashion, creative studio, innovation, craftsmanship',
  authors: [{ name: 'LRBA', url: 'https://fusioncraftstudios.com' }],
  creator: 'FusionCRAFT STUDIOS',
  publisher: 'FusionCRAFT STUDIOS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fusioncraftstudios.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FusionCRAFT STUDIOS - Materializing ideas through structural ingenuity',
    description: 'A creative studio that brings together architecture, music, art, technology, and fashion to create innovative solutions and beautiful experiences.',
    url: 'https://fusioncraftstudios.com',
    siteName: 'FusionCRAFT STUDIOS',
    images: [
      {
        url: '/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FusionCRAFT STUDIOS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FusionCRAFT STUDIOS - Materializing ideas through structural ingenuity',
    description: 'A creative studio that brings together architecture, music, art, technology, and fashion to create innovative solutions and beautiful experiences.',
    images: ['/assets/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏗️</text></svg>" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏗️</text></svg>" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <NotificationProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
            <BackToTop />
            <KeyboardShortcuts />
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 