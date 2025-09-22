'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Command, 
  Home, 
  Building2, 
  Music, 
  Palette, 
  Code, 
  Shirt,
  Search,
  X
} from 'lucide-react'

interface Shortcut {
  key: string
  description: string
  action: () => void
  category: string
}

export default function KeyboardShortcuts() {
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const router = useRouter()

  const shortcuts: Shortcut[] = [
    {
      key: 'g h',
      description: 'Go to Home',
      action: () => router.push('/'),
      category: 'Navigation'
    },
    {
      key: 'g a',
      description: 'Go to Architecture',
      action: () => router.push('/sections/architecture'),
      category: 'Navigation'
    },
    {
      key: 'g m',
      description: 'Go to Music & Poetry',
      action: () => router.push('/sections/music'),
      category: 'Navigation'
    },
    {
      key: 'g d',
      description: 'Go to Art & Design',
      action: () => router.push('/sections/art'),
      category: 'Navigation'
    },
    {
      key: 'g c',
      description: 'Go to Software Development',
      action: () => router.push('/sections/coding'),
      category: 'Navigation'
    },
    {
      key: 'g f',
      description: 'Go to Fashion',
      action: () => router.push('/sections/fashion'),
      category: 'Navigation'
    },
    {
      key: 's',
      description: 'Focus Search',
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      },
      category: 'Actions'
    },
    {
      key: 'c',
      description: 'Go to Contact',
      action: () => {
        const contactSection = document.getElementById('contact-section')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }
      },
      category: 'Actions'
    },
    {
      key: '↑',
      description: 'Scroll to Top',
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      category: 'Actions'
    },
    {
      key: '?',
      description: 'Show/Hide Help',
      action: () => setShowHelp(!showHelp),
      category: 'Help'
    },
    {
      key: 'esc',
      description: 'Close Modals',
      action: () => {
        // Close any open modals or dropdowns
        setShowShortcuts(false)
        setShowHelp(false)
      },
      category: 'Help'
    }
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Command/Ctrl + K to show shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowShortcuts(!showShortcuts)
        return
      }

      // Escape to close
      if (e.key === 'Escape') {
        setShowShortcuts(false)
        setShowHelp(false)
        return
      }

      // Single key shortcuts
      if (!e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault()
            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
            if (searchInput) {
              searchInput.focus()
            }
            break
          case 'c':
            e.preventDefault()
            const contactSection = document.getElementById('contact-section')
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' })
            }
            break
          case '?':
            e.preventDefault()
            setShowHelp(!showHelp)
            break
        }
      }

      // Two-key shortcuts (g + letter)
      if (e.key === 'g') {
        const nextKey = new Promise<string>((resolve) => {
          const handleNextKey = (e2: KeyboardEvent) => {
            if (!e2.metaKey && !e2.ctrlKey && !e2.altKey && !e2.shiftKey) {
              resolve(e2.key.toLowerCase())
              document.removeEventListener('keydown', handleNextKey)
            }
          }
          document.addEventListener('keydown', handleNextKey)
          setTimeout(() => {
            document.removeEventListener('keydown', handleNextKey)
            resolve('')
          }, 1000)
        })

        nextKey.then((nextKey) => {
          switch (nextKey) {
            case 'h':
              router.push('/')
              break
            case 'a':
              router.push('/sections/architecture')
              break
            case 'm':
              router.push('/sections/music')
              break
            case 'd':
              router.push('/sections/art')
              break
            case 'c':
              router.push('/sections/coding')
              break
            case 'f':
              router.push('/sections/fashion')
              break
          }
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [router, showShortcuts, showHelp])

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, Shortcut[]>)

  return (
    <>
      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto modal-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Keyboard Shortcuts</h2>
                  <button
                    onClick={() => setShowShortcuts(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">Use these shortcuts to navigate quickly</p>
              </div>

              <div className="p-6">
                {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryShortcuts.map((shortcut) => (
                        <div
                          key={shortcut.key}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <span className="text-gray-700">{shortcut.description}</span>
                          <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm font-mono">
                            {shortcut.key}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowShortcuts(true)}
        className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        title="Keyboard Shortcuts (⌘+K)"
      >
        <Command className="w-6 h-6" />
      </motion.button>

      {/* Help Indicator */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-8 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-xs"
          >
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">⌘+K</kbd> to see all keyboard shortcuts
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
