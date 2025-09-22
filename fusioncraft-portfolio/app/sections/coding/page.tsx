'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function CodingPage() {
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
            <span className="text-gradient">Software</span> Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-primary-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            "Building digital solutions with code"
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg text-primary-300 max-w-3xl mx-auto"
          >
            Where logic meets creativity, where problems become solutions, 
            and where every line of code has purpose. Experience the art 
            of software development through innovative projects and clean code.
          </motion.div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-green-500/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-emerald-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-green-400/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Code Editor Interface Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">Live</span> Code Lab
          </h2>
          
          <div className="glass-effect p-8 rounded-2xl">
            <div className="bg-primary-900 rounded-lg overflow-hidden">
              {/* Editor Header */}
              <div className="bg-primary-800 px-4 py-3 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-primary-300 text-sm ml-4">main.tsx</span>
              </div>
              
              {/* Code Content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-green-400">import</div>
                  <div className="text-blue-400">React</div>
                  <div className="text-green-400">from</div>
                  <div className="text-yellow-400">'react'</div>
                  <div className="text-green-400">;</div>
                  <br />
                  <div className="text-green-400">const</div>
                  <div className="text-blue-400">FusionCraftApp</div>
                  <div className="text-green-400">=</div>
                  <div className="text-blue-400">()</div>
                  <div className="text-green-400">=&gt;</div>
                  <div className="text-blue-400">{'{'}</div>
                  <br />
                  <div className="text-green-400">return</div>
                  <div className="text-blue-400">(</div>
                  <br />
                  <div className="text-blue-400">&lt;</div>
                  <div className="text-yellow-400">div</div>
                  <div className="text-blue-400">&gt;</div>
                  <br />
                  <div className="text-gray-400">Hello, FusionCRAFT World!</div>
                  <br />
                  <div className="text-blue-400">&lt;/</div>
                  <div className="text-yellow-400">div</div>
                  <div className="text-blue-400">&gt;</div>
                  <br />
                  <div className="text-blue-400">)</div>
                  <div className="text-green-400">;</div>
                  <br />
                  <div className="text-blue-400">{'}'}</div>
                  <div className="text-green-400">;</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Showcase Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
            <span className="text-gradient">Featured</span> Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="portal-card p-6"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Portfolio Website</h3>
              <p className="text-primary-200 mb-4">
                This very website built with Next.js, TypeScript, and modern web technologies.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Next.js</span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">TypeScript</span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Tailwind CSS</span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Framer Motion</span>
              </div>
              <div className="text-sm text-primary-400">Status: Complete</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="portal-card p-6"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">AI Art Generator</h3>
              <p className="text-primary-200 mb-4">
                Machine learning-powered art creation tool using Python and TensorFlow.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Python</span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">TensorFlow</span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Flask</span>
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">OpenAI API</span>
              </div>
              <div className="text-sm text-primary-400">Status: In Development</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12">
            <span className="text-gradient">Technical</span> Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-4">Frontend</h3>
              <p className="text-primary-200">
                React, Next.js, TypeScript, Tailwind CSS, 
                Framer Motion, and modern web standards.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-2xl font-bold mb-4">Backend</h3>
              <p className="text-primary-200">
                Node.js, Python, databases, APIs, 
                cloud services, and server architecture.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold mb-4">Tools</h3>
              <p className="text-primary-200">
                Git, Docker, CI/CD, testing frameworks, 
                and development best practices.
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
            Ready to <span className="text-gradient">Code</span> Together?
          </h2>
          <p className="text-xl text-primary-300 mb-8">
            Let's build something amazing, solve complex problems, 
            and create innovative digital solutions.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold rounded-full hover:from-primary-700 hover:to-accent-700 transition-all duration-300"
          >
            Start Coding
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
} 