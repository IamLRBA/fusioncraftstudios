'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  Brush, 
  Eraser, 
  Minus, 
  Circle, 
  Square, 
  Type, 
  Image, 
  Grid, 
  Settings, 
  Maximize, 
  X,
  Download,
  Upload,
  Save,
  RotateCcw,
  RotateCw
} from 'lucide-react'

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(5)
  const [brushColor, setBrushColor] = useState('#c7ad6b')
  const [tool, setTool] = useState('brush')
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isErasing, setIsErasing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('#fdfbf7')
  const [showGrid, setShowGrid] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [isTextMode, setIsTextMode] = useState(false)
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })

  const colors = [
    '#c7ad6b', '#b3954a', '#96773a', '#7a5f32',
    '#e8dbb8', '#d9c592', '#f3eed8', '#f9f6ed',
    '#eab308', '#ca8a04', '#a16207', '#854d0e',
    '#292524', '#fafaf9', '#78716c', '#a8a29e'
  ]

  const tools = [
    { id: 'brush', name: 'Brush', icon: Brush, color: '#c7ad6b' },
    { id: 'eraser', name: 'Eraser', icon: Eraser, color: '#78716c' },
    { id: 'line', name: 'Line', icon: Minus, color: '#292524' },
    { id: 'circle', name: 'Circle', icon: Circle, color: '#a16207' },
    { id: 'square', name: 'Square', icon: Square, color: '#854d0e' },
    { id: 'text', name: 'Text', icon: Type, color: '#292524' },
    { id: 'image', name: 'Image', icon: Image, color: '#7a5f32' }
  ]

  const brushSizes = [1, 3, 5, 8, 12, 16, 20, 24]

  const stickers = [
    { icon: '😀', name: 'Smile' },
    { icon: '😍', name: 'Heart Eyes' },
    { icon: '✨', name: 'Sparkle' },
    { icon: '🚀', name: 'Rocket' },
    { icon: '💡', name: 'Light Bulb' },
    { icon: '🌟', name: 'Star' },
    { icon: '🎭', name: 'Theater' },
    { icon: '🎪', name: 'Circus' },
    { icon: '🎯', name: 'Target' }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = isFullscreen ? window.innerWidth : 800
    canvas.height = isFullscreen ? window.innerHeight : 600

    // Set initial background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx)
    }

    // Save initial state
    saveCanvasState()
  }, [isFullscreen, backgroundColor, showGrid])

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 20
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5

    for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, ctx.canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(ctx.canvas.width, y)
      ctx.stroke()
    }
  }

  const saveCanvasState = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    
    // Remove any states after current index if we're undoing
    const newHistory = canvasHistory.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    
    setCanvasHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      restoreCanvasState(historyIndex - 1)
    }
  }

  const redo = () => {
    if (historyIndex < canvasHistory.length - 1) {
      setHistoryIndex(historyIndex + 1)
      restoreCanvasState(historyIndex + 1)
    }
  }

  const restoreCanvasState = (index: number) => {
    const canvas = canvasRef.current
    if (!canvas || !canvasHistory[index]) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.putImageData(canvasHistory[index], 0, 0)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    if (showGrid) {
      drawGrid(ctx)
    }
    
    saveCanvasState()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    setShowTools(!isFullscreen)
  }

  const addSticker = (sticker: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.font = '48px Arial'
    ctx.fillStyle = brushColor
    ctx.fillText(sticker, Math.random() * (canvas.width - 50), Math.random() * (canvas.height - 50))
    saveCanvasState()
  }

  const addText = () => {
    if (!textInput.trim()) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.font = `${brushSize * 3}px Arial`
    ctx.fillStyle = brushColor
    ctx.fillText(textInput, textPosition.x, textPosition.y)
    
    setTextInput('')
    setIsTextMode(false)
    saveCanvasState()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Center the image on canvas
        const x = (canvas.width - img.width) / 2
        const y = (canvas.height - img.height) / 2
        
        ctx.drawImage(img, x, y)
        saveCanvasState()
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'fusioncraft-artwork.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = tool === 'eraser' ? '#1a1a1a' : brushColor
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (tool === 'spray') {
      // Spray effect
      for (let i = 0; i < 50; i++) {
        const sprayX = x + (Math.random() - 0.5) * brushSize * 2
        const sprayY = y + (Math.random() - 0.5) * brushSize * 2
        ctx.fillStyle = brushColor
        ctx.fillRect(sprayX, sprayY, 1, 1)
      }
    } else if (tool === 'line') {
      // Line tool
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (canvasHistory[historyIndex]) {
        ctx.putImageData(canvasHistory[historyIndex], 0, 0)
      }
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, y)
      ctx.stroke()
    } else {
      // Regular brush/eraser
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveCanvasState()
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
          <span className="text-gradient">Interactive</span> Canvas
        </h3>
        <p className="text-primary-200 mb-8">
          Create your own digital artwork using various tools and colors. 
          Express your creativity and bring your ideas to life!
        </p>
        
        {/* Toolbar */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {/* Tools Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTools(!showTools)}
              className="p-3 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 text-white transition-all duration-300"
            >
              <Brush className="w-6 h-6" />
              <span className="ml-2">Tools</span>
            </motion.button>
            
            <AnimatePresence>
              {showTools && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 bg-primary-800 rounded-lg shadow-xl border border-primary-600 z-50 min-w-48"
                >
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-3">Drawing Tools</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tools.map((toolItem) => (
                        <motion.button
                          key={toolItem.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setTool(toolItem.id)
                            setShowTools(false)
                          }}
                          className={`p-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                            tool === toolItem.id
                              ? 'bg-accent-600 text-white'
                              : 'bg-primary-700 text-primary-300 hover:bg-primary-600'
                          }`}
                        >
                          <toolItem.icon className="w-4 h-4" />
                          <span className="text-sm">{toolItem.name}</span>
                        </motion.button>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-primary-600">
                      <h4 className="text-white font-semibold mb-3">Stickers & Emojis</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {stickers.map((sticker, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => addSticker(sticker.icon)}
                            className="p-2 bg-primary-700 hover:bg-primary-600 rounded-lg text-2xl transition-all duration-300"
                          >
                            {sticker.icon}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Settings Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-lg bg-primary-800/50 text-primary-300 hover:bg-primary-700/50 transition-all duration-300"
            >
              <Settings className="w-6 h-6" />
              <span className="ml-2">Settings</span>
            </motion.button>
            
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 bg-primary-800 rounded-lg shadow-xl border border-primary-600 z-50 min-w-64"
                >
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-3">Canvas Settings</h4>
                    
                    {/* Background Color */}
                    <div className="mb-4">
                      <label className="block text-primary-300 text-sm mb-2">Background Color</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setBackgroundColor('#fdfbf7')}
                          className={`w-8 h-8 rounded-full border-2 ${
                            backgroundColor === '#fdfbf7' ? 'border-white scale-110' : 'border-primary-600'
                          }`}
                          style={{ backgroundColor: '#fdfbf7' }}
                        />
                        <button
                          onClick={() => setBackgroundColor('#292524')}
                          className={`w-8 h-8 rounded-full border-2 ${
                            backgroundColor === '#292524' ? 'border-white scale-110' : 'border-primary-600'
                          }`}
                          style={{ backgroundColor: '#292524' }}
                        />
                      </div>
                    </div>

                    {/* Grid Toggle */}
                    <div className="mb-4">
                      <label className="flex items-center space-x-2 text-primary-300">
                        <input
                          type="checkbox"
                          checked={showGrid}
                          onChange={(e) => setShowGrid(e.target.checked)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-primary-300 rounded"
                        />
                        <span className="text-sm">Show Grid Lines</span>
                      </label>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="block text-primary-300 text-sm mb-2">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-primary-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700"
                      />
                    </div>

                    {/* Text Input */}
                    <div className="mb-4">
                      <label className="block text-primary-300 text-sm mb-2">Add Text</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder="Enter text..."
                          className="flex-1 px-3 py-2 bg-primary-700 border border-primary-600 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                        />
                        <button
                          onClick={addText}
                          className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors duration-300"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fullscreen Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="p-3 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-all duration-300"
          >
            {isFullscreen ? <X className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
            <span className="ml-2">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </motion.button>
        </div>

        {/* Color Palette */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {colors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setBrushColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                brushColor === color ? 'border-white scale-110' : 'border-primary-600'
              }`}
              style={{ backgroundColor: color }}
              title={`Color: ${color}`}
            />
          ))}
        </div>

        {/* Brush Size Control */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-primary-300">Brush Size:</span>
          <div className="flex gap-2">
            {brushSizes.map((size) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setBrushSize(size)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  brushSize === size ? 'border-white scale-110' : 'border-primary-600'
                }`}
                style={{ backgroundColor: brushSize === size ? brushColor : 'transparent' }}
                title={`Size: ${size}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div 
                    className="bg-primary-600 rounded-full"
                    style={{ width: size / 3, height: size / 3 }}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={undo}
            disabled={historyIndex <= 0}
            className="px-4 py-2 bg-primary-700 hover:bg-primary-600 disabled:bg-primary-800/50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Undo</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={redo}
            disabled={historyIndex >= canvasHistory.length - 1}
            className="px-4 py-2 bg-primary-700 hover:bg-primary-600 disabled:bg-primary-800/50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
          >
            <RotateCw className="w-4 h-4" />
            <span>Redo</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
          >
            Clear
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadCanvas}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </motion.button>
        </div>

        {/* Canvas */}
        <div className="flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="border-2 border-primary-600 rounded-lg cursor-crosshair shadow-2xl"
              style={{ 
                maxWidth: isFullscreen ? '100vw' : '100%', 
                width: isFullscreen ? '100vw' : '800px',
                height: isFullscreen ? '100vh' : '600px'
              }}
            />
            
            {/* Canvas Instructions */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
              <p>Click and drag to draw</p>
              <p>Use tools above to create</p>
            </div>
          </div>
        </div>

        {/* Fullscreen Tools Panel */}
        <AnimatePresence>
          {isFullscreen && showTools && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-primary-800 rounded-lg shadow-xl border border-primary-600 z-50 p-4"
            >
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-center">Drawing Tools</h4>
                {tools.map((toolItem) => (
                  <motion.button
                    key={toolItem.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTool(toolItem.id)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      tool === toolItem.id
                        ? 'bg-accent-600 text-white'
                        : 'bg-primary-700 text-primary-300 hover:bg-primary-600'
                    }`}
                    title={toolItem.name}
                  >
                    <toolItem.icon className="w-6 h-6" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        <div className="mt-6 text-primary-400 text-sm">
          <p>
            💡 <strong>Tips:</strong> Try different brush sizes, use the spray tool for texture, 
            and experiment with various colors to create unique artwork!
          </p>
        </div>
      </motion.div>
    </div>
  )
} 