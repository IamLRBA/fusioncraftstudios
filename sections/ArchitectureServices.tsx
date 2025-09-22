'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface Service {
  id: number
  number: string
  title: string
  description: string
  image: string
}

const services: Service[] = [
  {
    id: 1,
    number: '01',
    title: 'Architectural Design',
    description:
      'Custom building designs that blend functionality with aesthetic appeal, using modern software and sustainable principles.',
    image: '/assets/images/services/architecture/architectural-design.jpg',
  },
  {
    id: 2,
    number: '02',
    title: '3D Visualization',
    description:
      'Immersive 3D renders and walkthroughs that bring your architectural vision to life before construction begins.',
    image: '/assets/images/services/architecture/3d-visualization.jpg',
  },
  {
    id: 3,
    number: '03',
    title: 'Project Management',
    description:
      'End-to-end project coordination from concept to completion, ensuring quality and timely delivery.',
    image: '/assets/images/services/architecture/project-management.jpg',
  },
  {
    id: 4,
    number: '04',
    title: 'Design Consultation',
    description:
      'We offer all building design consultations especially on Eco-friendly architectural solutions that minimize environmental impact while maximizing efficiency.',
    image: '/assets/images/services/architecture/sustainable-design.jpg',
  },
  {
    id: 5,
    number: '05',
    title: 'Interior Design',
    description:
      'Seamless integration of interior spaces with architectural design for cohesive, beautiful environments.',
    image: '/assets/images/services/architecture/interior-design.jpg',
  },
  {
    id: 6,
    number: '06',
    title: 'Renovation',
    description:
      'Transform existing spaces with innovative renovation solutions that enhance functionality and aesthetics.',
    image: '/assets/images/services/architecture/renovation.jpg',
  },
]

export default function ArchitectureServices() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const toggle = (id: number) => setExpandedId(expandedId === id ? null : id)

  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
          ⏣ Our <span className="text-primary-400">Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-8">
          {services.map((service, index) => {
            const isRight = index % 2 === 1
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${isRight ? 'items-end' : 'items-start'}`}
            >
              <div className="flex flex-col space-y-6">
                <div className="bg-gradient-to-br from-primary-800/30 to-primary-600/30 rounded-2xl border border-primary-500/30 overflow-hidden shadow-2xl p-4">
                  <div className="bg-primary-900/20 rounded-xl w-[320px] h-[320px] flex items-center justify-center overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                </div>
                <motion.div className={`flex flex-col ${isRight ? 'text-right items-end' : 'text-left items-start'}`}>
                  <div className="text-6xl font-bold text-primary-400">{service.number}</div>
                  <h3 className="text-3xl font-bold mt-2 text-white">{service.title}</h3>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggle(service.id)}
                    className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 hover:text-white border border-primary-500/30 rounded-full px-6 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-500/30 hover:to-accent-500/30"
                  >
                    <span>{expandedId === service.id ? 'Read Less' : 'Read More'}</span>
                    <AnimatePresence mode="wait">
                      {expandedId === service.id ? (
                        <motion.div key="minus" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                          <Minus size={20} />
                        </motion.div>
                      ) : (
                        <motion.div key="plus" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                          <Plus size={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedId === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="bg-primary-800/30 rounded-xl p-6 border border-primary-500/20">
                      <p className="text-primary-200 leading-relaxed mb-6 text-center">{service.description}</p>
                      
                      {/* Thumbnail Images */}
                      <div className="grid grid-cols-2 gap-4 justify-items-center">
                        {[1, 2, 3, 4].map((thumbIndex) => (
                          <div key={thumbIndex} className="bg-primary-900/20 rounded-lg h-48 w-48 flex items-center justify-center border border-primary-500/20 overflow-hidden shadow-lg hover:shadow-none transition-shadow duration-300 cursor-pointer">
                            <img 
                              src={`/assets/images/services/architecture/${service.title.toLowerCase().replace(/\s+/g, '-')}/thumb${thumbIndex}.jpg`}
                              alt={`${service.title} service thumbnail ${thumbIndex}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div className="hidden text-primary-400 text-sm items-center justify-center w-full h-full">
                              Thumbnail {thumbIndex}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}


