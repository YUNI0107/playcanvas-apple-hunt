import { useEffect, useRef, useState } from 'react'
import { Entity } from '@playcanvas/react'
import {
  Collision,
  Render,
  RigidBody,
  Script,
} from '@playcanvas/react/components'
import ShapePickerScript from '../scripts/ShapePickerScript'
import { useApp } from '@playcanvas/react/hooks'
import * as pc from 'playcanvas'

interface refType {
  boundingBox: React.RefObject<pc.BoundingBox>
  cameraEntity: React.RefObject<pc.Entity | null>
}

const DEFAULT_CAT_POSITION = [0, 1, 0]

function Cat({ ref }: { ref: refType }) {
  const app = useApp()
  const [position, setPosition] = useState(DEFAULT_CAT_POSITION)
  const [hitPosition, setHitPosition] = useState(DEFAULT_CAT_POSITION)
  const [eulers, setEulers] = useState([0, 0, 0])

  const vec3A = useRef(new pc.Vec3())
  const vec3B = useRef(new pc.Vec3())
  const vec3C = useRef(new pc.Vec3())

  useEffect(() => {
    const handlePick = (hitPosition: pc.Vec3, eulers: pc.Vec3) => {
      const positionArray = hitPosition.toArray()
      if (Array.isArray(positionArray)) setHitPosition(positionArray)

      const eulerArray = eulers.toArray()
      if (Array.isArray(eulerArray)) setEulers(eulerArray)
    }

    app.on('shape:pick', handlePick)

    return () => {
      app.off('shape:pick', handlePick)
    }
  }, [app])

  useEffect(() => {
    const update = (dt: number) => {
      if (!vec3A.current || !vec3B.current || !vec3C.current) return

      const positionVec3 = vec3A.current
      const hitPositionVec3 = vec3B.current
      const nextPositionVec3 = vec3C.current

      positionVec3.fromArray(position)
      hitPositionVec3.fromArray(hitPosition)
      nextPositionVec3.set(0, 0, 0)

      if (positionVec3.equals(hitPositionVec3)) return

      nextPositionVec3.lerp(positionVec3, hitPositionVec3, dt * 10)
      nextPositionVec3.y = 1

      const array = nextPositionVec3.toArray()
      if (Array.isArray(array)) setPosition(array)
    }

    app.on('update', update)
    return () => {
      app.off('update', update)
    }
  }, [app, position, hitPosition])

  return (
    <Entity name="cat" position={position} rotation={eulers}>
      <Render type="box" />
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
