'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Check initial scroll position
    toggleVisibility()
    
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-12 h-12 text-primary-600 hover:text-primary-700 rounded-full transition-all duration-300 hover:scale-110 border border-primary-300 bg-white shadow-lg flex items-center justify-center relative"
      >
        <span className="text-3xl">⇑</span>
        
        {/* Tooltip - only shows on hover */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-neutral-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg z-10">
            Back to Top
            {/* Tooltip arrow */}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-800"></div>
          </div>
        )}
      </button>
    </div>
  )
}
