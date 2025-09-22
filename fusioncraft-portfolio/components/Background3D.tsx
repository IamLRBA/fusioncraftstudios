'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
      groupRef.current.children.forEach((child, index) => {
        child.rotation.x += 0.002 * (index + 1)
        child.rotation.z += 0.001 * (index + 1)
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating spheres */}
      <Sphere args={[0.5, 16, 16]} position={[-10, 5, -15]}>
        <meshStandardMaterial color="#f97316" transparent opacity={0.3} />
      </Sphere>
      
      <Sphere args={[0.3, 16, 16]} position={[8, -3, -10]}>
        <meshStandardMaterial color="#78716c" transparent opacity={0.2} />
      </Sphere>
      
      <Sphere args={[0.7, 16, 16]} position={[-5, -8, -20]}>
        <meshStandardMaterial color="#6c757d" transparent opacity={0.25} />
      </Sphere>

      {/* Floating boxes */}
      <Box args={[1, 1, 1]} position={[12, 7, -25]}>
        <meshStandardMaterial color="#ea580c" transparent opacity={0.2} />
      </Box>
      
      <Box args={[0.8, 0.8, 0.8]} position={[-15, -5, -18]}>
        <meshStandardMaterial color="#495057" transparent opacity={0.15} />
      </Box>

      {/* Floating torus */}
      <Torus args={[1, 0.3, 8, 16]} position={[0, 10, -30]}>
        <meshStandardMaterial color="#f97316" transparent opacity={0.2} />
      </Torus>
    </group>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <FloatingShapes />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
} 