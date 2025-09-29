'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, Palette } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system')
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('fusioncraft-theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const activeTheme = theme === 'system' ? systemTheme : theme

    root.classList.remove('light', 'dark')
    root.classList.add(activeTheme)
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', activeTheme === 'dark' ? '#1f2937' : '#f9fafb')
    }

    localStorage.setItem('fusioncraft-theme', theme)
  }, [theme, mounted])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  if (!mounted) return null

  const themes = [
    {
      value: 'light' as const,
      label: 'Light',
      icon: Sun,
      description: 'Bright and clean interface'
    },
    {
      value: 'dark' as const,
      label: 'Dark',
      icon: Moon,
      description: 'Easy on the eyes'
    },
    {
      value: 'system' as const,
      label: 'System',
      icon: Monitor,
      description: 'Follows your system preference'
    }
  ]

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="no-button-style flex items-center px-3 py-2 text-neutral-600 hover:text-primary-700 transition-all duration-300 group relative"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Palette className="w-4 h-4" />
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
              className="absolute right-0 top-12 w-64 bg-white dark:bg-primary-800 rounded-xl shadow-xl border border-gray-200 dark:border-primary-700 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-primary-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Choose Theme
                </h3>
                <p className="text-xs text-gray-500 dark:text-primary-400 mt-1">
                  Select your preferred color scheme
                </p>
              </div>
              
              <div className="p-2">
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon
                  const isActive = theme === themeOption.value
                  
                  return (
                    <motion.button
                      key={themeOption.value}
                      whileHover={{ backgroundColor: 'transparent' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleThemeChange(themeOption.value)}
                      className={`theme-option w-full flex items-center space-x-3 p-3 transition-all duration-200 ${
                        isActive 
                          ? 'text-primary-700 dark:text-primary-300' 
                          : 'text-gray-700 dark:text-primary-300'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-transparent">
                        <Icon className={`w-4 h-4 ${
                          isActive 
                            ? 'text-primary-600 dark:text-primary-400' 
                            : 'text-gray-500 dark:text-primary-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className={`font-medium ${
                          isActive 
                            ? 'text-primary-700 dark:text-primary-300' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {themeOption.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-primary-400">
                          {themeOption.description}
                        </div>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-primary-500 rounded-full"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
              
              {/* Accessibility Info */}
              <div className="p-3 bg-gray-50 dark:bg-primary-700/50 border-t border-gray-200 dark:border-primary-700">
                <p className="text-xs text-gray-500 dark:text-primary-400 text-center">
                  Press <kbd className="px-1 py-0.5 bg-white dark:bg-primary-600 rounded text-xs">Tab</kbd> to navigate
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
