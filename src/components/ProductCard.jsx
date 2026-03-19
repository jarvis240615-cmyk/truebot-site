import { Html } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

const cardStyle = {
  background: "rgba(14, 20, 60, 0.6)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(99,102,241,0.3)",
  borderRadius: "20px",
  padding: "24px 28px",
  width: "320px",
  boxShadow: "0 0 40px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
  color: "white",
  fontFamily: "system-ui, sans-serif",
}

export function ProductCard({ position, title, description, color = "#3b82f6", icon = "🤖", stats = [] }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Html transform distanceFactor={8} center>
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <span style={{ fontSize: "2rem" }}>{icon}</span>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "3px", color: color, textTransform: "uppercase" }}>
                TRUEBOT
              </div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{title}</div>
            </div>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{description}</p>
          {stats.length > 0 && (
            <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color }}>{s.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
          <button style={{
            marginTop: "16px", width: "100%", padding: "10px",
            background: `linear-gradient(135deg, ${color}, #8b5cf6)`,
            border: "none", borderRadius: "10px", color: "white",
            fontWeight: 600, cursor: "pointer", fontSize: "0.9rem"
          }}>Learn More →</button>
        </div>
      </Html>
    </group>
  )
}
