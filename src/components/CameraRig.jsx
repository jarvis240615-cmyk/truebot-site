import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const waypoints = [
  { pos: new THREE.Vector3(0, 0, 8), look: new THREE.Vector3(0, 0, 0) },
  { pos: new THREE.Vector3(-4, -3, 5), look: new THREE.Vector3(-2, -4, 0) },
  { pos: new THREE.Vector3(4, -7, 5), look: new THREE.Vector3(2, -8, 0) },
  { pos: new THREE.Vector3(-3, -12, 4), look: new THREE.Vector3(-1, -13, 0) },
  { pos: new THREE.Vector3(3, -17, 5), look: new THREE.Vector3(1, -18, 0) },
  { pos: new THREE.Vector3(0, -22, 6), look: new THREE.Vector3(0, -22, 0) },
]

const targetPos = new THREE.Vector3()
const targetLook = new THREE.Vector3()
const currentLook = new THREE.Vector3()

export function CameraRig() {
  const scroll = useScroll()

  useFrame((state) => {
    const offset = scroll.offset * (waypoints.length - 1)
    const i = Math.min(Math.floor(offset), waypoints.length - 2)
    const t = offset - i

    targetPos.lerpVectors(waypoints[i].pos, waypoints[i + 1].pos, t)
    targetLook.lerpVectors(waypoints[i].look, waypoints[i + 1].look, t)

    state.camera.position.lerp(targetPos, 0.08)
    currentLook.lerp(targetLook, 0.08)
    state.camera.lookAt(currentLook)
  })

  return null
}
