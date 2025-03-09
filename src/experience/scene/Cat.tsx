import { useContext, useEffect, useRef, useState } from 'react'
import { Entity } from '@playcanvas/react'
import { Collision, RigidBody, Script } from '@playcanvas/react/components'
import ShapePickerScript from '../scripts/ShapePickerScript'
import { useApp } from '@playcanvas/react/hooks'
import * as pc from 'playcanvas'
import Model from '../components/Model'
import CatAnimStateScript from '../scripts/CatAnimStateScript'
import { StateContext } from '../../contexts/StateContext'
import catGlb from '@assets/models/cat.glb'
import Shadow from '../components/Shadow'

interface refType {
  boundingBox: React.RefObject<pc.BoundingBox>
  cameraEntity: React.RefObject<pc.Entity | null>
}

const DEFAULT_CAT_POSITION = [0, 0, 0]

function Cat({ ref }: { ref: refType }) {
  const app = useApp()
  const { setBubbleText, setCatScreenCoord } = useContext(StateContext)
  const [position, setPosition] = useState(DEFAULT_CAT_POSITION)
  const [eulers, setEulers] = useState([0, 180, 0])
  const [isRunning, setIsRunning] = useState(false)

  const fromPositionRef = useRef(new pc.Vec3())
  const hitPositionRef = useRef(new pc.Vec3().fromArray(DEFAULT_CAT_POSITION))
  const timerRef = useRef(0)
  const vec3A = useRef(new pc.Vec3())
  const vec3B = useRef(new pc.Vec3())

  useEffect(() => {
    const handlePick = (hitPosition: pc.Vec3, eulers: pc.Vec3) => {
      timerRef.current = 0
      hitPositionRef.current.copy(hitPosition)
      fromPositionRef.current.fromArray(position)

      const eulerArray = eulers.toArray()
      if (Array.isArray(eulerArray)) setEulers(eulerArray)

      setIsRunning(true)
      app.fire('cat:animationState', 'Run')
    }

    app.on('shape:pick', handlePick)
    return () => {
      app.off('shape:pick', handlePick)
    }
  }, [app, position])

  useEffect(() => {
    const update = (dt: number) => {
      const fromPosition = fromPositionRef.current
      const hitPositionVec3 = hitPositionRef.current
      const distance = fromPosition.distance(hitPositionVec3)

      const baseSpeed = 0.5
      const maxSpeed = 2.0
      const scaleFactor = 5
      let speedFactor = baseSpeed + (scaleFactor / distance + 0.1)
      speedFactor = Math.min(speedFactor, maxSpeed)
      timerRef.current += dt * speedFactor
      const timer = Math.min(timerRef.current, 1)

      const nextPositionVec3 = vec3B.current
      const positionVec3 = vec3A.current
      positionVec3.fromArray(position)

      nextPositionVec3.lerp(fromPosition, hitPositionVec3, timer)
      nextPositionVec3.y = 0

      const array = nextPositionVec3.toArray()
      if (Array.isArray(array)) setPosition(array)

      const equal = nextPositionVec3.equalsApprox(hitPositionVec3, 1e-3)
      if (equal) {
        const array = hitPositionVec3.toArray()
        if (Array.isArray(array)) setPosition(array)

        if (isRunning) {
          app.fire('cat:animationState', 'Idle')
          setIsRunning(false)
        }
      }

      // worldToScreen
      const cameraEntity = ref.cameraEntity.current
      if (cameraEntity && cameraEntity.camera) {
        positionVec3.y += 3
        const screenCoord = cameraEntity.camera.worldToScreen(positionVec3)
        setCatScreenCoord(screenCoord)
      }
    }

    app.on('update', update)
    return () => {
      app.off('update', update)
    }
  }, [app, position, isRunning, setCatScreenCoord, ref])

  useEffect(() => {
    setBubbleText("I'm hungry!")
  }, [setBubbleText])

  return (
    <Entity name="cat" position={position} rotation={eulers}>
      <Model
        url={catGlb}
        rotation={[0, 180, 0]}
        position={[0, 0.4, 0]}
        scale={[1.5, 1.5, 1.5]}
        useAnim={true}
      >
        <Script script={CatAnimStateScript} />

        <Shadow scale={[0.8, 0.8, 0.8]} />
      </Model>

      <Script
        script={ShapePickerScript}
        boundingBoxRef={ref.boundingBox}
        cameraEntityRef={ref.cameraEntity}
      />
      <RigidBody type="kinematic" />
      <Collision type="box" halfExtents={[0.5, 0.5, 0.5]} />
    </Entity>
  )
}

export default Cat
