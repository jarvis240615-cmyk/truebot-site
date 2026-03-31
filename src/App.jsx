import { Canvas } from "@react-three/fiber"
import { ScrollControls, Preload, Stars } from "@react-three/drei"
import { Suspense, Component } from "react"
import { CameraRig } from "./components/CameraRig"
import { TrueBotCore } from "./components/TrueBotCore"
import { Stations } from "./components/Stations"
import { Particles } from "./components/Particles"
import { LoadingScreen } from "./components/LoadingScreen"

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) return (
      <div style={{ color: "white", padding: "40px", background: "#020817", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <h2 style={{ color: "#3b82f6" }}>Loading TrueBot AI...</h2>
          <p style={{ color: "#64748b", marginTop: "8px" }}>Please try refreshing</p>
          <pre style={{ color: "#ef4444", fontSize: "12px", marginTop: "16px" }}>{this.state.error?.message}</pre>
        </div>
      </div>
    )
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <div style={{ width: "100vw", height: "100vh", background: "#020817", position: "relative" }}>
        <Canvas
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <color attach="background" args={["#020817"]} />
          <fog attach="fog" args={["#020817", 15, 40]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 5]} intensity={0.8} color="#3b82f6" />
          <Suspense fallback={null}>
            <Stars radius={50} depth={30} count={2000} factor={3} fade />
            <ScrollControls pages={6} damping={0.15}>
              <CameraRig />
              <TrueBotCore />
              <Stations />
              <Particles />
            </ScrollControls>
            <Preload all />
          </Suspense>
        </Canvas>

        {/* Hero text overlay */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -60%)",
          textAlign: "center", pointerEvents: "none", zIndex: 10,
          color: "white", fontFamily: "'Orbitron', sans-serif",
          width: "90%", maxWidth: "700px"
        }}>
          <p style={{ color: "#60a5fa", letterSpacing: "4px", fontSize: "0.8rem", marginBottom: "16px", textTransform: "uppercase" }}>
            [ AI Platform Online • v3.0 ]
          </p>
          <h1 style={{
            fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "20px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
          }}>
            Empowering SMEs<br />with Practical AI.
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: "32px", fontFamily: "system-ui" }}>
            24/7 automation for chat, voice, agents & finance.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", border: "none",
              color: "white", padding: "14px 32px", borderRadius: "50px",
              fontSize: "1rem", fontWeight: 700, cursor: "pointer", pointerEvents: "all"
            }}>Get Started Free →</button>
            <button style={{
              background: "transparent", border: "1px solid rgba(99,102,241,0.5)",
              color: "white", padding: "14px 32px", borderRadius: "50px",
              fontSize: "1rem", cursor: "pointer", pointerEvents: "all"
            }}>Watch Demo ▶</button>
          </div>
          <div style={{ marginTop: "48px", color: "#475569", fontSize: "0.85rem" }}>
            ↓ scroll to explore
          </div>
        </div>

        <LoadingScreen />
      </div>
    </ErrorBoundary>
  )
}
