'use client'

import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform 
} from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import PortalNavigation from '../components/PortalNavigation'
import AboutUs from '../components/AboutUs'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPortals, setShowPortals] = useState(true)
  
  // Scroll-based effects
  const heroRef = useRef<HTMLElement>(null)
  const portalsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const { scrollYProgress: portalsScrollY } = useScroll({
    target: portalsRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress: testimonialsScrollY } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"]
  })

  const heroScale = useTransform(heroScrollY, [0, 1], [1, 0.8])
  const heroOpacity = useTransform(heroScrollY, [0, 0.5], [1, 0])
  const heroY = useTransform(heroScrollY, [0, 1], [0, -100])
  
  const portalsScale = useTransform(portalsScrollY, [0, 0.5, 1], [1, 1.1, 1])
  const testimonialsScale = useTransform(testimonialsScrollY, [0, 0.5, 1], [1, 1.05, 1])

  useEffect(() => {
    // Check if this is the first visit
    if (typeof window !== 'undefined') {
      const hasVisited = localStorage.getItem('fusioncraft-visited')
      
      if (!hasVisited) {
        // First time visitor - show loading animation
        setIsLoading(true)
        localStorage.setItem('fusioncraft-visited', 'true')
        
        const timer = setTimeout(() => {
          setIsLoading(false)
          setTimeout(() => setShowPortals(true), 1000)
        }, 3000)

        return () => clearTimeout(timer)
      } else {
        // Returning visitor - skip loading animation
        setIsLoading(false)
        setShowPortals(true)
      }
    } else {
      // Server-side rendering - don't show loading
      setIsLoading(false)
      setShowPortals(true)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 relative overflow-hidden">
        {/* Loading Screen - Only for first time visitors */}
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
              transition={{ duration: 0.8 }}
            >
              {/* Progress Bar */}
              <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 z-50 origin-left"
                style={{ scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
              />

              {/* Hero Section */}
              <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-200/30 to-accent-400/30 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary-300/30 to-primary-500/30 rounded-full blur-3xl"
                  />
                  
                  {/* Enhanced Particle System */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{
                          x: [0, 1200, 0],
                          y: [0, 800, 0],
                          opacity: [0, 0.6, 0],
                          scale: [0, 1, 0],
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 8 + (i * 0.2),
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                        className="absolute w-2 h-2 bg-accent-400/60 rounded-full"
                        style={{
                          left: `${(i * 5) % 100}%`,
                          top: `${(i * 7) % 100}%`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Geometric Shapes */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 30, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-primary-500/20 transform rotate-30"
                  />
                  
                  <motion.div
                    animate={{ 
                      rotate: [360, 0],
                      scale: [1.2, 1, 1.2]
                    }}
                    transition={{ 
                      duration: 35, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute bottom-1/4 right-1/4 w-20 h-20 border-2 border-accent-500/20 transform -rotate-45"
                  />
                </div>

                <div className="relative z-10 text-center">
                  <motion.div 
                    className="container-custom"
                    style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mb-8"
                    >
                      <h1 className="text-8xl md:text-8xl font-bold mb-6">
                        <span className="text-primary-800">Fusion</span>
                        <span className="text-accent-600">ᑕᖇᗩᖴT</span>
                      </h1>
                      <h1 className="text-7xl md:text-7xl font-bold mb-6">
                        <span className="text-primary-800">ᔕTᑌᗪIOᔕ</span>
                      </h1>
                      <p className="text-2xl md:text-3xl text-primary-700 mb-6 max-w-4xl mx-auto leading-relaxed">
                        Materializing ideas through structural ingenuity
                      </p>
                      <p className="text-lg text-primary-600 max-w-2xl mx-auto">
                        Where creativity meets craftsmanship across five dimensions of human expression
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                      <button 
                        onClick={() => scrollToSection('portals-section')}
                        className="btn btn-primary text-lg px-8 py-4"
                      >
                        E᙭ᑭᒪOᖇE Oᑌᖇ ᗯOᖇK
                      </button>
                      <button 
                        onClick={() => scrollToSection('contact-section')}
                        className="btn btn-secondary text-lg px-8 py-4"
                      >
                        GET Iᑎ TOᑌᑕᕼ
                      </button>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1 h-3 bg-primary-600 rounded-full mt-2"
                    />
                  </motion.div>
                </motion.div>
              </section>

              {/* About Us Section */}
              <AboutUs />

              {/* Portals Section */}
              <section ref={portalsRef} id="portals-section" className="section">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="section-title"
                  >
                    <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
                    E᙭ᑭᒪOᖇE <span className="text-accent-600">the Portals</span>
                    </h2>
                    <p className="text-xl text-primary-700 max-w-3xl mx-auto">
                      Each portal represents a dimension of creative expression, waiting to be discovered
                    </p>
                  </motion.div>

                  <AnimatePresence>
                    {showPortals && (
                      <motion.div
                        style={{ scale: portalsScale }}
                        transition={{ duration: 0.3 }}
                      >
                        <PortalNavigation />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* Stats Section */}
              <Stats />

              {/* Testimonials Section */}
              <motion.div
                ref={testimonialsRef}
                style={{ scale: testimonialsScale }}
                transition={{ duration: 0.3 }}
              >
                <Testimonials />
              </motion.div>

              {/* Contact Section */}
              <div id="contact-section">
                <Contact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
} 