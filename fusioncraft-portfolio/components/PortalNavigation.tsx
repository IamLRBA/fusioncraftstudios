'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const portals = [
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'Designing realities that belong to tomorrow',
    icon: '🏗️',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    hoverEffect: 'wireframe',
    path: '/sections/architecture'
  },
  {
    id: 'music',
    title: 'Music & Poetry',
    description: 'Harmonizing words and melodies',
    icon: '🎵',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    hoverEffect: 'soundwave',
    path: '/sections/music'
  },
  {
    id: 'art',
    title: 'Art & Design',
    description: 'Jerry-Rig philosophy in visual expression',
    icon: '🎨',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    hoverEffect: 'brush',
    path: '/sections/art'
  },
  {
    id: 'coding',
    title: 'Software Development',
    description: 'Building digital solutions with code',
    icon: '💻',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    hoverEffect: 'matrix',
    path: '/sections/coding'
  },
  {
    id: 'fashion',
    title: 'Fashion',
    description: 'Styling identity through fabric and form',
    icon: '👗',
    color: 'from-rose-500/20 to-fuchsia-500/20',
    borderColor: 'border-rose-500/30',
    hoverEffect: 'cloth',
    path: '/sections/fashion'
  }
]

export default function PortalNavigation() {
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const portalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className="min-h-screen py-20 px-4 relative">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Explore</span> the Portals
          </h2>
          <p className="text-xl text-primary-300 max-w-3xl mx-auto">
            Each portal represents a dimension of creative expression. 
            Click to dive deeper into the world of FusionCRAFT STUDIOS.
          </p>
        </motion.div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {portals.map((portal, index) => (
            <motion.div
              key={portal.id}
              variants={portalVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredPortal(portal.id)}
              onHoverEnd={() => setHoveredPortal(null)}
              className="group"
            >
              <Link href={portal.path}>
                <div className={`
                  portal-card h-80 p-8 flex flex-col justify-between
                  bg-gradient-to-br ${portal.color}
                  border ${portal.borderColor}
                  cursor-pointer
                `}>
                  {/* Portal Icon */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {portal.icon}
                  </div>

                  {/* Portal Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-white">
                      {portal.title}
                    </h3>
                    <p className="text-primary-200 leading-relaxed">
                      {portal.description}
                    </p>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {/* Wireframe Effect for Architecture */}
                    {portal.hoverEffect === 'wireframe' && hoveredPortal === portal.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                      >
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                            d="M20,20 L80,20 L80,80 L20,80 Z M20,20 L80,80 M80,20 L20,80"
                            stroke="#3b82f6"
                            strokeWidth="0.5"
                            fill="none"
                            className="animate-pulse"
                          />
                        </svg>
                      </motion.div>
                    )}

                    {/* Soundwave Effect for Music */}
                    {portal.hoverEffect === 'soundwave' && hoveredPortal === portal.id && (
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-1">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scaleY: 0.3 }}
                            animate={{ scaleY: [0.3, 1, 0.3] }}
                            transition={{ 
                              duration: 0.6, 
                              repeat: Infinity, 
                              delay: i * 0.1 
                            }}
                            className="w-1 bg-purple-400 rounded-full"
                            style={{ height: `${20 + Math.random() * 30}px` }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Brush Effect for Art */}
                    {portal.hoverEffect === 'brush' && hoveredPortal === portal.id && (
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute top-1/2 w-16 h-1 bg-orange-400 rounded-full opacity-60"
                        style={{ transform: 'translateY(-50%) rotate(-45deg)' }}
                      />
                    )}

                    {/* Matrix Effect for Coding */}
                    {portal.hoverEffect === 'matrix' && hoveredPortal === portal.id && (
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ y: '-100vh' }}
                            animate={{ y: '100vh' }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: i * 0.1 
                            }}
                            className="absolute text-green-400 text-xs font-mono opacity-60"
                            style={{ 
                              left: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          >
                            {Math.random().toString(16).substring(2, 4)}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Cloth Effect for Fashion */}
                    {portal.hoverEffect === 'cloth' && hoveredPortal === portal.id && (
                      <motion.div
                        initial={{ scale: 1, rotate: 0 }}
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-br from-rose-400/10 to-fuchsia-400/10"
                      />
                    )}
                  </div>

                  {/* Portal Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-center mt-16"
        >
          <div className="text-primary-400 text-sm mb-2">Scroll to explore more</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6 mx-auto border-2 border-primary-400 border-t-transparent rounded-full animate-spin"
          />
        </motion.div>
      </motion.div>
    </section>
  )
} 