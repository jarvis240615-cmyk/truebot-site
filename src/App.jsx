import { Canvas } from "@react-three/fiber"
import { ScrollControls, Preload } from "@react-three/drei"
import { Suspense } from "react"
import { CameraRig } from "./components/CameraRig"
import { TrueBotCore } from "./components/TrueBotCore"
import { Stations } from "./components/Stations"
import { Particles } from "./components/Particles"
import { LoadingScreen } from "./components/LoadingScreen"

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#020817" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.1}>
            <CameraRig />
            <TrueBotCore />
            <Stations />
            <Particles />
          </ScrollControls>
          <Preload all />
        </Suspense>
      </Canvas>
      <LoadingScreen />
      {/* DOM overlay for hero text */}
      <div id="hero-overlay" style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -60%)",
        textAlign: "center", pointerEvents: "none", zIndex: 10,
        color: "white", fontFamily: "Orbitron, sans-serif"
      }}>
        <p style={{ color: "#60a5fa", letterSpacing: "4px", fontSize: "0.85rem", marginBottom: "16px" }}>
          [ AI PLATFORM ONLINE ]
        </p>
        <h1 style={{ fontSize: "clamp(2rem,6vw,5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "20px",
          background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Empowering SMEs<br />with Practical AI.
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: "32px" }}>
          24/7 automation for chat, voice, agents & finance.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button style={{
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", border: "none",
            color: "white", padding: "14px 32px", borderRadius: "50px",
            fontSize: "1rem", fontWeight: 700, cursor: "pointer"
          }}>Get Started Free →</button>
          <button style={{
            background: "transparent", border: "1px solid rgba(99,102,241,0.4)",
            color: "white", padding: "14px 32px", borderRadius: "50px",
            fontSize: "1rem", cursor: "pointer"
          }}>Watch Demo ▶</button>
        </div>
        <div style={{ marginTop: "48px", color: "#475569", fontSize: "0.85rem", animation: "bounce 2s infinite" }}>
          ↓ scroll to explore
        </div>
      </div>
    </div>
  )
}
