import * as pc from 'playcanvas'
import { useRef } from 'react'
import { Entity } from '@playcanvas/react'
import { Camera, Script } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import PoseEffect from '../scripts/PoseEffect'
// components
import Island from './Island'
import Fruits from './Fruits'
import Cat from './Cat'
import Clouds from './Clouds'

function Scene() {
  const boundingBox = useRef(new pc.BoundingBox())
  const cameraEntity = useRef<pc.Entity>(null)

  return (
    <>
      <Entity position={[-8, 4.5, 18]} ref={cameraEntity}>
        <Camera clearColor="#6bd4d1" />
        <OrbitControls distanceMin={5} distanceMax={30} distance={20} />
        <Script script={PoseEffect} />
      </Entity>

      <Cat ref={{ boundingBox, cameraEntity }} />
      <Island ref={boundingBox} />
      <Fruits />
      <Clouds />
    </>
  )
}

export default Scene
