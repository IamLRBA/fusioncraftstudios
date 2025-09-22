'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import '../styles/ide-theme.css'

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
    title: 'Web Development',
    description:
      'Full-stack web development services using modern technologies like React, Next.js, Node.js, and Python. We create responsive, scalable web applications that deliver exceptional user experiences and drive business growth.',
    image: '/assets/images/services/coding/web-development.jpg',
  },
  {
    id: 2,
    number: '02',
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile application development for iOS and Android. We build intuitive, high-performance apps using React Native, Flutter, and native technologies to reach your users on any device.',
    image: '/assets/images/services/coding/mobile-development.jpg',
  },
  {
    id: 3,
    number: '03',
    title: 'API Development',
    description:
      'Robust RESTful and GraphQL API development with comprehensive documentation and testing. We create secure, scalable backend services that power modern applications and enable seamless integrations.',
    image: '/assets/images/services/coding/api-development.jpg',
  },
  {
    id: 4,
    number: '04',
    title: 'Database Design',
    description:
      'Comprehensive database architecture and design services including SQL, NoSQL, and cloud database solutions. We optimize performance, ensure data integrity, and implement secure data management practices.',
    image: '/assets/images/services/coding/database-design.jpg',
  },
  {
    id: 5,
    number: '05',
    title: 'DevOps and Deployment',
    description:
      'Complete DevOps pipeline setup including CI/CD, containerization with Docker, cloud deployment on AWS/Azure/GCP, and infrastructure as code. We ensure reliable, automated deployments and scalable infrastructure.',
    image: '/assets/images/services/coding/devops-deployment.jpg',
  },
  {
    id: 6,
    number: '06',
    title: 'Software Consulting',
    description:
      'Expert software consulting services to help you make informed technology decisions. From architecture planning to code reviews, we provide guidance to optimize your development process and technology stack.',
    image: '/assets/images/services/coding/software-consulting.jpg',
  },
]

export default function SoftwareServices() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const toggle = (id: number) => setExpandedId(expandedId === id ? null : id)

  return (
    <section className="py-20 px-4 ide-section-bg">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="ide-section-title">
          ⏣ Our <span className="ide-accent">Services</span>
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
                <div className="ide-image-container">
                  <div className="ide-code-block w-[320px] h-[320px] flex items-center justify-center overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                </div>
                <motion.div className={`flex flex-col ${isRight ? 'text-right items-end' : 'text-left items-start'}`}>
                  <div className="ide-service-number">{service.number}</div>
                  <h3 className="ide-service-title">{service.title}</h3>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggle(service.id)}
                    className="ide-read-more-btn mt-4"
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
                    <div className="ide-dropdown">
                      <p className="ide-dropdown-text">{service.description}</p>
                      
                      {/* Thumbnail Images */}
                      <div className="grid grid-cols-2 gap-4 justify-items-center">
                        {[1, 2, 3, 4].map((thumbIndex) => (
                          <div key={thumbIndex} className="ide-thumbnail h-48 w-48 flex items-center justify-center overflow-hidden">
                            <img 
                              src={`/assets/images/services/coding/${service.title.toLowerCase().replace(/\s+/g, '-')}/thumb${thumbIndex}.jpg`}
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
