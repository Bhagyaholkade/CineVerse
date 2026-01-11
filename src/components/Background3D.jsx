import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// Smooth Gradient Sphere
function GradientSphere() {
  const sphereRef = useRef()

  useFrame((state) => {
    sphereRef.current.rotation.x = state.clock.elapsedTime * 0.05
    sphereRef.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <mesh ref={sphereRef} position={[8, 5, -15]}>
      <sphereGeometry args={[4, 64, 64]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.7}
        roughness={0.3}
        emissive="#4f46e5"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// Floating Geometric Shapes
function FloatingShapes() {
  const groupRef = useRef()

  const shapes = useMemo(() => [
    { type: 'torus', position: [-10, -8, -20], rotation: [0.5, 0, 0], scale: 1.5 },
    { type: 'octahedron', position: [12, -5, -18], rotation: [0, 0.5, 0], scale: 2 },
    { type: 'icosahedron', position: [-8, 8, -22], rotation: [0.3, 0.3, 0], scale: 1.8 }
  ], [])

  useFrame((state) => {
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += 0.003
      child.rotation.y += 0.005
      child.position.y += Math.sin(state.clock.elapsedTime + i * 2) * 0.01
    })
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} rotation={shape.rotation} scale={shape.scale}>
          {shape.type === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
          {shape.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {shape.type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

// Subtle Particle Field
function ParticleField() {
  const particlesRef = useRef()
  const particleCount = 800

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10
    }
    return pos
  }, [])

  useFrame((state) => {
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a78bfa"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

// Elegant Wave Plane
function WavePlane() {
  const planeRef = useRef()
  const gridSize = 50
  const segments = 50

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments)
    const positions = geo.attributes.position.array
    const originalPositions = new Float32Array(positions.length)
    
    for (let i = 0; i < positions.length; i++) {
      originalPositions[i] = positions[i]
    }
    geo.userData.originalPositions = originalPositions
    
    return geo
  }, [])

  useFrame((state) => {
    const positions = planeRef.current.geometry.attributes.position.array
    const originalPositions = planeRef.current.geometry.userData.originalPositions
    const time = state.clock.elapsedTime * 0.5

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i]
      const y = originalPositions[i + 1]
      
      positions[i + 2] = Math.sin(x * 0.15 + time) * Math.cos(y * 0.15 + time) * 1.5
    }

    planeRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <mesh 
      ref={planeRef} 
      geometry={geometry}
      rotation={[-Math.PI / 2.5, 0, 0]}
      position={[0, -10, -15]}
    >
      <meshStandardMaterial
        color="#4c1d95"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}

// Ambient Rings
function AmbientRings() {
  const ringsRef = useRef()

  useFrame((state) => {
    ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
    ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1
  })

  return (
    <group ref={ringsRef} position={[-5, 0, -25]}>
      {[6, 8, 10].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.08, 16, 64]} />
          <meshStandardMaterial
            color="#7c3aed"
            transparent
            opacity={0.3 - i * 0.08}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, 0, -10]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
      
      <GradientSphere />
      <FloatingShapes />
      <ParticleField />
      <WavePlane />
      <AmbientRings />
    </>
  )
}

export default function Background3D() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      background: 'linear-gradient(to bottom, #0f0a1e 0%, #1a0f2e 50%, #0a0612 100%)'
    }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <fog attach="fog" args={['#0a0612', 10, 50]} />
        <Scene />
      </Canvas>
    </div>
  )
}
