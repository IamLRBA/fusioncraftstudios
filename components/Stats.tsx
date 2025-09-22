'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Users, 
  Award, 
  Clock, 
  Star,
  TrendingUp,
  Heart,
  Zap,
  Target,
  Building2,
  Palette,
  Music,
  Code,
  Shirt
} from 'lucide-react'

const statsData = [
  {
    icon: Users,
    number: 500,
    suffix: "+",
    label: "Happy Clients",
    description: "Satisfied customers worldwide",
    color: "from-primary-400 to-primary-600"
  },
  {
    icon: Award,
    number: 150,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful creative ventures",
    color: "from-accent-400 to-accent-600"
  },
  {
    icon: Clock,
    number: 5,
    suffix: "+",
    label: "Years Experience",
    description: "Industry expertise & innovation",
    color: "from-primary-500 to-primary-700"
  },
  {
    icon: Star,
    number: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Exceeding expectations",
    color: "from-accent-500 to-accent-700"
  }
 ]

// Company logos data - you can replace these with actual company logos
const companyLogos = [
  { name: "TechCorp", icon: Building2, color: "from-primary-400 to-primary-600" },
  { name: "CreativeStudio", icon: Palette, color: "from-accent-400 to-accent-600" },
  { name: "MusicPro", icon: Music, color: "from-primary-500 to-primary-700" },
  { name: "CodeCraft", icon: Code, color: "from-accent-500 to-accent-700" },
  { name: "FashionHub", icon: Shirt, color: "from-primary-400 to-primary-600" },
  { name: "DesignLab", icon: Palette, color: "from-accent-400 to-accent-600" },
  { name: "InnovateTech", icon: Building2, color: "from-primary-500 to-primary-700" },
  { name: "CreativeFlow", icon: Music, color: "from-accent-500 to-accent-700" }
]

// AnimatedCounter Component
const AnimatedCounter = ({ target, suffix = "", duration = 2000, triggerAnimation = false }: { target: number, suffix?: string, duration?: number, triggerAnimation?: boolean }) => {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number | null>(null)

  const animateCount = (startValue: number, endValue: number, onComplete?: () => void) => {
    const startTime = Date.now()
    const totalChange = endValue - startValue
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (totalChange * easeOutQuart))
      
      setCount(currentCount)
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setCount(endValue)
        setIsAnimating(false)
        if (onComplete) onComplete()
      }
    }
    
    setIsAnimating(true)
    animate()
  }

  const startAnimationCycle = () => {
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    // Start the animation cycle: 0 -> target -> 0 -> target
    animateCount(0, target, () => {
      // After reaching target, animate back to 0
      setTimeout(() => {
        animateCount(target, 0, () => {
          // After reaching 0, start the cycle again
          setTimeout(() => {
            startAnimationCycle()
          }, 500) // Wait 500ms before starting next cycle
        })
      }, 1000) // Wait 1 second at target before going back to 0
    })
  }

  useEffect(() => {
    // Start the animation cycle when component mounts
    startAnimationCycle()

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [target])

  // Effect to respond to scroll triggers
  useEffect(() => {
    if (triggerAnimation) {
      // Clear current animation and restart cycle
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setCount(0)
      startAnimationCycle()
    }
  }, [triggerAnimation])

  return (
    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  )
}

// StatCard Component
const StatCard = ({ stat, index }: { stat: any, index: number }) => {
  const [isInView, setIsInView] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current)
      
      // Trigger animation if there's significant scroll movement
      if (scrollDelta > 10 && isInView) {
        setShouldAnimate(prev => !prev) // Toggle to trigger re-animation
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="relative group"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-accent-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
             {/* Main Card */}
       <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-white/20">
         {/* Icon Container */}
         <motion.div
           initial={{ scale: 0, rotate: -180 }}
           animate={isInView ? { scale: 1, rotate: 0 } : {}}
           transition={{ 
             duration: 0.6, 
             delay: index * 0.1 + 0.2,
             type: "spring",
             stiffness: 200
           }}
           className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
         >
           <stat.icon className="w-6 h-6 text-white" />
         </motion.div>

                   {/* Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1 + 0.4,
              type: "spring",
              stiffness: 100
            }}
            className="text-center mb-3"
          >
            <AnimatedCounter 
              target={stat.number} 
              suffix={stat.suffix} 
              triggerAnimation={shouldAnimate}
            />
          </motion.div>

         {/* Label */}
         <motion.h3
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ 
             duration: 0.6, 
             delay: index * 0.1 + 0.6,
             type: "spring",
             stiffness: 100
           }}
           className="text-lg font-bold text-primary-800 text-center mb-2"
         >
           {stat.label}
         </motion.h3>

         {/* Description */}
         <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ 
             duration: 0.6, 
             delay: index * 0.1 + 0.8,
             type: "spring",
             stiffness: 100
           }}
           className="text-primary-600 text-center text-xs leading-relaxed"
         >
           {stat.description}
         </motion.p>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50]
              } : {}}
              transition={{ 
                duration: 2,
                delay: index * 0.1 + 1 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Logo Slider Component
const LogoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % companyLogos.length)
    }, 3000) // Change logo every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="mt-12"
    >
      
      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {companyLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0.3,
                  y: index === currentIndex ? 0 : 10,
                  scale: index === currentIndex ? 1 : 0.8
                }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className={`flex flex-col items-center space-y-2 transition-all duration-300 ${
                  index === currentIndex ? 'transform scale-110' : ''
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${logo.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <logo.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-medium text-primary-700 text-center">
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {companyLogos.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 scale-125' 
                  : 'bg-primary-300'
              }`}
              animate={{
                scale: index === currentIndex ? 1.25 : 1,
                opacity: index === currentIndex ? 1 : 0.5
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Main Stats Component
export default function Stats() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

  return (
    <section ref={containerRef} className="section relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100"
      >
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-primary-100/20 to-accent-100/20 rounded-full blur-3xl animate-pulse delay-500" />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ y: titleY, scale: titleScale }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <TrendingUp className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
          Oᑌᖇ <span className="text-accent-600">IᗰᑭᗩᑕT</span> Iᑎ ᑎᑌᗰᗷEᖇᔕ
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
            Discover the impressive statistics that showcase our commitment to excellence, 
            innovation, and client satisfaction across all our creative endeavors.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

                 {/* Bottom Decorative Element */}
         <motion.div
           initial={{ opacity: 0, scale: 0 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 100 }}
           className="text-center mt-16"
         >
           <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-white/20">
             <Heart className="w-6 h-6 text-primary-600 animate-pulse" />
             <span className="text-primary-800 font-semibold">
               Trusted by creative professionals worldwide
             </span>
             <Target className="w-6 h-6 text-accent-600 animate-pulse delay-1000" />
           </div>
         </motion.div>

         {/* Logo Slider */}
         <LogoSlider />
      </div>
    </section>
  )
}
