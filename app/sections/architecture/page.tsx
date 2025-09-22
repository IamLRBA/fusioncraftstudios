'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Architecture3DGallery from '@/sections/Architecture3DGallery'
import BlueprintAnimation from '@/sections/BlueprintAnimation'
import ThreeJSVisualization from '@/components/ThreeJSVisualization'
import VideoSection from '@/sections/VideoSection'
import ArchitectureServices from '@/sections/ArchitectureServices'

export default function ArchitecturePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-primary-900/20 via-primary-900 to-accent-900/20">
      {/* Navigation Back */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-20 left-8 z-50"
      >
        <Link href="/" className="group">
          <div className="flex items-center space-x-2 text-primary-300 hover:text-primary-700 transition-colors duration-300">
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
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="text-center z-20 px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-8xl font-bold mb-6"
          >
            <span className="text-gradient">⾕ ᗩᖇᑕᕼITEᑕTᑌᖇE
            </span>
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
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-primary-400/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* 3D Video Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">Experience</span> ᗩᖇᑕᕼITEᑕTᑌᖇE
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 overflow-hidden">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/assets/images/video-poster.jpg"
              >
                <source src="/assets/videos/3d-architecture-demo.mp4" type="video/mp4" />
                <source src="/assets/videos/3d-architecture-demo.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video Description */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary-950">
                Immersive 3D ᗩᖇᑕᕼITEᑕTᑌᖇᗩL Walkthrough
              </h3>
              <p className="text-primary-200 max-w-3xl mx-auto leading-relaxed">
                Experience our cutting-edge 3D visualization technology that brings architectural 
                concepts to life. This immersive video showcases the seamless transition from 
                blueprint to reality, demonstrating our expertise in creating photorealistic 
                architectural renderings and walkthroughs.
              </p>
            </div>
          </div>
        </motion.div>
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">ᗩᖇᑕᕼI-</span>3D Gallery
          </h2>
          <Architecture3DGallery />
        </motion.div>
      </section>

      {/* Video Gallery Section */}
      <VideoSection />

      {/* Three.js 3D Visualization Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">ᗩᖇᑕᕼI-</span>3D Visualization
          </h2>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <ThreeJSVisualization />
          </div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
            <span className="text-primary-400">ᗪEᔕIGᑎ</span> Philosophy
          </h2>
          
          <div className="space-y-16 flex flex-col items-center">
            {/* Philosophy Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-800/30 to-primary-600/30 rounded-2xl border border-primary-500/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/architecture/philosophy-1.jpg" 
                  alt="Form Follows Function" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-400 mb-4">01</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Form Follows Function</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  Every design decision serves a purpose, creating spaces that are both 
                  beautiful and practical. Functionality is the foundation of great design.
                </p>
              </div>
            </motion.div>
            
            {/* Philosophy Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-600/30 to-primary-400/30 rounded-2xl border border-primary-400/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/architecture/philosophy-2.jpg" 
                  alt="Sustainable Innovation" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-300 mb-4">02</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Sustainable Innovation</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  Building for the future means considering environmental impact and 
                  long-term sustainability. Green design is smart design.
                </p>
              </div>
            </motion.div>
            
            {/* Philosophy Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-400/30 to-primary-200/30 rounded-2xl border border-primary-300/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/architecture/philosophy-3.jpg" 
                  alt="Aesthetic Harmony" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-200 mb-4">03</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Aesthetic Harmony</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  Beauty and functionality coexist, creating spaces that inspire 
                  and elevate human experience. Design that moves the soul.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ⏣ Our Services */}
      <ArchitectureServices />

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
            Ready to <span className="text-primary-400">乃ㄩ丨ㄥᗪ</span> Together?
          </h2>
          <p className="text-xl text-primary-300 mb-8">
            Let's discuss your architecture project and build something amazing.
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