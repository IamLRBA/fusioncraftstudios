'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function BlueprintAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedImageAlt, setSelectedImageAlt] = useState<string>('')
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const phases = [
    {
      number: "01",
      title: "Blueprint Foundation",
      image: "/assets/images/blueprints/phase1-blueprint.jpg",
      fallback: "📐",
      description: "Initial architectural blueprints and structural planning"
    },
    {
      number: "02", 
      title: "Rendering",
      image: "/assets/images/blueprints/phase2-framework.jpg",
      fallback: "🏗️",
      description: "Building framework and structural elements taking shape graphically"
    },
    {
      number: "03",
      title: "Exterior Development", 
      image: "/assets/images/blueprints/phase3-exterior.jpg",
      fallback: "🏢",
      description: "Exterior walls, windows, and facade completion"
    },
    {
      number: "04",
      title: "Final Reality",
      image: "/assets/images/blueprints/phase4-reality.jpg", 
      fallback: "✨",
      description: "Complete building with interior finishes and landscaping"
    }
  ]

  // Handle image click to open fullscreen
  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    console.log('=== FULLSCREEN DEBUG ===')
    console.log('Opening fullscreen for:', imageSrc)
    console.log('Image Alt:', imageAlt)
    console.log('Current selectedImage state:', selectedImage)
    console.log('Current selectedImageAlt state:', selectedImageAlt)
    
    setSelectedImage(imageSrc)
    setSelectedImageAlt(imageAlt)
    
    console.log('State updated - selectedImage:', imageSrc)
    console.log('State updated - selectedImageAlt:', imageAlt)
    console.log('=== END DEBUG ===')
  }

  // Handle closing fullscreen modal
  const handleCloseModal = () => {
    console.log('Closing fullscreen modal') // Debug log
    setSelectedImage(null)
    setSelectedImageAlt('')
  }

  // Debug effect to track modal state changes
  useEffect(() => {
    if (selectedImage) {
      console.log('=== MODAL STATE CHANGED ===')
      console.log('Modal selectedImage:', selectedImage)
      console.log('Modal selectedImageAlt:', selectedImageAlt)
      console.log('=== END MODAL STATE DEBUG ===')
    }
  }, [selectedImage, selectedImageAlt])

  // Debug effect to log image paths on mount
  useEffect(() => {
    console.log('=== IMAGE PATHS DEBUG ===')
    phases.forEach((phase, index) => {
      console.log(`Phase ${index + 1}:`, phase.image)
    })
    console.log('=== END IMAGE PATHS DEBUG ===')
  }, [])

  // Equal scroll distribution for all 4 phases
  // Phase 1: [0.0, 0.15, 0.25, 0.35] - fade in, stay visible, fade out
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0])
  const phase1X = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [100, 0, 0, -100])
  
  // Phase 2: [0.35, 0.45, 0.55, 0.65] - fade in, stay visible, fade out
  const phase2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0])
  const phase2X = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [100, 0, 0, -100])
  
  // Phase 3: [0.65, 0.75, 0.85, 0.95] - fade in, stay visible, fade out
  const phase3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [0, 1, 1, 0])
  const phase3X = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.95], [100, 0, 0, -100])
  
  // Phase 4: [0.95, 1.05, 1.15, 1.25] - fade in, stay visible, fade out
  const phase4Opacity = useTransform(scrollYProgress, [0.95, 1.1, 1.2, 1.25], [0, 1, 1, 0])
  const phase4X = useTransform(scrollYProgress, [0.95, 1.1, 1.2, 1.25], [100, 0, 0, -100])

  // Progress indicator based on current phase
  const progressIndicator = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.95, 1.25], [0, 1, 2, 3, 4])

  // Create reactive progress indicators for each phase
  const isPhase1 = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const isPhase2 = useTransform(scrollYProgress, [0.35, 0.65], [0, 1])
  const isPhase3 = useTransform(scrollYProgress, [0.65, 0.95], [0, 1])
  const isPhase4 = useTransform(scrollYProgress, [0.95, 1.25], [0, 1])

  // Create pointer-events transforms
  const phase1PointerEvents = useTransform(isPhase1, [0, 1], ['none', 'auto'])
  const phase2PointerEvents = useTransform(isPhase2, [0, 1], ['none', 'auto'])
  const phase3PointerEvents = useTransform(isPhase3, [0, 1], ['none', 'auto'])
  const phase4PointerEvents = useTransform(isPhase4, [0, 1], ['none', 'auto'])

  // Content fade-in animations for each phase
  const phase1ContentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [0, 1, 1])
  const phase1ContentY = useTransform(scrollYProgress, [0, 0.2, 0.25], [20, 0, 0])
  
  const phase2ContentOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.55], [0, 1, 1])
  const phase2ContentY = useTransform(scrollYProgress, [0.35, 0.5, 0.55], [20, 0, 0])
  
  const phase3ContentOpacity = useTransform(scrollYProgress, [0.65, 0.8, 0.85], [0, 1, 1])
  const phase3ContentY = useTransform(scrollYProgress, [0.65, 0.8, 0.85], [20, 0, 0])
  
  // Phase 4 content animations - very quick, almost instant animation
  const phase4ContentOpacity = useTransform(scrollYProgress, [0.95, 0.96, 0.97], [0, 1, 1])
  const phase4ContentY = useTransform(scrollYProgress, [0.95, 0.96, 0.97], [20, 0, 0])

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Main Title - Fixed at top */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-bold text-center mb-16 pt-16"
      >
        <span className="text-primary-400">Blueprint</span> to ᖇEᗩᒪITY

      </motion.h2>

      {/* Pinned Container for Phase Transitions */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-screen flex items-center justify-center">
          {/* Phase 1 */}
          <motion.div
            style={{ 
              opacity: phase1Opacity, 
              x: phase1X,
              pointerEvents: phase1PointerEvents
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-800/30 to-primary-600/30 rounded-2xl border border-primary-500/30 overflow-hidden shadow-2xl">
                <img 
                  src={phases[0].image}
                  alt={phases[0].title}
                  className="w-auto h-auto max-w-md max-h-96 object-contain rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleImageClick(phases[0].image, phases[0].title)}
                  onError={(e) => {
                    console.log('Image failed to load:', phases[0].image) // Debug log
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="text-center text-primary-400 p-8 cursor-pointer hover:scale-105 transition-transform duration-300" 
                  style={{display: 'none'}}
                  onClick={() => handleImageClick(phases[0].image, phases[0].title)}
                >
                  <div className="text-8xl mb-4">{phases[0].fallback}</div>
                  <div className="text-lg">Phase 1 Image</div>
                  <div className="text-sm text-primary-300 mt-2">Click to view fullscreen</div>
                </div>
              </div>
              <motion.div 
                className="flex flex-col text-center md:text-left"
                style={{ opacity: phase1ContentOpacity, y: phase1ContentY }}
              >
                <div className="text-6xl font-bold text-primary-400 mb-4">
                  {phases[0].number}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">
                  {phases[0].title}
                </h3>
                <p className="text-primary-200 text-lg max-w-md">
                  {phases[0].description}
                </p>
              </motion.div>
            </div>
            
            {/* Progress Line with Dots - Phase 1 */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                <div className="w-32 h-0.5 bg-primary-400"></div>
                {phases.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-primary-400 scale-125' : 'bg-primary-300/30'
                    }`}
                  />
                ))}
                <div className="w-32 h-0.5 bg-primary-300/30"></div>
              </div>
            </div>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            style={{ 
              opacity: phase2Opacity, 
              x: phase2X,
              pointerEvents: phase2PointerEvents
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-600/30 to-primary-400/30 rounded-2xl border border-primary-400/30 overflow-hidden shadow-2xl">
                <img 
                  src={phases[1].image}
                  alt={phases[1].title}
                  className="w-auto h-auto max-w-md max-h-96 object-contain rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleImageClick(phases[1].image, phases[1].title)}
                  onError={(e) => {
                    console.log('Image failed to load:', phases[1].image) // Debug log
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="text-center text-primary-300 p-8 cursor-pointer hover:scale-105 transition-transform duration-300" 
                  style={{display: 'none'}}
                  onClick={() => handleImageClick(phases[1].image, phases[1].title)}
                >
                  <div className="text-8xl mb-4">{phases[1].fallback}</div>
                  <div className="text-lg">Phase 2 Image</div>
                  <div className="text-sm text-primary-300 mt-2">Click to view fullscreen</div>
                </div>
              </div>
              <motion.div 
                className="flex flex-col text-center md:text-left"
                style={{ opacity: phase2ContentOpacity, y: phase2ContentY }}
              >
                <div className="text-6xl font-bold text-primary-300 mb-4">
                  {phases[1].number}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">
                  {phases[1].title}
                </h3>
                <p className="text-primary-200 text-lg max-w-md">
                  {phases[1].description}
                </p>
              </motion.div>
            </div>
            
            {/* Progress Line with Dots - Phase 2 */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                <div className="w-32 h-0.5 bg-primary-400"></div>
                {phases.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index <= 1 ? 'bg-primary-400 scale-125' : 'bg-primary-300/30'
                    }`}
                  />
                ))}
                <div className="w-32 h-0.5 bg-primary-300/30"></div>
              </div>
            </div>
          </motion.div>

          {/* Phase 3 */}
          <motion.div
            style={{ 
              opacity: phase3Opacity, 
              x: phase3X,
              pointerEvents: phase3PointerEvents
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-400/30 to-primary-200/30 rounded-2xl border border-primary-300/30 overflow-hidden shadow-2xl">
                <img 
                  src={phases[2].image}
                  alt={phases[2].title}
                  className="w-auto h-auto max-w-md max-h-96 object-contain rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleImageClick(phases[2].image, phases[2].title)}
                  onError={(e) => {
                    console.log('Image failed to load:', phases[2].image) // Debug log
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="text-center text-primary-200 p-8 cursor-pointer hover:scale-105 transition-transform duration-300" 
                  style={{display: 'none'}}
                  onClick={() => handleImageClick(phases[2].image, phases[2].title)}
                >
                  <div className="text-8xl mb-4">{phases[2].fallback}</div>
                  <div className="text-lg">Phase 3 Image</div>
                  <div className="text-sm text-primary-300 mt-2">Click to view fullscreen</div>
                </div>
              </div>
              <motion.div 
                className="flex flex-col text-center md:text-left"
                style={{ opacity: phase3ContentOpacity, y: phase3ContentY }}
              >
                <div className="text-6xl font-bold text-primary-200 mb-4">
                  {phases[2].number}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">
                  {phases[2].title}
                </h3>
                <p className="text-primary-200 text-lg max-w-md">
                  {phases[2].description}
                </p>
              </motion.div>
            </div>
            
            {/* Progress Line with Dots - Phase 3 */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                <div className="w-32 h-0.5 bg-primary-400"></div>
                {phases.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index <= 2 ? 'bg-primary-400 scale-125' : 'bg-primary-300/30'
                    }`}
                  />
                ))}
                <div className="w-32 h-0.5 bg-primary-300/30"></div>
              </div>
            </div>
          </motion.div>

          {/* Phase 4 */}
          <motion.div
            style={{ 
              opacity: phase4Opacity, 
              x: phase4X,
              pointerEvents: phase4PointerEvents
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="flex-shrink-0 bg-gradient-to-br from-primary-200/30 to-primary-100/30 rounded-2xl border border-primary-200/30 overflow-hidden shadow-2xl">
                <img 
                  src={phases[3].image}
                  alt={phases[3].title}
                  className="w-auto h-auto max-w-md max-h-96 object-contain rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handleImageClick(phases[3].image, phases[3].title)}
                  onError={(e) => {
                    console.log('Image failed to load:', phases[3].image) // Debug log
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="text-center text-primary-100 p-8 cursor-pointer hover:scale-105 transition-transform duration-300" 
                  style={{display: 'none'}}
                  onClick={() => handleImageClick(phases[3].image, phases[3].title)}
                >
                  <div className="text-8xl mb-4">{phases[3].fallback}</div>
                  <div className="text-lg">Phase 4 Image</div>
                  <div className="text-sm text-primary-300 mt-2">Click to view fullscreen</div>
                </div>
              </div>
              <motion.div 
                className="flex flex-col text-center md:text-left"
                style={{ opacity: phase4ContentOpacity, y: phase4ContentY }}
              >
                <div className="text-6xl font-bold text-primary-100 mb-4">
                  {phases[3].number}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">
                  {phases[3].title}
                </h3>
                <p className="text-primary-200 text-lg max-w-md">
                  {phases[3].description}
                </p>
              </motion.div>
            </div>
            
            {/* Progress Line with Dots - Phase 4 */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                <div className="w-32 h-0.5 bg-primary-400"></div>
                {phases.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index <= 3 ? 'bg-primary-400 scale-125' : 'bg-primary-300/30'
                    }`}
                  />
                ))}
                <div className="w-32 h-0.5 bg-primary-400"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl font-bold">×</span>
              </div>
            </button>
            
            {/* Debug Info */}
            <div className="absolute -top-16 left-0 text-white text-sm bg-black/50 p-2 rounded">
              Image: {selectedImage}<br/>
              Alt: {selectedImageAlt}
            </div>
            
            {/* Image */}
            <img
              src={selectedImage}
              alt={selectedImageAlt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.log('Fullscreen image failed to load:', selectedImage)
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                // Show fallback in fullscreen
                const fallback = document.createElement('div');
                fallback.className = 'text-center text-white text-6xl p-16';
                fallback.innerHTML = `
                  <div class="text-8xl mb-4">🖼️</div>
                  <div class="text-xl mb-2">Image not found</div>
                  <div class="text-sm text-gray-400">${selectedImage}</div>
                `;
                target.parentNode?.appendChild(fallback);
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  )
} 