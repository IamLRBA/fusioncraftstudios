'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [fragments, setFragments] = useState<Array<{ id: number; x: number; y: number; rotation: number }>>([])

  useEffect(() => {
    // Generate random fragments for the logo
    const fragmentCount = 12
    const newFragments = Array.from({ length: fragmentCount }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      rotation: Math.random() * 360
    }))
    setFragments(newFragments)

    // Trigger completion after animation
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-primary-900 flex items-center justify-center z-50"
    >
      <div className="relative">
        {/* Logo Fragments */}
        {fragments.map((fragment) => (
          <motion.div
            key={fragment.id}
            initial={{ 
              x: fragment.x, 
              y: fragment.y, 
              rotate: fragment.rotation,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: 0, 
              y: 0, 
              rotate: 0,
              opacity: 1,
              scale: 1
            }}
            transition={{ 
              duration: 2, 
              delay: fragment.id * 0.1,
              ease: "easeOut"
            }}
            className="absolute inset-0 w-8 h-8 bg-accent-500 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-16px',
              marginTop: '-16px'
            }}
          />
        ))}

        {/* Assembled Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-gradient">Fusion</span>
            <span className="text-white">CRAFT</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="text-xl text-primary-300"
          >
            STUDIOS
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="mt-8 h-1 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full"
        />
      </div>
    </motion.div>
  )
} 