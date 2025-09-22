'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const education = [
  {
    period: "2008 – 2012",
    level: "Primary 3 – Primary 7 (PLE)",
    school: "Bugema Adventist Primary School",
    details: "Completed primary education and sat for the Primary Leaving Exams (PLE)."
  },
  {
    period: "2013 – 2016",
    level: "Senior One – Senior Four (UCE)",
    school: "Bugema Adventist Secondary School",
    details: "Completed lower secondary education and sat for the Uganda Certificate of Education (UCE)."
  },
  {
    period: "2017 – 2018",
    level: "Senior Five – Senior Six (UACE)",
    school: "Bugema Adventist Secondary School",
    details: "Completed advanced secondary education and sat for the Uganda Advanced Certificate of Education (UACE)."
  },
  {
    period: "2021 – Present",
    level: "Bachelor's Degree in Architecture",
    school: "International University of East Africa",
    details: "Currently pursuing a degree in Architecture with ongoing coursework and design projects."
  }
]

export default function EducationalJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const guideDotProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1])

  return (
    <section 
      ref={containerRef}
      className="py-20 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: 'var(--color-primary-800)' }}
          >
            <span className="text-primary-500">EᗪᑌᑕᗩTIOᑎᗩᒪ</span> ᒍOᑌᖇᑎEY
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: 'var(--color-accent-600)' }}
          />
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <svg 
            viewBox="0 0 1000 800" 
            className="w-full h-auto"
            style={{ minHeight: '600px' }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--color-primary-500)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--color-accent-500)' }} />
              </linearGradient>
            </defs>
            
                         {/* Animated Path */}
                           <motion.path
                d="M 50 100 L 950 100 L 950 300 L 50 300 L 50 500 L 950 500 L 950 700 L 50 700"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="1"
                strokeDashoffset={pathLength}
                style={{ pathLength: pathLength }}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

                         {/* Animated Guide Dot */}
                           <motion.circle
                r="6"
                fill="var(--color-accent-500)"
                filter="drop-shadow(0 0 8px var(--color-accent-500))"
                cx={useTransform(guideDotProgress, [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1], [50, 950, 950, 50, 50, 950, 950, 50, 50])}
                cy={useTransform(guideDotProgress, [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1], [100, 100, 300, 300, 500, 500, 700, 700, 700])}
              />
          </svg>

                     {/* Desktop Milestones */}
           {education.map((item, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ 
                 duration: 0.6, 
                 delay: 0.5 + (index * 0.2),
                 ease: "easeInOut"
               }}
               whileHover={{ scale: 1.05 }}
               className="absolute"
               style={{
                                   left: index % 2 === 0 ? '5%' : '65%',
                 top: `${(index * 25) + 12.5}%`,
                 transform: 'translateY(-50%)'
               }}
             >
               <div 
                 className={`w-80 p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                   index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                 }`}
                 style={{ 
                   backgroundColor: 'var(--color-bg-card)',
                   borderColor: 'var(--color-neutral-200)'
                 }}
               >
                                 <div className="flex items-start space-x-4">
                   <div className="text-6xl font-bold text-primary-400 mb-4 flex-shrink-0">
                     {index + 1}
                   </div>
                   <div className="flex-1">
                     <div 
                       className="text-sm font-medium mb-1"
                       style={{ color: 'var(--color-accent-600)' }}
                     >
                       {item.period}
                     </div>
                     <h3 
                       className="text-lg font-semibold mb-2"
                       style={{ color: 'var(--color-primary-900)' }}
                     >
                       {item.level}
                     </h3>
                     <div className="flex items-center space-x-3 mb-2">
                       <h4 
                         className="text-base font-medium"
                         style={{ color: 'var(--color-primary-700)' }}
                       >
                         {item.school}
                       </h4>
                       <div className="w-8 h-8 rounded-lg overflow-hidden border border-neutral-200">
                         <img 
                           src={`/assets/images/sections/ceo/school-${index + 1}.jpg`}
                           alt={`${item.school} Badge`}
                           className="w-full h-full object-cover"
                         />
                       </div>
                     </div>
                     <p 
                       className="text-sm leading-relaxed"
                       style={{ color: 'var(--color-neutral-600)' }}
                     >
                       {item.details}
                     </p>
                   </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

                          {/* Mobile Timeline */}
         <div className="block md:hidden relative">
           <svg 
             viewBox="0 0 400 800" 
             className="w-full h-auto"
             style={{ minHeight: '800px' }}
           >
             <defs>
               <linearGradient id="mobilePathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" style={{ stopColor: 'var(--color-primary-500)' }} />
                 <stop offset="100%" style={{ stopColor: 'var(--color-accent-500)' }} />
               </linearGradient>
             </defs>
             
             {/* Animated Path */}
             <motion.path
               d="M 200 50 L 200 200 L 200 350 L 200 500 L 200 650 L 200 750"
               fill="none"
               stroke="url(#mobilePathGradient)"
               strokeWidth="8"
               strokeLinecap="round"
               strokeDasharray="1"
               strokeDashoffset={pathLength}
               style={{ pathLength: pathLength }}
               initial={{ pathLength: 0 }}
               whileInView={{ pathLength: 1 }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />

             {/* Animated Guide Dot */}
             <motion.circle
               cx="200"
               r="8"
               fill="var(--color-accent-500)"
               filter="drop-shadow(0 0 8px var(--color-accent-500))"
               cy={useTransform(guideDotProgress, [0, 1], [50, 750])}
             />
           </svg>

          {/* Mobile Milestones */}
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5 + (index * 0.2),
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
              className="absolute"
              style={{
                                 left: index % 2 === 0 ? '5%' : '55%',
                top: `${(index * 20) + 10}%`,
                transform: 'translateY(-50%)'
              }}
            >
              <div 
                className={`w-64 p-4 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                }`}
                style={{ 
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-neutral-200)'
                }}
              >
                                 <div className="flex items-start space-x-3">
                   <div className="text-4xl font-bold text-primary-400 mb-2 flex-shrink-0">
                     {index + 1}
                   </div>
                   <div className="flex-1">
                     <div 
                       className="text-xs font-medium mb-1"
                       style={{ color: 'var(--color-accent-600)' }}
                     >
                       {item.period}
                     </div>
                     <h3 
                       className="text-base font-semibold mb-1"
                       style={{ color: 'var(--color-primary-900)' }}
                     >
                       {item.level}
                     </h3>
                     <div className="flex items-center space-x-2 mb-1">
                       <h4 
                         className="text-sm font-medium"
                         style={{ color: 'var(--color-primary-700)' }}
                       >
                         {item.school}
                       </h4>
                       <div className="w-6 h-6 rounded-lg overflow-hidden border border-neutral-200">
                         <img 
                           src={`/assets/images/sections/ceo/school-${index + 1}.jpg`}
                           alt={`${item.school} Badge`}
                           className="w-full h-full object-cover"
                         />
                       </div>
                     </div>
                     <p 
                       className="text-xs leading-relaxed"
                       style={{ color: 'var(--color-neutral-600)' }}
                     >
                       {item.details}
                     </p>
                   </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
