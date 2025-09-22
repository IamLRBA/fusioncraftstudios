'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Play, Pause, Eye, Palette } from 'lucide-react'

const artWorks = [
  {
    id: 1,
    title: 'Digital Dreams',
    category: 'Digital Art',
    description: 'A futuristic cityscape created entirely in digital space',
    image: '/assets/images/digital-art-1.jpg', 
    tags: ['Digital', 'Futuristic', 'Cityscape']
  },
  {
    id: 2,
    title: 'Organic Forms',
    category: 'Physical Art',
    description: 'Sculpture exploring the relationship between nature and geometry',
    image: '/assets/images/physical-art-1.jpg', 
    tags: ['Sculpture', 'Organic', 'Geometry']
  },
  {
    id: 3,
    title: 'Abstract Emotions',
    category: 'Digital Art',
    description: 'Colorful abstraction representing human emotions and feelings',
    image: '/assets/images/digital-art-2.jpg',
    tags: ['Abstract', 'Emotions', 'Color']
  },
  {
    id: 4,
    title: 'Mixed Media',
    category: 'Physical Art',
    description: 'Combination of traditional and modern materials',
    image: '/assets/images/physical-art-2.jpg', 
    tags: ['Mixed Media', 'Traditional', 'Modern']
  },
  {
    id: 5,
    title: 'Pixel Poetry',
    category: 'Digital Art',
    description: 'Minimalist digital composition exploring space and form',
    image: '/assets/images/digital-art-3.jpg', 
    tags: ['Minimalist', 'Space', 'Form']
  },
  {
    id: 6,
    title: 'Textured Reality',
    category: 'Physical Art',
    description: 'Three-dimensional exploration of texture and material',
    image: '/assets/images/physical-art-3.jpg', 
    tags: ['Texture', '3D', 'Material']
  }
]

export default function ArtGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedArt, setSelectedArt] = useState<typeof artWorks[0] | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % artWorks.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, artWorks.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % artWorks.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + artWorks.length) % artWorks.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const expandArt = (art: typeof artWorks[0]) => {
    setSelectedArt(art)
    setIsExpanded(true)
  }

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass-effect p-8 rounded-2xl max-w-6xl mx-auto"
      >
        <h3 className="text-3xl font-bold mb-6">
          <span className="text-gradient">Digital</span> & Physical Art
        </h3>
        <p className="text-primary-200 mb-8">
          Explore our collection of digital and physical artworks, each telling a unique story 
          and showcasing the diverse range of creative expression.
        </p>
        
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-800 to-primary-400 border border-primary-800">
          {/* Auto-play Toggle */}
          <div className="absolute top-4 right-4 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isAutoPlaying 
                  ? 'bg-black/50 hover:bg-black/70' 
                  : 'bg-black/50 hover:bg-black/70'
              } text-white`}
              title={isAutoPlaying ? 'Pause' : 'Play'}
            >
              {isAutoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </motion.button>
          </div>

          {/* Carousel Slides */}
          <div className="relative h-96 md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center p-8">
                  {/* Artwork Display */}
                  <div className="mb-6">
                    <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-2xl border border-primary-400 relative overflow-hidden group cursor-pointer"
                         onClick={() => expandArt(artWorks[currentIndex])}>
                      <img
                        src={artWorks[currentIndex].image || `/assets/images/art-gallery/${artWorks[currentIndex].id}.jpg`}
                        alt={artWorks[currentIndex].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Fallback Placeholder */}
                      <div 
                        className="h-full bg-gradient-to-br from-primary-800 to-primary-400 flex items-center justify-center"
                        style={{display: 'none'}}
                      >
                        <div className="text-center">
                          <div className="text-8xl md:text-9xl mb-4">
                            <Palette className="w-32 h-32 text-primary-400" />
                          </div>
                          <p className="text-primary-300 text-lg">
                            {artWorks[currentIndex].title}
                          </p>
                          <p className="text-primary-400 text-sm">
                            {artWorks[currentIndex].category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Artwork Info */}
                  <div className="max-w-md mx-auto">
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {artWorks[currentIndex].title}
                    </h4>
                    <p className="text-primary-200 mb-4">
                      {artWorks[currentIndex].description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {artWorks[currentIndex].tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-primary-400 text-primary-950 px-3 py-1 rounded-full text-sm border border-primary-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <span className="text-2xl">⟸</span>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <span className="text-2xl">⟹</span>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {artWorks.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-primary-900 to-primary-400'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="mt-12">
          <h4 className="text-2xl font-bold mb-6 text-white">All Artworks</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {artWorks.map((art, index) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-primary-800/50 rounded-xl p-4 cursor-pointer group border border-primary-700/30"
                onClick={() => expandArt(art)}
              >
                <div className="bg-gradient-to-br from-primary-800 to-primary-400 w-full h-32 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={art.image || `/assets/images/art-gallery/${art.id}-thumb.jpg`}
                    alt={art.title}
                    className="w-full h-full object-cover rounded-lg"
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
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        <Palette className="w-10 h-10 text-primary-400" />
                      </div>
                      <p className="text-primary-300 text-sm">{art.category}</p>
                    </div>
                  </div>
                </div>
                <h5 className="text-white font-semibold mb-2">{art.title}</h5>
                <p className="text-primary-300 text-xs">{art.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Expanded Artwork Modal */}
      <AnimatePresence>
        {isExpanded && selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-primary-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedArt.title}</h2>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-primary-300 hover:text-white text-2xl hover:rotate-90 transition-all duration-300"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Artwork Image */}
                <div className="h-80 rounded-xl border border-primary-400 overflow-hidden">
                  <img
                    src={selectedArt.image || `/assets/images/art-gallery/${selectedArt.id}-large.jpg`}
                    alt={selectedArt.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Placeholder */}
                  <div 
                    className="h-full bg-gradient-to-br from-primary-800 to-primary-400 flex items-center justify-center"
                    style={{display: 'none'}}
                  >
                    <div className="text-center">
                      <div className="text-8xl mb-4">
                        <Palette className="w-32 h-32 text-primary-400" />
                      </div>
                      <p className="text-primary-300">
                        {selectedArt.title} - {selectedArt.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Artwork Details */}
                <div>
                  <div className="mb-4">
                    <span className="bg-primary-700 text-primary-950 px-3 py-1 rounded-full text-sm">
                      {selectedArt.category}
                    </span>
                  </div>
                  
                  <p className="text-primary-200 mb-6 text-lg">
                    {selectedArt.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedArt.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-primary-750 text-primary-950 px-3 py-1 rounded-full text-sm border border-primary-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white mb-3">About This Piece</h4>
                    <p className="text-primary-200 text-sm">
                      This artwork represents the fusion of creativity and technical skill, 
                      showcasing the diverse range of artistic expression possible through 
                      both digital and physical mediums.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 