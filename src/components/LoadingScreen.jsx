import { useState, useEffect } from "react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(() => setDone(true), 500)
          return 100
        }
        return p + 2
      })
    }, 30)
    return () => clearInterval(timer)
  }, [])

  if (done) return null

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#020817", zIndex: 9999,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transition: "opacity 0.5s", opacity: progress === 100 ? 0 : 1,
      fontFamily: "Orbitron, sans-serif", color: "white"
    }}>
      <div style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px",
        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        TrueBot AI
      </div>
      <div style={{ color: "#475569", fontSize: "0.8rem", letterSpacing: "4px", marginBottom: "40px" }}>
        INITIALIZING
      </div>
      <div style={{ width: "200px", height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          width: `${progress}%`, transition: "width 0.1s", borderRadius: "2px" }} />
      </div>
      <div style={{ marginTop: "16px", color: "#3b82f6", fontSize: "1.5rem", fontWeight: 700 }}>
        {progress}%
      </div>
    </div>
  )
}
