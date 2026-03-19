import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Float } from "@react-three/drei"
import { ProductCard } from "./ProductCard"
import { ConnectorLines } from "./ConnectorLines"
import * as THREE from "three"

// ── Station 1: TruChat ──
function ChatBubbles() {
  const groupRef = useRef()
  const bubbles = [
    { pos: [-1.5, -3.5, 0.5], scale: [0.8, 0.5, 0.3] },
    { pos: [-0.5, -4.2, -0.3], scale: [1, 0.4, 0.3] },
    { pos: [-1.8, -4.8, 0.2], scale: [0.6, 0.35, 0.25] },
    { pos: [-0.8, -3.2, -0.5], scale: [0.7, 0.4, 0.28] },
    { pos: [-2.2, -4, 0.8], scale: [0.5, 0.3, 0.2] },
    { pos: [-1, -5, 0.4], scale: [0.9, 0.45, 0.3] },
  ]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y = bubbles[i].pos[1] + Math.sin(state.clock.getElapsedTime() * 0.6 + i) * 0.15
      })
    }
  })

  return (
    <group ref={groupRef}>
      {bubbles.map((b, i) => (
        <RoundedBox key={i} position={b.pos} args={b.scale} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.3} transparent opacity={0.7} />
        </RoundedBox>
      ))}
      <pointLight position={[-1.5, -4, 2]} color="#3b82f6" intensity={3} distance={8} />
    </group>
  )
}

// ── Station 2: TruVoice ──
function SoundWaves() {
  const refs = useRef([])

  useFrame((state) => {
    refs.current.forEach((ref, i) => {
      if (ref) {
        const t = state.clock.getElapsedTime()
        ref.scale.y = 0.5 + Math.sin(t * 2 + i * 0.8) * 0.4
        ref.scale.x = 0.8 + Math.sin(t * 1.5 + i * 0.5) * 0.2
      }
    })
  })

  return (
    <group>
      {/* Sound wave bars */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={[1.5 + (i - 3) * 0.35, -8, 0]}
        >
          <boxGeometry args={[0.12, 1, 0.12]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Microphone body */}
      <mesh position={[3, -7.5, 0.5]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[3, -7.1, 0.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#c4b5fd" metalness={0.6} roughness={0.3} />
      </mesh>
      <pointLight position={[2, -8, 2]} color="#8b5cf6" intensity={3} distance={8} />
    </group>
  )
}

// ── Station 3: TruAgent ──
function AgentNetwork() {
  const groupRef = useRef()
  const nodePositions = [
    [-1, -12.5, 0.5], [0.5, -13, -0.3], [-2, -13.5, 0],
    [0, -12, 0.8], [-1.5, -14, 0.4], [1, -12.5, 0.5],
    [-0.5, -14, -0.5], [0.5, -14.5, 0.3],
  ]

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [1, 5], [2, 6], [0, 3],
  ]

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      groupRef.current.children.forEach((child, i) => {
        if (i < nodePositions.length && child.isMesh) {
          child.scale.setScalar(0.12 + Math.sin(t * 2 + i) * 0.03)
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {edges.map(([a, b], i) => {
        const start = new THREE.Vector3(...nodePositions[a])
        const end = new THREE.Vector3(...nodePositions[b])
        const points = [start, end]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={`edge-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#10b981" transparent opacity={0.4} />
          </line>
        )
      })}
      <pointLight position={[-1, -13, 2]} color="#10b981" intensity={3} distance={8} />
    </group>
  )
}

// ── Station 4: TruFinance ──
function FinanceElements() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      groupRef.current.children.forEach((child, i) => {
        if (child.isMesh) {
          child.rotation.y = t * 0.5 + i
          child.position.y = child.userData.baseY + Math.sin(t * 0.7 + i * 0.8) * 0.2
        }
      })
    }
  })

  const coins = [
    { pos: [0.5, -17.5, 0.5], baseY: -17.5 },
    { pos: [1.5, -18, -0.3], baseY: -18 },
    { pos: [0, -18.5, 0.8], baseY: -18.5 },
    { pos: [2, -17.3, 0], baseY: -17.3 },
  ]

  const docs = [
    { pos: [-0.5, -17.8, 0.3], rot: [0.2, 0.3, 0.1] },
    { pos: [1, -18.8, -0.5], rot: [-0.1, -0.2, 0.15] },
  ]

  return (
    <group ref={groupRef}>
      {coins.map((c, i) => (
        <mesh key={`coin-${i}`} position={c.pos} userData={{ baseY: c.baseY }} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.06, 24]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {docs.map((d, i) => (
        <mesh key={`doc-${i}`} position={d.pos} rotation={d.rot} userData={{ baseY: d.pos[1] }}>
          <boxGeometry args={[0.5, 0.7, 0.03]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.2} transparent opacity={0.6} />
        </mesh>
      ))}
      <pointLight position={[1, -18, 2]} color="#f59e0b" intensity={3} distance={8} />
    </group>
  )
}

export function Stations() {
  return (
    <group>
      <ambientLight intensity={0.3} />

      {/* Station 1: TruChat */}
      <ChatBubbles />
      <ProductCard
        position={[-3, -4, 0]}
        title="TruChat"
        description="24/7 Intelligent Conversations — AI chatbots that understand context and deliver human-like support."
        color="#3b82f6"
        icon="💬"
        stats={[
          { value: "10M+", label: "Messages" },
          { value: "98%", label: "Satisfaction" },
        ]}
      />

      {/* Station 2: TruVoice */}
      <SoundWaves />
      <ProductCard
        position={[3, -8, 0]}
        title="TruVoice"
        description="Human-like Voice Automation — natural conversations in 50+ languages with ultra-low latency."
        color="#8b5cf6"
        icon="🎙️"
        stats={[
          { value: "50+", label: "Languages" },
          { value: "<100ms", label: "Latency" },
        ]}
      />

      {/* Station 3: TruAgent */}
      <AgentNetwork />
      <ProductCard
        position={[-2.5, -13, 0]}
        title="TruAgent"
        description="Your smartest employee — automating CRM, follow-ups, and workflows so your team can focus on growth."
        color="#10b981"
        icon="🤖"
        stats={[
          { value: "500+", label: "Tasks/day" },
          { value: "80%", label: "Time Saved" },
        ]}
      />

      {/* Station 4: TruFinance */}
      <FinanceElements />
      <ProductCard
        position={[3, -18, 0]}
        title="TruFinance"
        description="Automated invoicing and payment tracking — streamline your financial operations with AI precision."
        color="#f59e0b"
        icon="💰"
        stats={[
          { value: "$2M+", label: "Processed" },
          { value: "99%", label: "Accuracy" },
        ]}
      />

      <ConnectorLines />
    </group>
  )
}
