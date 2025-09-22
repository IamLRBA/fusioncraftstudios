'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Mail, 
  Instagram, 
  Github, 
  MapPin, 
  Phone, 
  X,
  Maximize2,
  Send,
  Building2,
  Music,
  Palette,
  Code,
  Shirt
} from 'lucide-react'
import { FaXTwitter, FaWhatsapp, FaSnapchat, FaTiktok } from 'react-icons/fa6'
import Link from 'next/link'
import EducationalJourney from '@/components/EducationalJourney'

export default function CEOProfile() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const skills = [
    {
      category: '⾕ ᗩᖇᑕᕼITEᑕTᑌᖇE',
      description: 'Design building plans and provide renders using ArchiCAD and Lumion. Modern, glassy, solid, open, linear designs with earthy colors.',
      details: 'Started architectural school in 2021, learned from tutorials and experimentation. Creates "out of this world" designs that merge with surroundings.'
    },
    {
      category: 'ᗰᑌֆIᑕ ᗩᑎᗪ ᑭOETᖇY 𝄞',
      description: 'Acapella singing since 2015-2018, mastered all voices. Writes poetry, rap verses, and songs with meaningful, interconnected lyrics.',
      details: 'Influenced by J.Cole, Kendrick Lamar, Eminem, UK rappers like Santan Dave, Aitch, and Skepta. Uses melodic rap flows and emo melodic trap beats.'
    },
    {
      category: '☯ ᗩᖇT ᗩᑎᗪ ᗪEᔕIGᑎ',
      description: 'Drawing since childhood, took Fine-Art as major subject. Creates digital and physical art, sculptures, portraits, furniture, and house decor.',
      details: 'Developed unique spatial awareness and ability to see things differently. Practices "Jerry-Rig" - doing the most with available resources.'
    },
    {
      category: 'ᔕOᖴTᗯᗩᖇE ᗪEᐯEᒪOᑭᗰEᑎT ⚛',
      description: 'Started coding in September last year, self-taught in HTML, CSS, JavaScript, Java, React and other frameworks.',
      details: 'Specializes in front-end development, UI/UX design, and some back-end projects. Creates personal apps and sites.'
    },
    {
      category: '✃ ᖴᗩᔕᕼIOᑎ',
      description: 'Sees fashion as art form, dresses according to mood and occasion. Excellent at accessorizing and proportioning outfits.',
      details: 'Not limited to any style - classy, gentle, retro vintage, modern, sports, or street-wear. Modifies and creates new designs.'
    }
  ]



  const socialLinks = [
    { icon: Mail, href: 'mailto:jerrylarubafestus@gmail.com' },
    { icon: Instagram, href: 'https://www.instagram.com/iamlrba?igsh=MXcwcTF3b3R6ZG9yeQ%3D%3D&utm_source=qr' },
    { icon: FaTiktok, href: 'https://www.tiktok.com/@iamlrba?_t=ZM-8yRqigzltXK&_r=1' },
    { icon: FaXTwitter, href: 'https://x.com/i/status/1952162823766708588' },
    { icon: Github, href: 'https://github.com/IamLRBA' },
    { icon: FaWhatsapp, href: 'https://wa.me/256755915549' },
    { icon: Send, href: 'https://t.me/+256755915549' },
    { icon: FaSnapchat, href: 'https://t.snapchat.com/pQuWROd2' }
  ]

  const galleryImages = [
    '/assets/images/ceo-1.jpg',
    '/assets/images/ceo-2.jpg',
    '/assets/images/ceo-3.jpg',
    '/assets/images/ceo-4.jpg',
    '/assets/images/ceo-5.jpg'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }


  const openImageModal = (index: number) => {
    setSelectedImage(index)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // Scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [expandedSkills, setExpandedSkills] = useState<{ [key: string]: boolean }>({})

  const toggleSkill = (category: string) => {
    setExpandedSkills(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 relative overflow-hidden">
      {/* Navigation Back */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-20 left-8 z-50"
      >
        <Link href="/" className="group">
          <div className="flex items-center space-x-2 text-primary-300 hover:text-primary-700 transition-colors duration-300">
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl text-primary-700">⟸</span>
            </motion.div>
            <span className="text-sm font-medium">Back to Portfolio</span>
          </div>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <motion.div
          style={{ y, opacity, scale }}
          className="text-center z-20 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="w-48 h-48 mx-auto mb-8 relative overflow-hidden rounded-full border-8 border-white shadow-2xl">
              <img
                src="/assets/images/ceo-profile.jpg"
                alt="LRBA - CEO"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-8xl md:text-8xl font-bold mb-6">
              <span className="text-primary-800">ᒪᖇᗷᗩ</span>
            </h1>
            <p className="text-2xl md:text-3xl text-primary-700 mb-6 max-w-4xl mx-auto leading-relaxed">
            ᑕEO & ᖴOᑌᑎᗪEᖇ
            </p>
            <p className="text-lg text-primary-600 max-w-3xl mx-auto">
              A visionary creative leader who materializes ideas through structural ingenuity across multiple dimensions of human expression.
            </p>
          </motion.div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-24 h-24 border border-accent-500/20 rounded-full"
            style={{ animationDelay: '1s' }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-10 w-16 h-16 border border-primary-400/30 rounded-full"
            style={{ animationDelay: '2s' }}
          />
        </div>
      </section>

      {/* Skills Section - Our Missions Style */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-primary-800">ᑕᖇEᗩTIᐯE</span> <span className="text-accent-600">ᔕKIᒪᒪᔕ</span>
          </h2>
          
          <div className="space-y-16 flex flex-col items-center">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="w-full max-w-4xl"
              >
                                                   <div className={`flex flex-col items-center space-y-8 ${
                    index % 2 === 0 
                      ? 'flex-row space-x-12 md:flex-row md:space-x-12' // Left aligned (icon on left) - both mobile and desktop
                      : 'flex-row-reverse space-x-reverse space-x-12 md:flex-row-reverse md:space-x-reverse md:space-x-12' // Right aligned (icon on right) - both mobile and desktop
                  }`}>
                                       {/* Image Container */}
                    <div className="flex-shrink-0 bg-gradient-to-br from-primary-800/30 to-primary-600/30 rounded-2xl border border-primary-500/30 overflow-hidden shadow-2xl p-8">
                      {skill.category === '⾕ ᗩᖇᑕᕼITEᑕTᑌᖇE' && (
                        <img 
                          src="/assets/images/sections/ceo/architecture.jpg" 
                          alt="Architecture" 
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      )}
                      {skill.category === 'ᗰᑌֆIᑕ ᗩᑎᗪ ᑭOETᖇY 𝄞' && (
                        <img 
                          src="/assets/images/sections/ceo/music.jpg" 
                          alt="Music and Poetry" 
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      )}
                      {skill.category === '☯ ᗩᖇT ᗩᑎᗪ ᗪEᔕIGᑎ' && (
                        <img 
                          src="/assets/images/sections/ceo/art.jpg" 
                          alt="Art and Design" 
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      )}
                      {skill.category === 'ᔕOᖴTᗯᗩᖇE ᗪEᐯEᒪOᑭᗰEᑎT ⚛' && (
                        <img 
                          src="/assets/images/sections/ceo/coding.jpg" 
                          alt="Software Development" 
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      )}
                      {skill.category === '✃ ᖴᗩᔕᕼIOᑎ' && (
                        <img 
                          src="/assets/images/sections/ceo/fashion.jpg" 
                          alt="Fashion" 
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      )}
                    </div>
                   
                                       {/* Content */}
                    <div className={`flex flex-col flex-1 ${
                      index % 2 === 0 
                        ? 'text-left' // Left aligned - both mobile and desktop
                        : 'text-right' // Right aligned - both mobile and desktop
                    }`}>
                      <div className="text-6xl font-bold text-primary-400 mb-4">0{index + 1}</div>
                      <h3 className="text-3xl font-bold text-primary-800 mb-2">{skill.category}</h3>
                      <p className={`text-primary-600 text-lg mb-4 ${
                        index % 2 === 0 
                          ? 'max-w-md' // Left aligned - keep max width
                          : 'max-w-md ml-auto' // Right aligned - push to right (both mobile and desktop)
                      }`}>
                        {skill.description}
                      </p>
                      
                      {/* Expandable Details */}
                      <div className={`border-t border-primary-200/50 pt-4 ${
                        index % 2 === 0 
                          ? 'text-left' // Left aligned - both mobile and desktop
                          : 'text-right' // Right aligned - both mobile and desktop
                      }`}>
                        <button
                          onClick={() => toggleSkill(skill.category)}
                          className={`flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-300 group ${
                            index % 2 === 0 
                              ? 'justify-start' // Left aligned - both mobile and desktop
                              : 'justify-end ml-auto' // Right aligned - both mobile and desktop
                          }`}
                        >
                         <span className="text-sm font-medium">
                           {expandedSkills[skill.category] ? 'Read Less' : 'Read More'}
                         </span>
                         <div className="w-5 h-5 flex items-center justify-center">
                           {expandedSkills[skill.category] ? (
                             <motion.div
                               initial={{ rotate: 0 }}
                               animate={{ rotate: 45 }}
                               transition={{ duration: 0.3 }}
                               className="text-lg font-bold"
                             >
                               −
                             </motion.div>
                           ) : (
                             <motion.div
                               initial={{ rotate: 0 }}
                               animate={{ rotate: 0 }}
                               transition={{ duration: 0.3 }}
                               className="text-lg font-bold"
                             >
                               +
                             </motion.div>
                           )}
                         </div>
                       </button>
                       
                       {/* Expandable Content */}
                       <AnimatePresence>
                         {expandedSkills[skill.category] && (
                                                       <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-primary-200/30">
                                                                 <p className={`text-primary-500 text-base leading-relaxed ${
                                   index % 2 === 0 
                                     ? 'text-left' // Left aligned - both mobile and desktop
                                     : 'text-right' // Right aligned - both mobile and desktop
                                 }`}>
                                  {skill.details}
                                </p>
                              </div>
                            </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Educational Journey Section */}
      <EducationalJourney />

      {/* Gallery Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-32">
            <span className="text-primary-800">ᑭᕼOTO</span> <span className="text-accent-600">GᗩᒪᒪEᖇY</span>
          </h2>
          
          <div className="relative flex flex-col items-center">
            {/* Main Image */}
            <div className="relative mb-8">
              <img
                src={galleryImages[currentImageIndex]}
                alt={`CEO Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[600px] w-auto h-auto object-contain transition-transform duration-500 hover:scale-105 cursor-pointer rounded-xl shadow-2xl hover:shadow-3xl"
                onClick={() => openImageModal(currentImageIndex)}
              />
              
              {/* Fullscreen Button */}
              <button
                onClick={() => openImageModal(currentImageIndex)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-700 hover:text-primary-800 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-primary-700 hover:text-primary-800"
            >
              <span className="text-2xl">⟸</span>
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-primary-700 hover:text-primary-800"
            >
              <span className="text-2xl">⟹</span>
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-3">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-primary-600 scale-125' : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social Media Section - Icons only, no words */}
      <section className="mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-primary-900 mb-8 text-center">ᑕOᑎᑎEᑕT ᗯITᕼ ᗰE</h3>
          <div className="flex justify-center flex-wrap gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 flex items-center justify-center transition-all duration-300 group"
              >
                <social.icon className="w-8 h-8 text-primary-600 group-hover:text-primary-800 transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-primary-900 mb-8 text-center">GET Iᑎ TOᑌᑕᕼ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-800/30 to-primary-600/30 border border-primary-500/30 overflow-hidden shadow-2xl">
              <Mail className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h4 className="font-semibold text-primary-900 mb-2">EᗰᗩIᒪ</h4>
              <p className="text-sm text-neutral-600 mb-3">jerrylarubafestus@gmail.com</p>
              <a
                href="mailto:jerrylarubafestus@gmail.com"
                className="btn btn-outline"
              >
                Email Me
              </a>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-800/30 to-primary-600/30 border border-primary-500/30 overflow-hidden shadow-2xl">
              <Phone className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h4 className="font-semibold text-primary-900 mb-2">ᑭᕼOᑎE</h4>
              <p className="text-sm text-neutral-600 mb-3">+256774948086</p>
              <a
                href="tel:+256774948086"
                className="btn btn-outline"
              >
                Call Me
              </a>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-800/30 to-primary-600/30 border border-primary-500/30 overflow-hidden shadow-2xl">
              <FaWhatsapp className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h4 className="font-semibold text-primary-900 mb-2">ᗯᕼᗩTᔕᗩᑭᑭ</h4>
              <p className="text-sm text-neutral-600 mb-3">+256755915549</p>
              <a
                href="https://wa.me/256755915549"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Message Me
              </a>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-800/30 to-primary-600/30 border border-primary-500/30 overflow-hidden shadow-2xl">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h4 className="font-semibold text-primary-900 mb-2">ᒪOᑕᗩTIOᑎ</h4>
              <p className="text-sm text-neutral-600 mb-3">Kampala, Uganda</p>
              <a
                href="https://maps.google.com/?q=Kampala,Uganda"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Find Me
                </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex items-center justify-center w-full h-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-700 hover:text-primary-800 transition-all duration-300 hover:scale-110 shadow-lg z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img
                src={galleryImages[selectedImage]}
                alt={`CEO Image ${selectedImage + 1}`}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
