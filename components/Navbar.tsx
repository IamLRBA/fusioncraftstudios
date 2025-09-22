'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Icon imports - using Hi (Heroicons) instead of lucide-react
import { 
  HiMenu, 
  HiX, 
  HiSearch, 
  HiHome,
  HiOfficeBuilding,
  HiMusicNote,
  HiColorSwatch,
  HiCode,
  HiShoppingBag,
  HiGlobeAlt
} from 'react-icons/hi'
import ThemeSwitcher from './ThemeSwitcher'

const navigation = [
  { name: 'Home', href: '/', icon: HiHome },
]

const portalItems = [
  { name: 'Architecture', href: '/sections/architecture', icon: HiOfficeBuilding },
  { name: 'Music & Poetry', href: '/sections/music', icon: HiMusicNote },
  { name: 'Art & Design', href: '/sections/art', icon: HiColorSwatch },
  { name: 'Software Development', href: '/sections/coding', icon: HiCode },
  { name: 'Fashion', href: '/sections/fashion', icon: HiShoppingBag },
]

const searchSuggestions = [
  { name: 'Architecture Design', href: '/sections/architecture', category: 'Architecture' },
  { name: 'Building Plans', href: '/sections/architecture', category: 'Architecture' },
  { name: '3D Renders', href: '/sections/architecture', category: 'Architecture' },
  { name: 'Music Production', href: '/sections/music', category: 'Music' },
  { name: 'Poetry Collection', href: '/sections/music', category: 'Music' },
  { name: 'Digital Art', href: '/sections/art', category: 'Art' },
  { name: 'Interactive Canvas', href: '/sections/art', category: 'Art' },
  { name: 'Web Development', href: '/sections/coding', category: 'Development' },
  { name: 'Mobile Apps', href: '/sections/coding', category: 'Development' },
  { name: 'Fashion Styling', href: '/sections/fashion', category: 'Fashion' },
  { name: 'Lookbook', href: '/sections/fashion', category: 'Fashion' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isPortalsOpen, setIsPortalsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const pathname = usePathname()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSuggestions(searchSuggestions)
      setIsSearching(false)
    } else {
      const filtered = searchSuggestions.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      setIsSearching(true)
    }
  }, [searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearchOpen(true)
    setShowSuggestions(true)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setIsSearchOpen(false)
    setIsSearching(false)
    setShowSuggestions(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setShowSuggestions(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search submission
      console.log('Searching for:', searchQuery)
      // You can implement actual search logic here
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredSuggestions(searchSuggestions)
      setIsSearching(false)
      setShowSuggestions(false)
    } else {
      const filtered = searchSuggestions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      setIsSearching(true)
      setShowSuggestions(true)
    }
  }

  const handleSuggestionClick = (href: string) => {
    setSearchQuery('')
    setIsSearchOpen(false)
    window.location.href = href
  }

  const closeMenu = () => {
    setIsOpen(false)
    setIsSearchOpen(false)
    setIsPortalsOpen(false)
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 relative">
            {/* Left side - Logo, Home, Portals */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold text-primary-800 group-hover:text-primary-900 transition-colors duration-300">
                  FusionCRAFT
                </span>
              </Link>

              {/* Navigation - Hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 group relative ${
                        active 
                          ? 'text-primary-700' 
                          : 'text-neutral-600 hover:text-primary-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                      
                      {/* Active underline */}
                      {active && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover underline */}
                      {!active && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      )}
                    </Link>
                  )
                })}

                {/* Portals Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsPortalsOpen(!isPortalsOpen)}
                    onMouseEnter={() => setIsPortalsOpen(true)}
                    onMouseLeave={() => setIsPortalsOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 group relative ${
                      portalItems.some(item => isActive(item.href))
                        ? 'text-primary-700'
                        : 'text-neutral-600 hover:text-primary-700'
                    }`}
                  >
                    <HiGlobeAlt className="w-4 h-4" />
                    <span className="font-medium">Portals</span>
                    <span className="text-sm">⇓</span>
                    
                    {/* Active underline */}
                    {portalItems.some(item => isActive(item.href)) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover underline */}
                    {!portalItems.some(item => isActive(item.href)) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                  </button>

                  {/* Portals Dropdown Menu */}
                  <AnimatePresence>
                    {isPortalsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onMouseEnter={() => setIsPortalsOpen(true)}
                        onMouseLeave={() => setIsPortalsOpen(false)}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-200 z-50"
                      >
                        <div className="py-2">
                          {portalItems.map((item, index) => {
                            const Icon = item.icon
                            const active = isActive(item.href)
                            
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 hover:bg-primary-50 transition-all duration-200 ${
                                  active ? 'text-primary-700 bg-primary-50' : 'text-neutral-600'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                <span className="font-medium">{item.name}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right side controls - Search and Theme */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Search Bar */}
              <div className="relative" ref={searchRef}>
                <button 
                  onClick={isSearchOpen ? handleSearchSubmit : toggleSearch} 
                  className="p-2 text-neutral-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  type={isSearchOpen ? "submit" : "button"}
                >
                  <HiSearch className="w-5 h-5" />
                </button>
                {isSearchOpen && (
                  <form onSubmit={handleSearchSubmit} className="navbar-search-form inline-flex items-center">
                    <div className="search-input-wrapper">
                      {isSearchOpen && (
                        <button 
                          type="button"
                          onClick={clearSearch}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 p-1 text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
                        >
                          <HiX className="w-4 h-4" />
                        </button>
                      )}
                      <input
                        type="text"
                        placeholder="Search services"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`navbar-search-input ${isSearchOpen ? 'pl-10' : 'pl-4'}`}
                        autoFocus
                      />
                      {showSuggestions && (
                        <div className="search-suggestions absolute top-full left-0 mt-2">
                          {filteredSuggestions.length > 0 ? (
                            filteredSuggestions.map((item) => (
                              <div 
                                key={`${item.category}-${item.name}`}
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(item.href)}
                              >
                                <span className="suggestion-category">{item.category}</span>
                                <span className="suggestion-title">{item.name}</span>
                              </div>
                            ))
                          ) : (
                            <div className="suggestion-item no-results">
                              No results found for "{searchQuery}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
              
              {/* Theme Switcher */}
              <ThemeSwitcher />
            </div>

            {/* Mobile Menu Button - Centered on mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden absolute right-0 p-2 rounded-lg text-neutral-600 hover:text-primary-700 hover:bg-primary-50 transition-colors duration-200"
            >
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-[70vh] w-80 bg-white shadow-2xl z-50 lg:hidden rounded-l-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                  <span className="text-lg font-semibold text-primary-800">Menu</span>
                  <button
                    onClick={closeMenu}
                    className="close-btn"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="p-6 border-b border-neutral-200">
                  <div className="relative">
                    <button 
                      onClick={isSearchOpen ? handleSearchSubmit : toggleSearch} 
                      className="w-full flex items-center justify-center p-3 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors duration-200 mb-4"
                      type={isSearchOpen ? "submit" : "button"}
                    >
                      <HiSearch className="w-5 h-5 mr-2" />
                      <span className="font-medium">
                        {isSearchOpen ? 'Search' : 'Open Search'}
                      </span>
                    </button>
                    
                    {isSearchOpen && (
                      <div className="space-y-4">
                        <div className="relative">
                          {isSearchOpen && (
                            <button 
                              type="button"
                              onClick={clearSearch}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 p-1 text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
                            >
                              <HiX className="w-4 h-4" />
                            </button>
                          )}
                          <input
                            type="text"
                            placeholder="Search services"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className={`w-full ${isSearchOpen ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                            autoFocus
                          />
                        </div>
                        
                        {/* Mobile Search Suggestions */}
                        {showSuggestions && (
                          <div className="max-h-40 overflow-y-auto border border-neutral-200 rounded-lg custom-scrollbar">
                            {filteredSuggestions.length > 0 ? (
                              filteredSuggestions.map((suggestion) => (
                                <div
                                  key={suggestion.name}
                                  className="px-3 py-2 hover:bg-primary-50 cursor-pointer transition-colors duration-200 border-b border-neutral-100 last:border-b-0"
                                  onClick={() => handleSuggestionClick(suggestion.href)}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-neutral-800">{suggestion.name}</span>
                                    <span className="text-sm text-primary-600 bg-primary-100 px-2 py-1 rounded-full">
                                      {suggestion.category}
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="px-3 py-4 text-center">
                                <div className="text-neutral-400 mb-2">
                                  <HiSearch className="w-6 h-6 mx-auto" />
                                </div>
                                <p className="text-neutral-600 font-medium">No results found</p>
                                <p className="text-sm text-neutral-400 mt-1">Try different keywords</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)
                      
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeMenu}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group relative ${
                            active 
                              ? 'text-primary-700 bg-primary-50' 
                              : 'text-neutral-600 hover:text-primary-700 hover:bg-primary-50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                          
                          {/* Active underline */}
                          {active && (
                            <motion.div
                              layoutId="activeTabMobile"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                              initial={false}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                          
                          {/* Hover underline */}
                          {!active && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                          )}
                        </Link>
                      )
                    })}
                    
                    {/* Mobile Portals */}
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                        Portals
                      </div>
                      {portalItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.href)
                        
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={closeMenu}
                            className={`flex items-center space-x-3 px-8 py-3 rounded-lg transition-all duration-300 group relative ${
                              active 
                                ? 'text-primary-700 bg-primary-50' 
                                : 'text-neutral-600 hover:text-primary-700 hover:bg-primary-50'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                            
                            {/* Active underline */}
                            {active && (
                              <motion.div
                                layoutId="activeTabMobile"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            
                            {/* Hover underline */}
                            {!active && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </nav>

                {/* Footer with Theme Switcher */}
                <div className="p-6 border-t border-neutral-200">
                  {/* Theme Switcher */}
                  <div className="mb-4">
                    <div className="px-4 py-2 text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                      Theme
                    </div>
                    <div className="px-4">
                      <ThemeSwitcher />
                    </div>
                  </div>
                  
                  {/* Studio Info */}
                  <div className="text-center">
                    <p className="text-sm text-neutral-500">FusionCRAFT STUDIOS</p>
                    <p className="text-xs text-neutral-400 mt-1">Materializing ideas through structural ingenuity</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
