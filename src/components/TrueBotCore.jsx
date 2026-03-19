import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere, Float, useScroll } from "@react-three/drei"
import * as THREE from "three"

export function TrueBotCore() {
  const meshRef = useRef()
  const scroll = useScroll()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const offset = scroll.offset
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3
      meshRef.current.rotation.x = t * 0.1
      const scale = Math.max(0.5, 1.5 - offset * 2)
      meshRef.current.scale.setScalar(scale)
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = Math.max(0, 0.3 - offset * 0.5)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Outer glow */}
        <Sphere ref={glowRef} args={[2.2, 32, 32]}>
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.04} side={THREE.BackSide} />
        </Sphere>
        {/* Core sphere */}
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
          <MeshDistortMaterial
            color="#3b82f6"
            speed={3}
            distort={0.4}
            radius={1}
            emissive="#1e3a8a"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        {/* Orbiting rings */}
        {[0, 1, 2].map((i) => (
          <OrbitalRing key={i} index={i} />
        ))}
      </group>
    </Float>
  )
}

function OrbitalRing({ index }) {
  const ref = useRef()
  const colors = ["#3b82f6", "#8b5cf6", "#ec4899"]
  const angles = [0, Math.PI / 3, (Math.PI * 2) / 3]
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * (0.3 + index * 0.15)
    }
  })
  return (
    <mesh ref={ref} rotation={[angles[index], 0, 0]}>
      <torusGeometry args={[2 + index * 0.5, 0.015, 8, 100]} />
      <meshBasicMaterial color={colors[index]} transparent opacity={0.6} />
    </mesh>
  )
}
