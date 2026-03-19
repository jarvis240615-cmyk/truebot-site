import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"

const stationPositions = [
  { target: [-2, -4, 0], color: "#3b82f6", scrollRange: [0.1, 0.3] },
  { target: [2, -8, 0], color: "#8b5cf6", scrollRange: [0.25, 0.5] },
  { target: [-1, -13, 0], color: "#10b981", scrollRange: [0.45, 0.7] },
  { target: [1, -18, 0], color: "#f59e0b", scrollRange: [0.65, 0.9] },
]

function ConnectorLine({ target, color, scrollRange }) {
  const ref = useRef()
  const scroll = useScroll()

  const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...target)]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  useFrame(() => {
    if (ref.current) {
      const offset = scroll.offset
      const visible = offset >= scrollRange[0] && offset <= scrollRange[1]
      const t = visible
        ? Math.min(1, (offset - scrollRange[0]) / (scrollRange[1] - scrollRange[0]) * 2)
        : 0
      ref.current.material.opacity = t * 0.4
    }
  })

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0} />
    </line>
  )
}

export function ConnectorLines() {
  return (
    <group>
      {stationPositions.map((s, i) => (
        <ConnectorLine key={i} target={s.target} color={s.color} scrollRange={s.scrollRange} />
      ))}
    </group>
  )
}
