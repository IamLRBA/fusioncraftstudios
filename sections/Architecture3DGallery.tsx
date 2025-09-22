'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'Futuristic Office Complex',
    description: 'A sustainable workspace designed for the next generation',
    category: 'Commercial',
    image: '/assets/images/3d-gallery/futuristic-office-complex-main.jpg',
    images: [
      '/assets/images/3d-gallery/futuristic-office-complex-main.jpg',
      '/assets/images/3d-gallery/futuristic-office-complex-1.jpg',
      '/assets/images/3d-gallery/futuristic-office-complex-2.jpg',
      '/assets/images/3d-gallery/futuristic-office-complex-3.jpg',
      '/assets/images/3d-gallery/futuristic-office-complex-4.jpg',
      '/assets/images/3d-gallery/futuristic-office-complex-5.jpg',
      '/assets/images/3d-gallery/futuristic-office-complex-6.jpg',
      '/assets/images/3d-gallery/futuristic-office-complex-7.jpg'
    ],
    specs: {
      area: '25,000 sq ft',
      floors: '8',
      completion: '2024'
    }
  },
  {
    id: 2,
    title: 'Luxury Residential Tower',
    description: 'Modern living spaces with panoramic city views',
    category: 'Residential',
    image: '/assets/images/3d-gallery/luxury-residential-tower-main.jpg',
    images: [
      '/assets/images/3d-gallery/luxury-residential-tower-main.jpg',
      '/assets/images/3d-gallery/luxury-residential-tower-1.jpg',
      '/assets/images/3d-gallery/luxury-residential-tower-2.jpg',
      '/assets/images/3d-gallery/luxury-residential-tower-3.jpg',
      '/assets/images/3d-gallery/luxury-residential-tower-4.jpg',
      '/assets/images/3d-gallery/luxury-residential-tower-5.jpg',
      '/assets/images/3d-gallery/luxury-residential-tower-6.jpg',
      '/assets/images/3d-gallery/luxury-residential-tower-7.jpg',
      '/assets/images/3d-gallery/luxury-residential-tower-8.jpg'
    ],
    specs: {
      area: '15,000 sq ft',
      floors: '25',
      completion: '2023'
    }
  },
  {
    id: 3,
    title: 'Cultural Center',
    description: 'A hub for arts, education, and community engagement',
    category: 'Cultural',
    image: '/assets/images/3d-gallery/cultural-center-main.jpg',
    images: [
      '/assets/images/3d-gallery/cultural-center-main.jpg',
      '/assets/images/3d-gallery/cultural-center-1.jpg',
      '/assets/images/3d-gallery/cultural-center-2.jpg',
      '/assets/images/3d-gallery/cultural-center-3.jpg'
    ],
    specs: {
      area: '35,000 sq ft',
      floors: '4',
      completion: '2025'
    }
  },
  {
    id: 4,
    title: 'Smart Hospital',
    description: 'Healthcare facility with cutting-edge technology integration',
    category: 'Healthcare',
    image: '/assets/images/3d-gallery/smart-hospital-main.jpg',
    images: [
      '/assets/images/3d-gallery/smart-hospital-main.jpg',
      '/assets/images/3d-gallery/smart-hospital-1.jpg',
      '/assets/images/3d-gallery/smart-hospital-2.jpg',
      '/assets/images/3d-gallery/smart-hospital-3.jpg'
    ],
    specs: {
      area: '50,000 sq ft',
      floors: '12',
      completion: '2024'
    }
  },
  {
    id: 5,
    title: 'Sustainable Campus',
    description: 'Educational complex with zero-carbon footprint',
    category: 'Educational',
    image: '/assets/images/3d-gallery/sustainable-campus-main.jpg',
    images: [
      '/assets/images/3d-gallery/sustainable-campus-main.jpg',
      '/assets/images/3d-gallery/sustainable-campus-1.jpg',
      '/assets/images/3d-gallery/sustainable-campus-2.jpg',
      '/assets/images/3d-gallery/sustainable-campus-3.jpg'
    ],
    specs: {
      area: '100,000 sq ft',
      floors: '6',
      completion: '2026'
    }
  },
  {
    id: 6,
    title: 'Innovation Hub',
    description: 'Startup incubator and co-working space',
    category: 'Innovation',
    image: '/assets/images/3d-gallery/innovation-hub-main.jpg',
    images: [
      '/assets/images/3d-gallery/innovation-hub-main.jpg',
      '/assets/images/3d-gallery/innovation-hub-1.jpg',
      '/assets/images/3d-gallery/innovation-hub-2.jpg',
      '/assets/images/3d-gallery/innovation-hub-3.jpg'
    ],
    specs: {
      area: '20,000 sq ft',
      floors: '5',
      completion: '2023'
    }
  }
]

export default function Architecture3DGallery() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="relative">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer"
          >
            <div className="portal-card h-96 overflow-hidden">
              {/* Project Image */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
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
                  className="h-full bg-gradient-to-br from-primary-800/50 to-accent-800/50 flex items-center justify-center"
                  style={{display: 'none'}}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 text-primary-300">
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-primary-300 text-sm">
                      {project.title}
                    </p>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end"
                >
                  <div className="p-4 text-white">
                    <div className="text-xs bg-primary-500/80 px-2 py-1 rounded-full inline-block mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-lg font-bold">{project.title}</h3>
                  </div>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary-300 transition-colors duration-300 text-center">
                  {project.title}
                </h3>
                
                {/* View Details Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white text-sm font-medium rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-300"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedProject ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 ${
          selectedProject ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-primary-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-primary-300 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Project Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="h-64 rounded-xl relative overflow-hidden">
                  <img
                    src={selectedProject.images[selectedImageIndex]}
                    alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
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
                    className="h-full bg-gradient-to-br from-primary-800/50 to-accent-800/50 flex items-center justify-center"
                    style={{display: 'none'}}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-2">
                        <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-primary-300">
                        Placeholder: {selectedProject.title}
                      </p>
                    </div>
                  </div>
                  
                  {/* Fullscreen Button */}
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
                
                {/* Thumbnail Grid */}
                <div className="relative">
                  {/* Scrollable Thumbnail Container */}
                  <div className="flex gap-2 overflow-x-auto pb-2 horizontal-scrollbar">
                    {selectedProject.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden transition-all duration-300 ${
                          index === selectedImageIndex 
                            ? 'ring-2 ring-primary-400 scale-105' 
                            : 'hover:scale-105 hover:ring-1 hover:ring-primary-300/50'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProject.title} - Thumbnail ${index + 1}`}
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
                          className="w-full h-full bg-gradient-to-br from-primary-600/50 to-accent-600/50 flex items-center justify-center"
                          style={{display: 'none'}}
                        >
                          <div className="text-2xl">🏗️</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Scroll Indicators */}
                  {selectedProject.images.length > 6 && (
                    <div className="flex justify-center mt-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-primary-400/30"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400/60"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <div className="mb-4">
                  <span className="bg-primary-500/20 text-primary-300 px-3 py-1 rounded-full text-sm">
                    {selectedProject.category}
                  </span>
                </div>
                
                <p className="text-primary-200 mb-6">
                  {selectedProject.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-primary-300">Total Area:</span>
                    <span className="text-white font-semibold">{selectedProject.specs.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-300">Number of Floors:</span>
                    <span className="text-white font-semibold">{selectedProject.specs.floors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-300">Completion Date:</span>
                    <span className="text-white font-semibold">{selectedProject.specs.completion}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Key Features</h4>
                  <ul className="text-primary-200 space-y-2 text-sm">
                    <li>• Sustainable design principles</li>
                    <li>• Smart building technology</li>
                    <li>• Energy-efficient systems</li>
                    <li>• Modern architectural aesthetics</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Fullscreen Image Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFullscreen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 ${
          isFullscreen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {isFullscreen && selectedProject && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Fullscreen Image */}
            <div className="max-w-7xl max-h-full relative">
              <div className="w-full h-96 md:h-[80vh] rounded-2xl relative overflow-hidden">
                <img
                  src={selectedProject.images[selectedImageIndex]}
                  alt={`${selectedProject.title} - Full View ${selectedImageIndex + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback Placeholder */}
                <div 
                  className="h-full bg-gradient-to-br from-primary-800/50 to-accent-800/50 flex items-center justify-center"
                  style={{display: 'none'}}
                >
                  <div className="text-center">
                    <div className="text-8xl md:text-9xl mb-4">
                      <svg className="w-24 h-24 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-primary-300 text-lg md:text-xl">
                      Placeholder: {selectedProject.title} - Full View
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : selectedProject.images.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300"
              >
                <span className="text-2xl">⟸</span>
              </button>
              
              <button
                onClick={() => setSelectedImageIndex(prev => prev < selectedProject.images.length - 1 ? prev + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300"
              >
                <span className="text-2xl">⟹</span>
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {selectedProject.images.length}
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-8 right-8 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 