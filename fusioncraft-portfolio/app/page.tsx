'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from '../components/LoadingScreen'
import PortalNavigation from '../components/PortalNavigation'
import Background3D from '../components/Background3D'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showPortals, setShowPortals] = useState(false)

  useEffect(() => {
    // Simulate loading time for the logo assembly animation
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Show portals after loading animation completes
      setTimeout(() => setShowPortals(true), 1000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      {/* 3D Background */}
      <Background3D />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center z-20"
              >
                <motion.h1
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-6xl md:text-8xl font-bold mb-6"
                >
                  <span className="text-gradient">Fusion</span>
                  <span className="text-white">ᑕᖇᗩᖴT</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-xl md:text-2xl text-primary-300 mb-8 max-w-2xl mx-auto"
                >
                  Where creativity meets craftsmanship across five dimensions of human expression
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                  className="text-sm text-primary-400"
                >
                  Scroll to explore the portals
                </motion.div>
              </motion.div>
            </section>

            {/* Portal Navigation */}
            <AnimatePresence>
              {showPortals && (
                <PortalNavigation />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
} 