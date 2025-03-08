import { Entity } from '@playcanvas/react'
import cloudGlb from '@assets/models/cloud.glb'
import Model from './components/Model'
import { CLOUDS_DATA } from '../../constant/scene'
import { Script } from '@playcanvas/react/components'
import FloatingScript from '../scripts/FloatingScript'

function Clouds() {
  return (
    <>
      {CLOUDS_DATA.map(({ position, scale }, index) => (
        <Entity key={index} position={position} scale={[scale, scale, scale]}>
          <Model url={cloudGlb} />
          <Script script={FloatingScript} clock={Math.random() * 5.0} />
        </Entity>
      ))}
    </>
  )
}

export default Clouds
