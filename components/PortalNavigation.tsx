'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const portals = [
  {
    id: 1,
    title: "⾕",
    subtitle: "ᗩᖇᑕᕼITEᑕTᑌᖇE",
    image: "/assets/images/sections/portals/architecture.jpg",
    href: "/sections/architecture"
  },
  {
    id: 2,
    title: "𝄞",
    subtitle: "ᗰᑌֆIᑕ & ᑭOETᖇY",
    image: "/assets/images/sections/portals/music.jpg",
    href: "/sections/music"
  },
  {
    id: 3,
    title: "☯",
    subtitle: "ᗩᖇT & ᗪEᔕIGᑎ",
    image: "/assets/images/sections/portals/art.jpg",
    href: "/sections/art"
  },
  {
    id: 4,
    title: "⚛",
    subtitle: "ᔕOᖴTᗯᗩᖇE ᗪEᐯEᒪOᑭᗰEᑎT",
    image: "/assets/images/sections/portals/coding.jpg",
    href: "/sections/coding"
  },
  {
    id: 5,
    title: "✃",
    subtitle: "ᖴᗩᔕᕼIOᑎ",
    image: "/assets/images/sections/portals/fashion.jpg",
    href: "/sections/fashion"
  }
]

export default function PortalNavigation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitioningPortal, setTransitioningPortal] = useState<any>(null)
  const [isPageLoading, setIsPageLoading] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

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

  const handlePortalClick = (e: React.MouseEvent, portal: any) => {
    e.preventDefault()
    setTransitioningPortal(portal)
    setIsTransitioning(true)
    setIsPageLoading(true)
    
    // Start navigation immediately but keep portal visible
    router.push(portal.href)
    
    // Hide portal after a delay to allow page to load
    setTimeout(() => {
      setIsTransitioning(false)
      setIsPageLoading(false)
    }, 3000) // 3 seconds to allow page loading
  }

  return (
    <>
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto"
      >
        {portals.map((portal) => (
          <motion.div
            key={portal.id}
            variants={portalVariants}
            className="group"
            style={{
              scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
            }}
          >
            <div onClick={(e) => handlePortalClick(e, portal)}>
            <div 
              className="
                portal-card h-64 w-64 p-6 flex flex-col justify-center items-center
                cursor-pointer relative overflow-hidden rounded-full
                group-hover:scale-105 transition-all duration-500
                bg-cover bg-center bg-no-repeat
              "
              style={{
                backgroundImage: `url(${portal.image})`
              }}
            >
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
              
              {/* Main Background - No Blur */}
              <div 
                className="absolute inset-0 transition-all duration-500"
                style={{
                  backgroundImage: `url(${portal.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              
              {/* Hover Background - Blurred with Spiral Animation */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin-slow z-10"
                style={{
                  backgroundImage: `url(${portal.image.replace('.jpg', '-hover.jpg')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'blur(0.5px)'
                }}
              />

              {/* Content */}
              <div className="relative z-30 flex flex-col items-center text-center">
                {/* Title */}
                <h3 className={`text-3xl font-bold text-white mb-2 transition-colors duration-300 text-center drop-shadow-lg shadow-2xl ${
                  portal.id === 3 || portal.id === 5 
                    ? 'group-hover:text-gray-900' 
                    : 'group-hover:text-gray-300'
                }`}>
                  {portal.title}
                </h3>

                {/* Subtitle */}
                <h3 className={`text-lg font-bold text-white/90 mb-4 transition-colors duration-300 text-center leading-tight drop-shadow-lg shadow-2xl relative z-30 ${
                  portal.id === 3 || portal.id === 5 
                    ? 'group-hover:text-gray-900' 
                    : 'group-hover:text-gray-300'
                }`}>
                  {portal.subtitle}
                </h3>

                {/* Explore Portal Button - Hidden by default, shown on hover */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className={`btn btn-outline inline-flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300 shadow-2xl ${
                    portal.id === 3 || portal.id === 5 
                      ? 'bg-gray-900/20 border-gray-900/30 text-gray-900 hover:bg-gray-900/30' 
                      : 'bg-gray-300/20 border-gray-300/30 text-gray-300 hover:bg-gray-300/30'
                  }`}>
                    <span className="font-medium">Explore</span>
                    <span className="font-medium">⟹</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Portal Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && transitioningPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, transparent 0%, rgba(0,0,0,0.8) 100%)`
            }}
          >
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ 
                scale: [0.1, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.8, 5],
                opacity: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.8, 0.6, 0.4, 0.2, 0]
              }}
              transition={{ 
                duration: 3,
                times: [0, 0.04, 0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32, 0.36, 0.4, 0.44, 0.48, 0.52, 0.56, 0.6, 0.64, 0.68, 0.72, 0.76, 0.8, 0.84, 0.88, 0.92, 0.96, 1],
                ease: "easeInOut"
              }}
              className="relative w-64 h-64 rounded-full overflow-hidden"
            >
              {/* Spinning Background */}
              <div 
                className="absolute inset-0 animate-spin-slow"
                style={{
                  backgroundImage: `url(${transitioningPortal.image.replace('.jpg', '-hover.jpg')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'blur(1px)'
                }}
              />
              
              {/* Portal Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg shadow-2xl">
                  {transitioningPortal.title}
                </h3>
                <h3 className="text-lg font-bold text-white/90 mb-4 leading-tight drop-shadow-lg shadow-2xl">
                  {transitioningPortal.subtitle}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 