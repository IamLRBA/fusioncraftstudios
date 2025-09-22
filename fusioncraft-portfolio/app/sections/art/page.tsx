'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import InteractiveCanvas from '@/sections/InteractiveCanvas'
import ArtGallery from '@/sections/ArtGallery'
import JerryRigGenerator from '@/sections/JerryRigGenerator'
import { Palette, Wrench, Sparkles } from 'lucide-react'

export default function ArtPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
            <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-primary-800/20 via-primary-900 to-accent-800/20 relative overflow-hidden">
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
      <section className="min-h-screen flex items-center justify-center relative">
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
            <span className="text-gradient">Art</span> & Design
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-primary-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            "Jerry-Rig philosophy in visual expression"
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg text-primary-300 max-w-3xl mx-auto"
          >
            Where creativity knows no bounds, where every stroke tells a story, 
            and where the unexpected becomes beautiful. Experience art that 
            challenges conventions and celebrates the imperfect perfection.
          </motion.div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-orange-500/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-red-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-orange-400/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Interactive Canvas Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">Interactive</span> Canvas
          </h2>
          <InteractiveCanvas />
        </motion.div>
      </section>

      {/* Art Gallery Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">Digital</span> & Physical Art
          </h2>
          <ArtGallery />
        </motion.div>
      </section>

      {/* Jerry-Rig Philosophy Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">Jerry-Rig</span> Philosophy
          </h2>
          <JerryRigGenerator />
        </motion.div>
      </section>

      {/* Creative Process Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12">
            <span className="text-gradient">Creative</span> Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">
                <Palette className="w-12 h-12 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Inspiration</h3>
              <p className="text-primary-200">
                Finding beauty in the mundane, inspiration in the unexpected, 
                and creativity in the constraints of reality.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">
                <Wrench className="w-12 h-12 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Jerry-Rig</h3>
              <p className="text-primary-200">
                Making it work with what we have, embracing imperfections, 
                and finding innovative solutions in limitations.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">
                <Sparkles className="w-12 h-12 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Expression</h3>
              <p className="text-primary-200">
                Every piece tells a story, every creation reflects emotion, 
                and every artwork connects with the human experience.
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
            Ready to <span className="text-gradient">Create</span> Together?
          </h2>
          <p className="text-xl text-primary-300 mb-8">
            Let's bring your artistic vision to life, whether it's digital art, 
            physical installations, or something entirely unexpected.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-full hover:from-primary-700 hover:to-accent-700 transition-all duration-300"
          >
            Start Creating
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
} 