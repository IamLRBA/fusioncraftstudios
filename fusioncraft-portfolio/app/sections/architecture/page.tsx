'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Architecture3DGallery from '@/sections/Architecture3DGallery'
import BlueprintAnimation from '@/sections/BlueprintAnimation'

export default function ArchitecturePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
            <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-primary-800/20 via-primary-900 to-accent-800/20">
      {/* Navigation Back */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link href="/" className="group">
          <div className="flex items-center space-x-2 text-primary-300 hover:text-white transition-colors duration-300">
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              ←
            </motion.div>
            <span className="text-sm font-medium">Back to Portals</span>
          </div>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="text-center z-20 px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="text-gradient">Architecture</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-primary-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            "Designing realities that belong to tomorrow"
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg text-primary-300 max-w-3xl mx-auto"
          >
            Where imagination meets structural integrity, creating spaces that inspire, 
            function, and stand the test of time. Every blueprint is a story, 
            every structure a testament to human ingenuity.
          </motion.div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-cyan-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-blue-400/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Blueprint Animation Section */}
      <section className="py-20 px-4">
        <BlueprintAnimation />
      </section>

      {/* 3D Gallery Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">3D</span> Gallery
          </h2>
          <Architecture3DGallery />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12">
            <span className="text-gradient">Design</span> Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold mb-4">Form Follows Function</h3>
              <p className="text-primary-200">
                Every design decision serves a purpose, creating spaces that are both 
                beautiful and practical.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-4">Sustainable Innovation</h3>
              <p className="text-primary-200">
                Building for the future means considering environmental impact and 
                long-term sustainability.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-4">Aesthetic Harmony</h3>
              <p className="text-primary-200">
                Beauty and functionality coexist, creating spaces that inspire 
                and elevate human experience.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Ready to <span className="text-gradient">Build</span> Something Amazing?
          </h2>
          <p className="text-xl text-primary-300 mb-8">
            Let's collaborate to bring your architectural vision to life.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-full hover:from-primary-700 hover:to-accent-700 transition-all duration-300"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
} 