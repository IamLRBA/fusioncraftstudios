'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface GeneratedArt {
  id: string
  style: string
  pattern: string
  colors: string[]
  complexity: number
  timestamp: Date
  dataUrl: string
}

const artStyles = [
  'Abstract Expressionism',
  'Geometric Minimalism',
  'Organic Flow',
  'Digital Chaos',
  'Structured Harmony',
  'Random Patterns',
  'Color Theory',
  'Texture Exploration'
]

const patterns = [
  'Fractal',
  'Wave',
  'Grid',
  'Spiral',
  'Random',
  'Symmetrical',
  'Asymmetrical',
  'Layered'
]

const colorPalettes = [
  ['#c7ad6b', '#b3954a', '#96773a', '#7a5f32'],
  ['#e8dbb8', '#d9c592', '#f3eed8', '#f9f6ed'],
  ['#eab308', '#ca8a04', '#a16207', '#854d0e'],
  ['#292524', '#fafaf9', '#78716c', '#a8a29e'],
  ['#644e2b', '#3a2e1a', '#1c1917', '#0c0a09'],
  ['#fefce8', '#fef9c3', '#fef08a', '#fde047']
]

export default function JerryRigGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedArts, setGeneratedArts] = useState<GeneratedArt[]>([])
  const [selectedStyle, setSelectedStyle] = useState(artStyles[0])
  const [selectedPattern, setSelectedPattern] = useState(patterns[0])
  const [selectedPalette, setSelectedPalette] = useState(0)
  const [complexity, setComplexity] = useState(5)
  const [currentArt, setCurrentArt] = useState<GeneratedArt | null>(null)

  const generateRandomArt = async () => {
    setIsGenerating(true)
    
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 600

    // Clear canvas
    ctx.fillStyle = '#fdfbf7'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Generate art based on selected parameters
    generateArtPattern(ctx, selectedPattern, selectedPalette, complexity)

    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png')

    // Create new art piece
    const newArt: GeneratedArt = {
      id: Date.now().toString(),
      style: selectedStyle,
      pattern: selectedPattern,
      colors: colorPalettes[selectedPalette],
      complexity: complexity,
      timestamp: new Date(),
      dataUrl: dataUrl
    }

    setGeneratedArts(prev => [newArt, ...prev])
    setCurrentArt(newArt)
    setIsGenerating(false)
  }

  const generateArtPattern = (
    ctx: CanvasRenderingContext2D, 
    pattern: string, 
    paletteIndex: number, 
    complexity: number
  ) => {
    const colors = colorPalettes[paletteIndex]
    
    switch (pattern) {
      case 'Fractal':
        generateFractal(ctx, colors, complexity)
        break
      case 'Wave':
        generateWave(ctx, colors, complexity)
        break
      case 'Grid':
        generateGrid(ctx, colors, complexity)
        break
      case 'Spiral':
        generateSpiral(ctx, colors, complexity)
        break
      case 'Random':
        generateRandom(ctx, colors, complexity)
        break
      case 'Symmetrical':
        generateSymmetrical(ctx, colors, complexity)
        break
      case 'Asymmetrical':
        generateAsymmetrical(ctx, colors, complexity)
        break
      case 'Layered':
        generateLayered(ctx, colors, complexity)
        break
    }
  }

  const generateFractal = (ctx: CanvasRenderingContext2D, colors: string[], complexity: number) => {
    const maxIterations = complexity * 10
    const centerX = 300
    const centerY = 300
    const maxRadius = 250

    for (let i = 0; i < maxIterations; i++) {
      const angle = (i * Math.PI * 2) / maxIterations
      const radius = (i / maxIterations) * maxRadius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      ctx.fillStyle = colors[i % colors.length]
      ctx.beginPath()
      ctx.arc(x, y, complexity, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const generateWave = (ctx: CanvasRenderingContext2D, colors: string[], complexity: number) => {
    const amplitude = 100
    const frequency = complexity * 0.1
    
    for (let x = 0; x < 600; x += 5) {
      const y = 300 + Math.sin(x * frequency) * amplitude
      
      ctx.strokeStyle = colors[Math.floor(x / 100) % colors.length]
      ctx.lineWidth = complexity
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, y + 20)
      ctx.stroke()
    }
  }

  const generateGrid = (ctx: CanvasRenderingContext2D, colors: string[], complexity: number) => {
    const cellSize = 600 / (complexity + 5)
    
    for (let x = 0; x < 600; x += cellSize) {
      for (let y = 0; y < 600; y += cellSize) {
        const colorIndex = Math.floor((x + y) / cellSize) % colors.length
        ctx.fillStyle = colors[colorIndex]
        ctx.fillRect(x, y, cellSize, cellSize)
      }
    }
  }

  const generateSpiral = (ctx: CanvasRenderingContext2D, colors: string[], complexity: number) => {
    const centerX = 300
    const centerY = 300
    const maxRadius = 250
    const rotations = complexity * 2
    
    for (let i = 0; i < 1000; i++) {
      const angle = (i * rotations * Math.PI * 2) / 1000
      const radius = (i / 1000) * maxRadius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      ctx.fillStyle = colors[i % colors.length]
      ctx.beginPath()
      ctx.arc(x, y, complexity * 0.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const generateRandom = (ctx: CanvasRenderingContext2D, colors: string[], complexity: number) => {
    const numShapes = complexity * 20
    
    for (let i = 0; i < numShapes; i++) {
      const x = Math.random() * 600
      const y = Math.random() * 600
      const size = Math.random() * complexity * 10 + 5
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      ctx.fillStyle = color
      
      if (Math.random() > 0.5) {
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(x - size/2, y - size/2, size, size)
      }
    }
  }

  const generateSymmetrical = (ctx: CanvasRenderingContext2D, colors: string[], complexity: number) => {
    const centerX = 300
    const centerY = 300
    const maxRadius = 250
    
    for (let i = 0; i < complexity * 10; i++) {
      const angle = (i * Math.PI * 2) / (complexity * 10)
      const radius = Math.random() * maxRadius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      const size = Math.random() * complexity * 5 + 5
      
      ctx.fillStyle = colors[i % colors.length]
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
      
      // Symmetrical reflection
      ctx.beginPath()
      ctx.arc(centerX - (x - centerX), y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const generateAsymmetrical = (ctx: CanvasRenderingContext2D, colors: string[], complexity: number) => {
    const numShapes = complexity * 15
    
    for (let i = 0; i < numShapes; i++) {
      const x = Math.random() * 600
      const y = Math.random() * 600
      const width = Math.random() * complexity * 15 + 10
      const height = Math.random() * complexity * 15 + 10
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      ctx.fillStyle = color
      ctx.fillRect(x, y, width, height)
    }
  }

  const generateLayered = (ctx: CanvasRenderingContext2D, colors: string[], complexity: number) => {
    const layers = complexity + 3
    
    for (let layer = 0; layer < layers; layer++) {
      const opacity = 1 - (layer / layers) * 0.7
      const color = colors[layer % colors.length]
      const size = 600 - (layer * 50)
      
      ctx.fillStyle = color + Math.floor(opacity * 255).toString(16).padStart(2, '0')
      ctx.fillRect((600 - size) / 2, (600 - size) / 2, size, size)
    }
  }

  const downloadArt = (art: GeneratedArt) => {
    const link = document.createElement('a')
    link.download = `jerry-rig-art-${art.id}.png`
    link.href = art.dataUrl
    link.click()
  }

  const regenerateArt = () => {
    if (currentArt) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Clear canvas
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Generate new art with same parameters
      generateArtPattern(ctx, currentArt.pattern, selectedPalette, currentArt.complexity)

      // Update current art
      const newDataUrl = canvas.toDataURL('image/png')
      setCurrentArt({ ...currentArt, dataUrl: newDataUrl })
    }
  }

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass-effect p-8 rounded-2xl max-w-6xl mx-auto"
      >
        <h3 className="text-3xl font-bold mb-6">
          <span className="text-gradient">נєяяу-яιg</span> Generator
        </h3>
        <p className="text-primary-200 mb-8">
          Create unique, randomly generated artwork using the Jerry-Rig philosophy. 
          Mix and match styles, patterns, and colors to generate one-of-a-kind pieces!
        </p>
        
        {/* Controls */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Style Selection */}
          <div>
            <label className="block text-primary-300 text-sm mb-2">ᗩᖇᖶ Style</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full p-2 bg-primary-800/50 border border-primary-600 rounded-lg text-white"
            >
              {artStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          {/* Pattern Selection */}
          <div>
            <label className="block text-primary-300 text-sm mb-2">Pattern</label>
            <select
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
              className="w-full p-2 bg-primary-800/50 border border-primary-600 rounded-lg text-white"
            >
              {patterns.map((pattern) => (
                <option key={pattern} value={pattern}>{pattern}</option>
              ))}
            </select>
          </div>

          {/* Color Palette */}
          <div>
            <label className="block text-primary-300 text-sm mb-2">Color Palette</label>
            <select
              value={selectedPalette}
              onChange={(e) => setSelectedPalette(Number(e.target.value))}
              className="w-full p-2 bg-primary-800/50 border border-primary-600 rounded-lg text-white"
            >
              {colorPalettes.map((palette, index) => (
                <option key={index} value={index}>
                  Palette {index + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Complexity */}
          <div>
            <label className="block text-primary-300 text-sm mb-2">Complexity: {complexity}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full h-2 bg-primary-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Color Palette Preview */}
        <div className="flex justify-center gap-2 mb-6">
          {colorPalettes[selectedPalette].map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border-2 border-white"
              style={{ backgroundColor: color }}
              title={`Color ${index + 1}: ${color}`}
            />
          ))}
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateRandomArt}
          disabled={isGenerating}
                      className="px-8 py-4 bg-gradient-to-r from-primary-800 to-primary-400 border-2 border-primary-900 hover:from-primary-400 hover:to-primary-800 disabled:from-primary-800 disabled:to-primary-400 text-primary-950 font-bold rounded-full transition-all duration-300 mb-8"
        >
          {isGenerating ? '-ˋˏ ༻ ❁ ✿ ❀༺ ˎˊ- Generating... -ˋˏ ༻ ❁ ✿ ❀༺ ˎˊ-' : '⏣ Generate ᗩᖇᖶ'}
        </motion.button>

        {/* Canvas Display */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border-2 border-primary-600 rounded-lg shadow-2xl"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            
            {/* Regenerate Button */}
            {currentArt && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={regenerateArt}
                className="absolute top-4 right-4 bg-primary-400 hover:bg-primary-600 text-primary-950 p-2 rounded-full transition-all duration-300"
                title="Regenerate with same parameters"
              >
                ⟲
              </motion.button>
            )}
          </div>
        </div>

        {/* Generated Arts Gallery */}
        {generatedArts.length > 0 && (
          <div className="mt-12">
            <h4 className="text-2xl font-bold mb-6 text-white">Generated ᗩᖇᖶ Collection</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generatedArts.map((art) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-primary-800/50 rounded-xl p-4 border border-primary-700/30"
                >
                  <img
                    src={art.dataUrl}
                    alt={`Generated Art ${art.id}`}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h5 className="text-white font-semibold mb-2 text-sm">{art.style}</h5>
                  <p className="text-primary-300 text-xs mb-3">{art.pattern}</p>
                  
                  <div className="flex gap-1 mb-3">
                    {art.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-white"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadArt(art)}
                    className="w-full px-3 py-2 bg-gradient-to-r from-primary-800 to-primary-400 border-2 border-primary-900 hover:from-primary-700 hover:to-primary-800 text-primary-200 text-xs rounded-lg transition-all duration-300"
                  >
                    🗁 Download
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 text-primary-400 text-sm">
          <p>
          𓂃🖊 <strong>נєяяу-яιg Philosophy:</strong> Use whatever tools and parameters you have available 
            to create something unique. Every generation is a new experiment in creativity!
          </p>
        </div>
      </motion.div>
    </div>
  )
} 