'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface MissionVisionCardProps {
  item: {
    icon: any
    title: string
    description: string
  }
  index: number
}

export default function MissionVisionCard({ item, index }: MissionVisionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 * index }}
      className="text-center group"
    >
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <item.icon className="w-10 h-10 text-white" />
      </div>
      <h4 className="text-2xl font-bold text-primary-800 mb-4">{item.title}</h4>
      
      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center space-x-2 bg-primary-100 hover:bg-primary-200 text-primary-800 px-4 py-2 rounded-full transition-colors duration-300 mb-4"
      >
        <span className="text-sm font-medium">
          {isExpanded ? 'Hide Statement' : 'Show Statement'}
        </span>
        {isExpanded ? (
          <Minus className="w-4 h-4" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </button>
      
      {/* Expandable Description */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-primary-600 text-base leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  )
}
