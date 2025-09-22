'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function FashionPage() {
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
            <span className="text-gradient">Fashion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-primary-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            "Styling identity through fabric and form"
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg text-primary-300 max-w-3xl mx-auto"
          >
            Where style meets substance, where every outfit tells a story, 
            and where fashion becomes a form of self-expression. Discover 
            the art of dressing for every occasion and mood.
          </motion.div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-primary-400/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Lookbook Carousel Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">Lookbook</span> Carousel
          </h2>
          
          <div className="glass-effect p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Style Variations
              </h3>
              <p className="text-primary-200">
                See how the same outfit can be styled differently for various occasions
              </p>
            </div>
            
            {/* Placeholder for Lookbook */}
            <div className="bg-gradient-to-br from-primary-800/30 to-accent-800/30 h-96 rounded-xl border border-primary-500/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👗</div>
                <p className="text-primary-300">
                  Placeholder: Lookbook Carousel
                  <br />
                  <span className="text-sm">(Replace with actual lookbook component)</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Style Categories Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">Style</span> Categories
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Classy', icon: '👔', description: 'Elegant and sophisticated' },
              { name: 'Retro', icon: '🕶️', description: 'Vintage and timeless' },
              { name: 'Modern', icon: '🚀', description: 'Contemporary and trendy' },
              { name: 'Streetwear', icon: '🎧', description: 'Urban and casual' }
            ].map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="portal-card p-6 text-center"
              >
                <div className="text-4xl mb-4">{style.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{style.name}</h3>
                <p className="text-primary-200 text-sm">{style.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Moodboard Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">Moodboard</span> Inspiration
          </h2>
          
          <div className="glass-effect p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Visual Inspiration
              </h3>
              <p className="text-primary-200">
                Curated collections that capture different moods and aesthetics
              </p>
            </div>
            
            {/* Placeholder for Moodboard */}
            <div className="bg-gradient-to-br from-primary-800/30 to-accent-800/30 h-64 rounded-xl border border-primary-500/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-primary-300">
                  Placeholder: Moodboard Layout
                  <br />
                  <span className="text-sm">(Replace with actual moodboard component)</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Fashion Philosophy Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12">
            <span className="text-gradient">Fashion</span> Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold mb-4">Self-Expression</h3>
              <p className="text-primary-200">
                Fashion is a language that speaks volumes about who we are 
                and how we want to be perceived.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-2xl font-bold mb-4">Confidence</h3>
              <p className="text-primary-200">
                The right outfit can transform not just your appearance, 
                but your entire mindset and energy.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-4">Individuality</h3>
              <p className="text-primary-200">
                Celebrate your unique style and don't be afraid to 
                break the rules and create your own trends.
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
            Ready to <span className="text-gradient">Style</span> Together?
          </h2>
          <p className="text-xl text-primary-300 mb-8">
            Let's create stunning looks, discover your personal style, 
            and make every outfit a masterpiece.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-full hover:from-primary-700 hover:to-accent-700 transition-all duration-300"
          >
            Start Styling
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
} 