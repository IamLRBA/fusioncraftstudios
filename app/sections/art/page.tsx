'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import InteractiveCanvas from '@/sections/InteractiveCanvas'
import ArtGallery from '@/sections/ArtGallery'
import JerryRigGenerator from '@/sections/JerryRigGenerator'
import ArtServices from '@/sections/ArtServices'
import ArtVideoSection from '@/sections/ArtVideoSection'

export default function ArtPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-primary-900/20 via-primary-900 to-accent-900/20 relative overflow-hidden">
      {/* Navigation Back */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-20 left-8 z-50"
      >
        <Link href="/" className="group">
          <div className="flex items-center space-x-2 text-primary-300 hover:text-primary-900 transition-colors duration-300">
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              ⟸
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
            className="text-8xl md:text-8xl font-bold mb-6"
          >
            <span className="text-gradient">☯ ᗩᖇᖶ</span> & Design
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
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-primary-400/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">IᑎTEᖇᗩᑕTIᐯE</span> Canvas
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">𝙳𝚒𝚐𝚒𝚝𝚊𝚕</span> & Physical ᗩᖇᖶ
          </h2>
          <ArtGallery />
        </motion.div>
      </section>

      {/* Art Video Gallery Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">ᗩᖇᖶ</span> Video Gallery
          </h2>
          <ArtVideoSection />
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">נєяяу-яιg</span> Philosophy
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
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
            <span className="text-primary-400">ᑕᖇEᗩTIᐯE

</span> Philosophy
          </h2>
          
          <div className="space-y-16 flex flex-col items-center">
            {/* Process Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-800/30 to-primary-600/30 rounded-2xl border border-primary-500/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/art/process-1.jpg" 
                  alt="Inspiration" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-400 mb-4">01</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Inspiration</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  Finding beauty in the mundane, inspiration in the unexpected, 
                  and creativity in the constraints of reality. Every moment is art.
                </p>
              </div>
            </motion.div>
            
            {/* Process Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-600/30 to-primary-400/30 rounded-2xl border border-primary-400/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/art/process-2.jpg" 
                  alt="Jerry-Rig" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-300 mb-4">02</div>
                <h3 className="text-3xl font-bold mb-2 text-white">נєяяу-яιg</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  Making it work with what we have, embracing imperfections, 
                  and finding innovative solutions in limitations. Creativity thrives in constraints.
                </p>
              </div>
            </motion.div>
            
            {/* Process Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-400/30 to-primary-200/30 rounded-2xl border border-primary-300/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/art/process-3.jpg" 
                  alt="Expression" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-200 mb-4">03</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Expression</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  Every piece tells a story, every creation reflects emotion, 
                  and every artwork connects with the human experience.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ⏣ Our Services */}
      <ArtServices />

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to <span className="text-primary-400">𝖢𝗋౿ɑ𝗍౿</span> Together?
          </h2>
          <p className="text-xl text-primary-300 mb-8">
            Let's discuss your art and design project and create something amazing.
          </p>
          <Link href="/#contact-section">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline text-lg px-8 py-4"
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
} 