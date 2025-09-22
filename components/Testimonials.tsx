'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiStar } from 'react-icons/fi'

interface Testimonial {
  id: number
  text: string
  fullText: string
  author: string
  company: string
  image: string
  rating: number
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    text: "FusionCRAFT STUDIOS consistently delivers exceptional architectural designs that blend creativity with structural integrity.",
    fullText: "FusionCRAFT STUDIOS consistently delivers exceptional architectural designs that blend creativity with structural integrity. Their attention to detail and innovative approach to sustainable design has transformed our vision into reality. The team's expertise in modern construction techniques and materials has exceeded our expectations.",
    author: "Irene Lekuru Gasper",
    company: "Giant Brand Company Ltd",
    image: "/assets/images/testimonials/irene-lekuru-gasper.jpg",
    rating: 5
  },
  {
    id: 2,
    text: "Their music production and poetry collection showcases artistic brilliance that resonates with audiences worldwide.",
    fullText: "Their music production and poetry collection showcases artistic brilliance that resonates with audiences worldwide. FusionCRAFT STUDIOS has a unique ability to capture emotions and translate them into powerful musical experiences. Their creative process and technical excellence make them stand out in the industry.",
    author: "Yusuf Wasswa",
    company: "G.O.E Music Records",
    image: "/assets/images/testimonials/yusuf-wasswa.jpg",
    rating: 5
  },
  {
    id: 3,
    text: "The digital art and interactive canvas tools they've developed are revolutionizing creative expression.",
    fullText: "The digital art and interactive canvas tools they've developed are revolutionizing creative expression. FusionCRAFT STUDIOS combines cutting-edge technology with artistic vision to create tools that empower artists and designers. Their innovation in digital creativity is unmatched.",
    author: "Sizi",
    company: "LT Group Investments",
    image: "/assets/images/testimonials/sizi.jpg",
    rating: 5
  },
  {
    id: 4,
    text: "Their software development solutions demonstrate technical excellence and user-centered design principles.",
    fullText: "Their software development solutions demonstrate technical excellence and user-centered design principles. FusionCRAFT STUDIOS delivers robust, scalable applications that exceed performance expectations. Their commitment to quality and innovation makes them a trusted technology partner.",
    author: "Brian Najuna",
    company: "Nahati Anytime Laundry",
    image: "/assets/images/testimonials/brian-najuna.jpg",
    rating: 5
  },
  {
    id: 5,
    text: "The fashion styling and lookbook curation services are absolutely transformative for brand identity.",
    fullText: "The fashion styling and lookbook curation services are absolutely transformative for brand identity. FusionCRAFT STUDIOS has an incredible eye for trends and the ability to create cohesive visual narratives. Their work has elevated our brand presence and market positioning significantly.",
    author: "Sekina Paws",
    company: "Sekina Paws",
    image: "/assets/images/testimonials/sekina-paws.jpg",
    rating: 5
  },
  {
    id: 6,
    text: "The fashion styling and lookbook curation services are absolutely transformative for brand identity.",
    fullText: "The fashion styling and lookbook curation services are absolutely transformative for brand identity. FusionCRAFT STUDIOS has an incredible eye for trends and the ability to create cohesive visual narratives. Their work has elevated our brand presence and market positioning significantly.",
    author: "Derrick Jnr Agaba",
    company: "OpenELIS Global",
    image: "/assets/images/testimonials/derrick-jnr.jpg",
    rating: 5
  }
]

const duplicatedTestimonials = [...testimonialsData, ...testimonialsData]

const TestimonialsSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(0)
  const cardWidth = 280
  const gap = 32

  useEffect(() => {
    if (isPaused) return

    const animation = () => {
      setSliderPosition(prev => {
        if (Math.abs(prev) >= testimonialsData.length * (cardWidth + gap)) {
          return 0
        }
        return prev - 1
      })
    }

    const interval = setInterval(animation, 15)

    return () => clearInterval(interval)
  }, [isPaused, cardWidth, gap])

  const handlePrev = () => {
    setSliderPosition(prev => {
      const newPosition = prev + (cardWidth + gap)
      return newPosition > 0 ? -((testimonialsData.length - 1) * (cardWidth + gap)) : newPosition
    })
  }

  const handleNext = () => {
    setSliderPosition(prev => {
      const newPosition = prev - (cardWidth + gap)
      return Math.abs(newPosition) >= testimonialsData.length * (cardWidth + gap) ? 0 : newPosition
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar 
        key={i} 
        size={16} 
        className={i < rating ? "text-accent-500 fill-accent-500" : "text-gray-300"} 
      />
    ))
  }

  return (
    <section className="testimonials section bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden" id="testimonials">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 30, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 left-20 w-4 h-4 bg-primary-400/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
            y: [0, -40, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-40 right-32 w-3 h-3 bg-accent-400/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [0, -360],
            scale: [1, 0.8, 1],
            x: [0, -20, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 left-1/3 w-2 h-2 bg-primary-500/20 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [0.8, 1.2, 0.8],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-32 right-20 w-5 h-5 bg-accent-500/20 rounded-full"
        />
      </div>
      
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-primary-800 mb-16 text-center"
        >
          TEᔕTIᗰOᑎIᗩᒪᔕ
        </motion.h2>
        
        <div className="slider-container relative">
          <button className="nav-button prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-primary-700 hover:text-primary-800" onClick={handlePrev}>
            ⟸
          </button>
          
          <motion.div
            className="slider-track flex"
            animate={{ x: sliderPosition }}
            transition={{ type: "tween", ease: "linear" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ gap: `${gap}px` }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="testimonial-card flex-shrink-0"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedTestimonial(testimonial)}
                style={{ width: `${cardWidth}px` }}
              >
                <div className="testimonial-content bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-105">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="testimonial-text text-primary-700 text-sm leading-relaxed mb-4 flex-grow">"{testimonial.text}"</p>
                  <div className="stars flex justify-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <div className="testimonial-author">
                    <div className="author-image w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-800 font-bold text-lg mx-auto mb-2">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.author} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        testimonial.author.split(' ').map((n: string) => n[0]).join('')
                      )}
                    </div>
                    <div className="author-info text-center">
                      <h4 className="author-name text-primary-800 font-semibold">{testimonial.author}</h4>
                      <p className="author-role text-primary-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <button className="nav-button next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-primary-700 hover:text-primary-800" onClick={handleNext}>
            ⟹
          </button>
        </div>

        <div className="mobile-nav-buttons flex justify-center mt-8 space-x-4 lg:hidden">
          <button className="mobile-nav-button w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200" onClick={handlePrev}>
            ⟸
          </button>
          <button className="mobile-nav-button w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200" onClick={handleNext}>
            ⟹
          </button>
        </div>
        
        <AnimatePresence>
          {selectedTestimonial && (
            <motion.div
              className="modal fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
            >
              <motion.div
                className="modal-content bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto modal-scrollbar relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-button absolute top-4 right-4 w-8 h-8 bg-neutral-200 hover:bg-neutral-300 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:text-primary-600" onClick={() => setSelectedTestimonial(null)}>
                  <FiX />
                </button>
                
                <div className="testimonial-content">
                  <p className="testimonial-text text-primary-700 text-lg leading-relaxed mb-6">"{selectedTestimonial.fullText}"</p>
                  <div className="stars flex justify-center mb-6">
                    {renderStars(selectedTestimonial.rating)}
                  </div>
                </div>
                
                <div className="testimonial-author">
                  <div className="author-image w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center text-primary-800 font-bold text-xl mx-auto mb-4">
                    {selectedTestimonial.image ? (
                      <img src={selectedTestimonial.image} alt={selectedTestimonial.author} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      selectedTestimonial.author.split(' ').map((n: string) => n[0]).join('')
                    )}
                  </div>
                  <div className="author-info text-center">
                    <h4 className="author-name text-primary-800 font-bold text-xl">{selectedTestimonial.author}</h4>
                    <p className="author-role text-primary-600 text-lg">{selectedTestimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TestimonialsSection
