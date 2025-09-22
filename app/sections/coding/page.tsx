'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Minimize2, Maximize2 } from 'lucide-react'
import CodingVideoSection from '@/sections/CodingVideoSection'
import SoftwareServices from '@/sections/SoftwareServices'
import '../../../styles/ide-theme.css'

export default function CodingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Live Code Lab state
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FusionCRAFT Portfolio</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 3rem;
        }
        .feature-card {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            transition: transform 0.3s ease;
        }
        .feature-card:hover {
            transform: translateY(-5px);
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(45deg, #fbbf24, #f59e0b);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin-top: 20px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to FusionCRAFT</h1>
        <p class="subtitle">Where creativity meets technology</p>
        
        <div class="feature-grid">
            <div class="feature-card">
                <h3>🎨 Creative Design</h3>
                <p>Innovative solutions that inspire</p>
            </div>
            <div class="feature-card">
                <h3>💻 Technical Excellence</h3>
                <p>Robust and scalable development</p>
            </div>
            <div class="feature-card">
                <h3>🚀 Innovation</h3>
                <p>Pushing boundaries forward</p>
            </div>
        </div>
        
        <a href="#" class="btn">Get Started</a>
    </div>
</body>
</html>`)
  
  const [cssCode, setCssCode] = useState(`/* Custom CSS Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg,rgb(20, 25, 40) 0%,rgba(23, 19, 27, 0.72) 100%);
    color: white;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 3rem;
}

.feature-card {
    background: rgba(255,255,255,0.1);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.btn {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(45deg, #fbbf24, #f59e0b);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-weight: bold;
    margin-top: 20px;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}`)
  
  const [jsCode, setJsCode] = useState(`console.log('Portfolio loaded');`)
  
  const [previewHtml, setPreviewHtml] = useState('')

  // Update preview when code changes
  useEffect(() => {
    // Safely extract body content and escape script tags in injected JS
    let bodyContent = htmlCode
    try {
      bodyContent = htmlCode
        .replace(/<!DOCTYPE[^>]*>/gi, '')
        .replace(/<html[^>]*>/gi, '')
        .replace(/<\/html>/gi, '')
        .replace(/<head>[\s\S]*?<\/head>/gi, '')
        .replace(/<body[^>]*>/gi, '')
        .replace(/<\/body>/gi, '')
        .trim()
    } catch (_) {}

    const escapedJs = jsCode.replace(/<\/script>/gi, '<\\/script>')

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview - FusionCRAFT</title>
    <style>${cssCode}</style>
</head>
<body>
    ${bodyContent}
    <script>${escapedJs}</script>
</body>
</html>`
    setPreviewHtml(fullHtml)
  }, [htmlCode, cssCode, jsCode])

  // Function to run code
  const runCode = () => {
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.location.reload()
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen ide-section-bg relative overflow-hidden">
      {/* Navigation Back */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-20 left-8 z-50"
      >
        <Link href="/" className="group">
          <div className="flex items-center space-x-2 ide-text-secondary hover:ide-text-primary transition-colors duration-300">
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              ⟸
            </motion.div>
            <span className="text-sm font-medium">Back to Portals</span>
          </div>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <motion.div
          style={{ y, opacity }}
          className="text-center z-20 px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-8xl md:text-8xl font-bold mb-6"
          >
            <span className="text-gradient">⚛ ѕσƒтωαяє</span> Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl ide-text-primary mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            "Building digital solutions with 𝖈𝖔𝖉𝖊"
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg ide-text-secondary max-w-3xl mx-auto"
          >
            Where logic meets creativity, where problems become solutions, 
            and where every line of 𝖈𝖔𝖉𝖊 has purpose. Experience the art 
            of software development through innovative projects and clean code.
          </motion.div>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent-500/20 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-primary-400/30 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Code Editor Interface Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="ide-text-accent">Live</span> 𝖈𝖔𝖉𝖊 Lab
          </h2>
          
          <div className="ide-card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Code Editor */}
              <div className="ide-code-block rounded-lg overflow-hidden">
                {/* Editor Header */}
                <div className="ide-bg-secondary px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="ide-text-secondary text-sm">index.html</span>
                  </div>
                  <button 
                    onClick={runCode}
                    className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors duration-300"
                  >
                    Run 𝖈𝖔𝖉𝖊
                  </button>
                </div>
                
                {/* HTML Editor */}
                <div className="p-4">
                  <div className="ide-text-accent text-xs mb-2">HTML</div>
                  <textarea 
                    className="w-full h-32 ide-bg-tertiary ide-text-primary p-3 rounded font-mono text-sm resize-none ide-border-primary focus:ide-border-accent focus:outline-none"
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    placeholder="Enter your HTML code here..."
                  />
                </div>
                
                {/* CSS Editor */}
                <div className="p-4 border-t ide-border-primary">
                  <div className="ide-text-accent text-xs mb-2">CSS</div>
                  <textarea 
                    className="w-full h-24 ide-bg-tertiary ide-text-primary p-3 rounded font-mono text-sm resize-none ide-border-primary focus:ide-border-accent focus:outline-none"
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    placeholder="Enter your CSS code here..."
                  />
                </div>
                
                {/* JavaScript Editor */}
                <div className="p-4 border-t ide-border-primary">
                  <div className="ide-text-accent text-xs mb-2">JavaScript</div>
                  <textarea 
                    className="w-full h-20 ide-bg-tertiary ide-text-primary p-3 rounded font-mono text-sm resize-none ide-border-primary focus:ide-border-accent focus:outline-none"
                    value={jsCode}
                    onChange={(e) => setJsCode(e.target.value)}
                    placeholder="Enter your JavaScript 𝖈𝖔𝖉𝖊 here..."
                  />
                </div>
              </div>
              
              {/* Live Preview */}
              <div className="ide-code-block rounded-lg overflow-hidden">
                <div className="ide-bg-secondary px-4 py-3 border-b ide-border-primary">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="ide-text-secondary text-sm ml-4">Live Preview</span>
                    </div>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="ide-text-secondary hover:ide-text-primary transition-colors duration-200"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className={`p-0 overflow-hidden ${isFullscreen ? 'h-screen' : 'h-80'}`}>
                  <iframe
                    id="preview-iframe"
                    srcDoc={previewHtml}
                    className="w-full h-full border-0"
                    title="Live Preview"
                    sandbox="allow-scripts allow-same-origin"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#cbd5e0 #f7fafc'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="ide-text-secondary text-sm">
                This is a fully functional live code lab! Edit the HTML, CSS, and JavaScript code above 
                and see real-time updates in the preview panel. Click "Run Code" to refresh the preview.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Coding Video Gallery Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="ide-text-accent">𝖈𝖔𝖉𝖎𝖓𝖌</span> Video Gallery
          </h2>
          <CodingVideoSection />
        </motion.div>
      </section>

      {/* ⏣ Our Services */}
      <SoftwareServices />

      {/* Technical Skills Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
          𝕿𝖊𝖈𝖍𝖓𝖎𝖈𝖆𝖑 <span className="ide-text-accent">Skills</span>
          </h2>
          
          <div className="space-y-16 flex flex-col items-center">
            {/* Skills Item 1 - Frontend */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 ide-service-card p-8">
                <img 
                  src="/assets/images/sections/coding/skills-1.jpg" 
                  alt="Frontend Development" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="ide-service-number mb-4">01</div>
                <h3 className="ide-service-title mb-2">Frontend Development</h3>
                <p className="ide-service-description text-lg max-w-md mb-4">
                  Crafting responsive and interactive user interfaces with modern web technologies.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">JavaScript/TypeScript</span>
                    <span className="ide-text-accent text-sm">90%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">React</span>
                    <span className="ide-text-accent text-sm">85%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">HTML/CSS</span>
                    <span className="ide-text-accent text-sm">95%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Skills Item 2 - Backend */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 ide-service-card p-8">
                <img 
                  src="/assets/images/sections/coding/skills-2.jpg" 
                  alt="Backend Development" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="ide-service-number mb-4">02</div>
                <h3 className="ide-service-title mb-2">Backend Development</h3>
                <p className="ide-service-description text-lg max-w-md mb-4">
                  Building robust server-side applications and APIs with scalable architecture.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">Java</span>
                    <span className="ide-text-accent text-sm">85%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">Python/Django</span>
                    <span className="ide-text-accent text-sm">75%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">Node.js</span>
                    <span className="ide-text-accent text-sm">80%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Skills Item 3 - DevOps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
            >
              <div className="flex-shrink-0 ide-service-card p-8">
                <img 
                  src="/assets/images/sections/coding/skills-3.jpg" 
                  alt="DevOps & Tools" 
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <div className="ide-service-number mb-4">03</div>
                <h3 className="ide-service-title mb-2">DevOps & Tools</h3>
                <p className="ide-service-description text-lg max-w-md mb-4">
                  Streamlining development workflows and ensuring reliable deployments.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">Git & CI/CD</span>
                    <span className="ide-text-accent text-sm">90%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">Docker</span>
                    <span className="ide-text-accent text-sm">80%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="ide-text-secondary text-sm">Cloud Platforms</span>
                    <span className="ide-text-accent text-sm">85%</span>
                  </div>
                  <div className="w-full ide-bg-tertiary rounded-full h-2">
                    <div className="ide-bg-accent h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to <span className="ide-text-accent">𝖈𝖔𝖉𝖊</span> Together?
          </h2>
          <p className="text-xl ide-text-secondary mb-8">
            Let's discuss your coding project and create something amazing.
          </p>
          <Link href="/#contact-section">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ide-button-primary text-lg px-8 py-4"
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
} 