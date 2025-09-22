'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere, Cylinder, Text } from '@react-three/drei'
import * as THREE from 'three'

// Extend JSX namespace for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any
      meshStandardMaterial: any
    }
  }
}

// 3D Building Component
function Building({ position, size, color, rotation = 0 }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Main building structure */}
      <Box args={size} ref={meshRef}>
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </Box>
      
      {/* Windows */}
      {Array.from({ length: Math.floor(size[1] / 0.5) }).map((_, i) => (
        <Box
          key={i}
          args={[size[0] * 0.8, 0.1, 0.1]}
          position={[0, i * 0.5 - size[1] / 2 + 0.25, size[2] / 2 + 0.01]}
        >
          <meshStandardMaterial color="#e8dbb8" emissive="#e8dbb8" emissiveIntensity={0.2} />
        </Box>
      ))}
      
      {/* Roof */}
      <Box args={[size[0] * 1.1, 0.2, size[2] * 1.1]} position={[0, size[1] / 2 + 0.1, 0]}>
        <meshStandardMaterial color="#7a5f32" />
      </Box>
      
      {/* Balconies */}
      {Array.from({ length: Math.floor(size[1] / 1.5) }).map((_, i) => (
        <Box
          key={`balcony-${i}`}
          args={[size[0] * 0.6, 0.05, 0.3]}
          position={[0, i * 1.5 - size[1] / 2 + 0.75, size[2] / 2 + 0.15]}
        >
          <meshStandardMaterial color="#d9c592" />
        </Box>
      ))}
      
      {/* Entrance */}
      <Box args={[size[0] * 0.3, 0.8, 0.2]} position={[0, -size[1] / 2 + 0.4, size[2] / 2 + 0.01]}>
        <meshStandardMaterial color="#4a3c2c" />
      </Box>
    </group>
  )
}

// Road Component
function Road() {
  return (
    <group>
      {/* Main road */}
      <Box args={[40, 0.1, 4]} position={[0, -4.9, 0]}>
        <meshStandardMaterial color="#2c2c2c" />
      </Box>
      
      {/* Road markings */}
      <Box args={[40, 0.11, 0.2]} position={[0, -4.89, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      
      {/* Sidewalk */}
      <Box args={[40, 0.1, 1]} position={[0, -4.85, 2.5]}>
        <meshStandardMaterial color="#8b7355" />
      </Box>
      <Box args={[40, 0.1, 1]} position={[0, -4.85, -2.5]}>
        <meshStandardMaterial color="#8b7355" />
      </Box>
    </group>
  )
}

// Vehicle Component
function Vehicle({ position, color, rotation = 0 }: any) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x += Math.sin(state.clock.elapsedTime + rotation) * 0.01
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Car body */}
      <Box args={[1.5, 0.4, 0.8]} position={[0, -4.5, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      
      {/* Car roof */}
      <Box args={[1.2, 0.3, 0.7]} position={[0, -4.3, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      
      {/* Wheels */}
      <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[-0.6, -4.6, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[0.6, -4.6, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[-0.6, -4.6, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 0.1, 8]} position={[0.6, -4.6, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
    </group>
  )
}

// Person Component
function Person({ position, rotation = 0 }: any) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x += Math.sin(state.clock.elapsedTime + rotation) * 0.005
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Head */}
      <Sphere args={[0.15, 16, 16]} position={[0, -3.5, 0]}>
        <meshStandardMaterial color="#f4d03f" />
      </Sphere>
      
      {/* Body */}
      <Box args={[0.3, 0.6, 0.2]} position={[0, -4.1, 0]}>
        <meshStandardMaterial color="#3498db" />
      </Box>
      
      {/* Arms */}
      <Box args={[0.1, 0.4, 0.1]} position={[-0.25, -4, 0]}>
        <meshStandardMaterial color="#f4d03f" />
      </Box>
      <Box args={[0.1, 0.4, 0.1]} position={[0.25, -4, 0]}>
        <meshStandardMaterial color="#f4d03f" />
      </Box>
      
      {/* Legs */}
      <Box args={[0.1, 0.4, 0.1]} position={[-0.1, -4.6, 0]}>
        <meshStandardMaterial color="#2c3e50" />
      </Box>
      <Box args={[0.1, 0.4, 0.1]} position={[0.1, -4.6, 0]}>
        <meshStandardMaterial color="#2c3e50" />
      </Box>
    </group>
  )
}

// Floating Elements
function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.children.forEach((child, index) => {
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01
        child.rotation.x += 0.01 * (index + 1)
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating spheres */}
      <Sphere args={[0.3, 16, 16]} position={[-8, 5, -10]}>
        <meshStandardMaterial color="#d9c592" transparent opacity={0.6} />
      </Sphere>
      
      <Sphere args={[0.2, 16, 16]} position={[6, -2, -8]}>
        <meshStandardMaterial color="#7a5f32" transparent opacity={0.5} />
      </Sphere>
      
      <Sphere args={[0.4, 16, 16]} position={[-4, -6, -15]}>
        <meshStandardMaterial color="#644e2b" transparent opacity={0.4} />
      </Sphere>

      {/* Floating cylinders */}
      <Cylinder args={[0.2, 0.2, 1, 8]} position={[10, 6, -20]}>
        <meshStandardMaterial color="#b3954a" transparent opacity={0.5} />
      </Cylinder>
      
      <Cylinder args={[0.15, 0.15, 0.8, 8]} position={[-12, -4, -12]}>
        <meshStandardMaterial color="#e8dbb8" transparent opacity={0.4} />
      </Cylinder>
    </group>
  )
}

// Ground Plane
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#f3eed8" transparent opacity={0.3} />
    </mesh>
  )
}

export default function ThreeJSVisualization() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="h-96 bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-700">Loading 3D Scene...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full h-96 rounded-2xl overflow-hidden border border-primary-200"
    >
      <Canvas
        camera={{ position: [15, 10, 15], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #F5DEB3, #DEB887)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#FFD700" />
        
        {/* Scene Elements */}
        <Ground />
        
        {/* Road System */}
        <Road />
        
        {/* Buildings */}
        <Building 
          position={[-6, 0, -8]} 
          size={[2, 4, 2]} 
          color="#8B7355" 
          rotation={0.2}
        />
        <Building 
          position={[0, 0, -10]} 
          size={[3, 6, 3]} 
          color="#A0522D" 
          rotation={-0.1}
        />
        <Building 
          position={[8, 0, -6]} 
          size={[2.5, 5, 2.5]} 
          color="#CD853F" 
          rotation={0.3}
        />
        <Building 
          position={[-3, 0, -2]} 
          size={[1.5, 3, 1.5]} 
          color="#DEB887" 
          rotation={0.1}
        />
        <Building 
          position={[5, 0, -2]} 
          size={[2, 4, 2]} 
          color="#D2B48C" 
          rotation={-0.2}
        />
        
        {/* Vehicles on the road */}
        <Vehicle position={[-15, 0, 0]} color="#e74c3c" rotation={0} />
        <Vehicle position={[10, 0, 0]} color="#3498db" rotation={Math.PI} />
        <Vehicle position={[-5, 0, 0]} color="#f39c12" rotation={0.5} />
        
        {/* People walking */}
        <Person position={[-8, 0, 2.5]} rotation={0} />
        <Person position={[12, 0, -2.5]} rotation={Math.PI} />
        <Person position={[0, 0, 2.5]} rotation={0.3} />
        
        {/* Floating Elements */}
        <FloatingElements />
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={0.5}
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>
      
      {/* Controls Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-primary-700">
        <p className="flex items-center space-x-2">
          <span>Drag to rotate</span>
          <span>•</span>
          <span>Scroll to zoom</span>
          <span>•</span>
          <span>Pan to move</span>
        </p>
      </div>
    </motion.div>
  )
}
