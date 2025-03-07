import * as pc from 'playcanvas'
import { useRef } from 'react'
// import Model from './Model'
import { Entity } from '@playcanvas/react'
import { Camera } from '@playcanvas/react/components'
import { OrbitControls } from '@playcanvas/react/scripts'
import Fruits from './Fruits'
import Cat from './Cat'
import Ground from './Ground'

function Scene() {
  const boundingBox = useRef(new pc.BoundingBox())
  const cameraEntity = useRef<pc.Entity>(null)

  return (
    <>
      {/* <Model /> */}

      <Entity position={[0, 10, 10]} ref={cameraEntity}>
        <Camera clearColor="blue" />
        <OrbitControls distanceMin={5} distanceMax={1000} distance={20} />
      </Entity>

      <Cat ref={{ boundingBox, cameraEntity }} />

      <Ground ref={boundingBox}></Ground>
      <Fruits />
    </>
  )
}

export default Scene
