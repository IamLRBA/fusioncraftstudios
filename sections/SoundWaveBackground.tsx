'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SoundWaveBackgroundProps {
  isPlaying: boolean
}

export default function SoundWaveBackground({ isPlaying }: SoundWaveBackgroundProps) {
  const [waves, setWaves] = useState<Array<{ id: number; height: number; delay: number }>>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set dimensions on client side
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // Generate random wave properties
    const waveCount = 20
    const newWaves = Array.from({ length: waveCount }, (_, i) => ({
      id: i,
      height: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 2
    }))
    setWaves(newWaves)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Background Waves */}
      <div className="absolute inset-0 flex items-end justify-between px-4 pb-20">
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            animate={{
              scaleY: isPlaying 
                ? [wave.height, wave.height * 1.5, wave.height]
                : wave.height
            }}
            transition={{
              duration: 1.5,
              repeat: isPlaying ? Infinity : 0,
              delay: wave.delay,
              ease: "easeInOut"
            }}
            className="w-1 bg-gradient-to-t from-primary-500/20 to-accent-500/20 rounded-full"
            style={{ height: `${wave.height * 100}px` }}
          />
        ))}
      </div>

      {/* Floating Musical Notes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: 0
            }}
            animate={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute text-2xl text-primary-400/30"
          >
            {['♪', '♫', '♬', '♩', '♭', '♮', '♯', '𝄞'][i % 8]}
          </motion.div>
        ))}
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: 0
            }}
            animate={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full"
          />
        ))}
      </div>

      {/* Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: isPlaying ? [1, 1.5, 1] : 1,
              opacity: isPlaying ? [0.3, 0, 0.3] : 0.1
            }}
            transition={{
              duration: 3,
              repeat: isPlaying ? Infinity : 0,
              delay: i * 1,
              ease: "easeInOut"
            }}
            className="absolute w-96 h-96 border border-purple-500/10 rounded-full"
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/20 to-primary-900/40" />
    </div>
  )
} 