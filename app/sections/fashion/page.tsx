'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Pause, Play } from 'lucide-react'
import FashionVideoSection from '@/sections/FashionVideoSection'
import FashionServices from '@/sections/FashionServices'

export default function FashionPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Lookbook Carousel state
  const [currentLookIndex, setCurrentLookIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Style Categories state
  const [expandedStyle, setExpandedStyle] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Moodboard state
  const [selectedMood, setSelectedMood] = useState('inspiration')
  const [moodboardImages, setMoodboardImages] = useState<Array<{icon: string, name: string, image: string}>>([])

  const looks = [
    {
      title: 'Casual Elegance',
      description: 'Perfect blend of comfort and style',
      materials: ['Denim', 'Cotton', 'Linen'],
      icon: 'shirt'
    },
    {
      title: 'Business Professional',
      description: 'Sharp and sophisticated office attire',
      materials: ['Wool', 'Silk', 'Cotton'],
      icon: 'briefcase'
    },
    {
      title: 'Urban Street',
      description: 'Edgy and contemporary street style',
      materials: ['Leather', 'Denim', 'Mesh'],
      icon: 'headphones'
    },
    {
      title: 'Retro Classic',
      description: 'Timeless vintage-inspired looks',
      materials: ['Tweed', 'Velvet', 'Lace'],
      icon: 'eye'
    }
  ]
  
  // Style categories with expanded data
  const styleCategories = [
    { 
      name: 'Classy', 
      icon: 'briefcase', 
      description: 'Elegant and sophisticated',
      coverImage: '👔',
      images: ['👔', '👗', '👠', '💼', '🎩', '🧥', '👛', '👜'],
      styles: ['Business Formal', 'Evening Wear', 'Cocktail Attire', 'Professional Look', 'Luxury Casual', 'Executive Style', 'Boardroom Ready', 'Gala Glamour']
    },
    { 
      name: 'Retro', 
      icon: 'eye', 
      description: 'Vintage and timeless',
      coverImage: '🕶️',
      images: ['🕶️', '👗', '👒', '🧥', '👠', '👔', '👜', '💍'],
      styles: ['1950s Classic', '1960s Mod', '1970s Bohemian', '1980s Power', '1990s Minimalist', 'Art Deco', 'Victorian Elegance', 'Roaring Twenties']
    },
    { 
      name: 'Modern', 
      icon: 'zap', 
      description: 'Contemporary and trendy',
      coverImage: '🚀',
      images: ['🚀', '👕', '👖', '👟', '👜', '🧢', '👓', '⌚'],
      styles: ['Modern Minimalist', 'Tech Wear', 'Athleisure', 'Street Fashion', 'Sustainable Style', 'Smart Casual', 'Urban Professional', 'Digital Nomad']
    },
    { 
      name: 'Streetwear', 
      icon: 'headphones', 
      description: 'Urban and casual',
      coverImage: '🎧',
      images: ['🎧', '👕', '👖', '👟', '🧢', '👜', '⌚', '💎'],
      styles: ['Urban Casual', 'Skate Style', 'Hip Hop Fashion', 'Street Luxe', 'Tech Street', 'Graffiti Inspired', 'Underground', 'City Vibes']
    }
  ]
  
  // Moodboard data
  const moodboardData = {
    inspiration: [
      { icon: '🎨', name: 'Art', image: '/assets/images/fashion/inspiration/art.jpg' },
      { icon: '✨', name: 'Sparkle', image: '/assets/images/fashion/inspiration/sparkle.jpg' },
      { icon: '🌟', name: 'Star', image: '/assets/images/fashion/inspiration/star.jpg' },
      { icon: '💫', name: 'Dizzy', image: '/assets/images/fashion/inspiration/dizzy.jpg' },
      { icon: '🔮', name: 'Crystal Ball', image: '/assets/images/fashion/inspiration/crystal-ball.jpg' },
      { icon: '🌈', name: 'Rainbow', image: '/assets/images/fashion/inspiration/rainbow.jpg' },
      { icon: '🎭', name: 'Theater', image: '/assets/images/fashion/inspiration/theatre.jpg' },
      { icon: '🎪', name: 'Circus', image: '/assets/images/fashion/inspiration/circus.jpg' }
    ],
    elegance: [
      { icon: '👑', name: 'Crown', image: '/assets/images/fashion/elegance/crown.jpg' },
      { icon: '💎', name: 'Gem', image: '/assets/images/fashion/elegance/gem.jpg' },
      { icon: '🕊️', name: 'Dove', image: '/assets/images/fashion/elegance/dove.jpg' },
      { icon: '🌹', name: 'Rose', image: '/assets/images/fashion/elegance/rose.jpg' },
      { icon: '🦢', name: 'Swan', image: '/assets/images/fashion/elegance/swan.jpg' },
      { icon: '💍', name: 'Ring', image: '/assets/images/fashion/elegance/ring.jpg' },
      { icon: '👗', name: 'Dress', image: '/assets/images/fashion/elegance/dress.jpg' },
      { icon: '👠', name: 'High Heel', image: '/assets/images/fashion/elegance/high-heel.jpg' }
    ],
    urban: [
      { icon: '🏙️', name: 'City', image: '/assets/images/fashion/urban/city.jpg' },
      { icon: '🚗', name: 'Car', image: '/assets/images/fashion/urban/car.jpg' },
      { icon: '🎵', name: 'Music', image: '/assets/images/fashion/urban/music.jpg' },
      { icon: '🎧', name: 'Headphones', image: '/assets/images/fashion/urban/headphones.jpg' },
      { icon: '🛹', name: 'Skateboard', image: '/assets/images/fashion/urban/skateboard.jpg' },
      { icon: '🎨', name: 'Art', image: '/assets/images/fashion/urban/art.jpg' },
      { icon: '💡', name: 'Light Bulb', image: '/assets/images/fashion/urban/light-bulb.jpg' },
      { icon: '⚡', name: 'Lightning', image: '/assets/images/fashion/urban/lightning.jpg' }
    ],
    nature: [
      { icon: '🌿', name: 'Herb', image: '/assets/images/fashion/nature/herb.jpg' },
      { icon: '🌸', name: 'Cherry Blossom', image: '/assets/images/fashion/nature/cherry-blossom.jpg' },
      { icon: '🌺', name: 'Hibiscus', image: '/assets/images/fashion/nature/hibiscus.jpg' },
      { icon: '🍃', name: 'Leaf', image: '/assets/images/fashion/nature/leaf.jpg' },
      { icon: '🌊', name: 'Wave', image: '/assets/images/fashion/nature/wave.jpg' },
      { icon: '🌅', name: 'Sunrise', image: '/assets/images/fashion/nature/sunrise.jpg' },
      { icon: '🌙', name: 'Moon', image: '/assets/images/fashion/nature/moon.jpg' },
      { icon: '⭐', name: 'Star', image: '/assets/images/fashion/nature/star.jpg' }
    ]
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentLookIndex((prev) => (prev + 1) % 4)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Functions for style categories
  const toggleStyleExpansion = (styleName: string) => {
    if (expandedStyle === styleName) {
      setExpandedStyle(null)
      setCurrentImageIndex(0)
    } else {
      setExpandedStyle(styleName)
      setCurrentImageIndex(0)
    }
  }

  const nextImage = () => {
    const currentStyle = styleCategories.find(style => style.name === expandedStyle)
    if (currentStyle) {
      setCurrentImageIndex((prev) => (prev + 1) % currentStyle.images.length)
    }
  }

  const prevImage = () => {
    const currentStyle = styleCategories.find(style => style.name === expandedStyle)
    if (currentStyle) {
      setCurrentImageIndex((prev) => (prev - 1 + currentStyle.images.length) % currentStyle.images.length)
    }
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const changeMood = (mood: string) => {
    setSelectedMood(mood)
    setMoodboardImages(moodboardData[mood as keyof typeof moodboardData])
  }

  useEffect(() => {
    setMoodboardImages(moodboardData.inspiration)
  }, [])

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
            <span className="text-gradient">✃ ᖴᗩᔕᕼIOᑎ</span>
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">Lookbook</span> 𝒸𝒶𝓇ℴ𝓊𝓈ℯ𝓁

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
            
            {/* Lookbook Component */}
            <div className="relative">
              {/* Lookbook Navigation */}
              <div className="flex justify-center space-x-4 mb-6">
                {['Casual', 'Formal', 'Streetwear', 'Vintage'].map((category, index) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary-600/20 text-primary-300 hover:bg-primary-600/30 border border-primary-500/30 rounded-full transition-all duration-300"
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              
              {/* Lookbook Carousel */}
              <div className="bg-gradient-to-br from-primary-800/30 to-accent-800/30 h-96 rounded-xl border border-primary-500/30 overflow-hidden relative">
                {/* Auto-play Toggle */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isAutoPlaying 
                        ? 'bg-accent-600 hover:bg-accent-700' 
                        : 'bg-primary-600 hover:bg-primary-700'
                    } text-white`}
                    title={isAutoPlaying ? 'Pause' : 'Play'}
                  >
                    {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </motion.button>
                </div>

                {/* Carousel Container */}
                <div className="relative h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentLookIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {currentLookIndex === 0 && (
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">
                            <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-2">Casual Elegance</h4>
                          <p className="text-primary-200 mb-4">Perfect blend of comfort and style</p>
                          <div className="flex justify-center space-x-2">
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Denim</span>
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Cotton</span>
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Linen</span>
                          </div>
                        </div>
                      )}
                      
                      {currentLookIndex === 1 && (
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">
                            <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-2">Business Professional</h4>
                          <p className="text-primary-200 mb-4">Sharp and sophisticated office attire</p>
                          <div className="flex justify-center space-x-2">
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Wool</span>
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Silk</span>
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Cotton</span>
                          </div>
                        </div>
                      )}
                      
                      {currentLookIndex === 2 && (
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">
                            <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-2">Streetwear Edge</h4>
                          <p className="text-primary-200 mb-4">Urban style with attitude</p>
                          <div className="flex justify-center space-x-2">
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Leather</span>
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Denim</span>
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Canvas</span>
                          </div>
                        </div>
                      )}
                      
                      {currentLookIndex === 3 && (
                        <div className="text-center p-8">
                          <div className="text-6xl mb-4">
                            <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-2">Vintage Charm</h4>
                          <p className="text-primary-200 mb-4">Timeless elegance with retro flair</p>
                          <div className="flex justify-center space-x-2">
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Velvet</span>
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Silk</span>
                            <span className="bg-primary-500/30 text-primary-200 px-3 py-1 rounded-full text-sm">Lace</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentLookIndex(prev => prev > 0 ? prev - 1 : 3)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300 z-10"
                >
                  <span className="text-2xl">⟸</span>
                </button>
                
                <button
                  onClick={() => setCurrentLookIndex(prev => prev < 3 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300 z-10"
                >
                  <span className="text-2xl">⟹</span>
                </button>
                
                {/* Interactive Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentLookIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentLookIndex === index 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">𝖲𝗍ɣᥣ౿</span> Categories
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {styleCategories.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="portal-card p-6 text-center cursor-pointer group"
                onClick={() => toggleStyleExpansion(style.name)}
              >
                {/* Cover Image */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {style.coverImage}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white">{style.name}</h3>
                <p className="text-primary-200 text-sm mb-4">{style.description}</p>
                
                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedStyle === style.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {/* Image Carousel */}
                      <div className="relative mb-4">
                        <div className="relative h-32 bg-primary-800/30 rounded-lg overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentImageIndex}
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <img src={style.images[currentImageIndex]} alt={style.name} className="w-full h-full object-cover" />
                            </motion.div>
                          </AnimatePresence>
                          
                          {/* Navigation Arrows */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              prevImage()
                            }}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary-600/80 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors duration-300"
                          >
                            ⟸
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              nextImage()
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-primary-600/80 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors duration-300"
                          >
                            ⟹
                          </button>
                        </div>
                        
                        {/* Carousel Dots */}
                        <div className="flex justify-center mt-2 space-x-1">
                          {style.images.map((_, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={(e) => {
                                e.stopPropagation()
                                goToImage(imgIndex)
                              }}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                imgIndex === currentImageIndex 
                                  ? 'bg-primary-400 w-4' 
                                  : 'bg-primary-500/50'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Style Tags */}
                      <div className="grid grid-cols-2 gap-1 mb-4">
                        {style.styles.slice(0, 6).map((styleName, styleIndex) => (
                          <div key={styleIndex} className="text-xs text-primary-200 bg-primary-600/20 px-2 py-1 rounded hover:bg-primary-600/30 transition-colors duration-300">
                            {styleName}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="text-xs text-primary-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {expandedStyle === style.name ? 'Click to collapse' : 'Click to explore styles'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Fashion Video Gallery Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">ᖴᗩᔕᕼIOᑎ</span> Video Gallery
          </h2>
          <FashionVideoSection />
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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-400">ᗰOOᗪᗷOᗩᖇᗪ

            </span> Inspiration
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
            
            {/* Interactive Moodboard */}
            <div className="space-y-6">
              {/* Mood Selector */}
              <div className="flex justify-center space-x-4">
                {Object.keys(moodboardData).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => changeMood(mood)}
                    className={`btn transition-all duration-300 capitalize ${
                      selectedMood === mood
                        ? 'btn-primary'
                        : 'btn-outline'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
              
              {/* Moodboard Grid */}
              <div className="grid grid-cols-4 gap-4">
                {moodboardImages.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="aspect-square bg-gradient-to-br from-primary-700/30 to-accent-700/30 rounded-xl border border-primary-500/30 flex items-center justify-center cursor-pointer group hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-lg group-hover:scale-125 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback Placeholder */}
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{display: 'none'}}
                    >
                      <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                        {item.icon}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Mood Description */}
              <div className="text-center">
                <p className="text-primary-300 text-sm">
                  {selectedMood === 'inspiration' && 'Creative sparks and artistic vision'}
                  {selectedMood === 'elegance' && 'Sophisticated luxury and refined beauty'}
                  {selectedMood === 'urban' && 'City vibes and contemporary culture'}
                  {selectedMood === 'nature' && 'Organic elements and natural harmony'}
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
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
            <span className="text-primary-400">ᖴᗩᔕᕼIOᑎ</span> Philosophy
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
                  src="/assets/images/sections/fashion/philosophy-1.jpg" 
                  alt="Self-Expression" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-400 mb-4">01</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Self-Expression</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  Fashion is a language that speaks volumes about who we are 
                  and how we want to be perceived. Every outfit tells a story.
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
                  src="/assets/images/sections/fashion/philosophy-2.jpg" 
                  alt="Confidence" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-300 mb-4">02</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Confidence</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  The right outfit can transform not just your appearance, 
                  but your entire mindset and energy. Confidence is the best accessory.
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
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-400/30 to-primary-200/30 rounded-2xl border border-primary-200/30 overflow-hidden shadow-2xl p-8">
                <img 
                  src="/assets/images/sections/fashion/philosophy-3.jpg" 
                  alt="Individuality" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="text-6xl font-bold text-primary-200 mb-4">03</div>
                <h3 className="text-3xl font-bold mb-2 text-white">Individuality</h3>
                <p className="text-primary-200 text-lg max-w-md">
                  Celebrate your unique style and don't be afraid to 
                  break the rules and create your own trends. Be authentically you.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ⏣ Our Services */}
      <FashionServices />

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
            Ready to <span className="text-primary-400">ડ𝗍ɣᥣ౿
            </span> Together?
          </h2>
          <p className="text-xl text-primary-300 mb-8">
            Let's discuss your fashion project and create something amazing.
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