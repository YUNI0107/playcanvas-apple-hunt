import waterGlb from '@assets/models/water.glb'
import WaterTransformScript from '../scripts/WaterTransformScript'
import { Script } from '@playcanvas/react/components'
import Model from '../components/Model'

function Water() {
  return (
    <Model
      name="water"
      url={waterGlb}
      scale={[0.05, 0.05, 0.05]}
      position={[0, -2.5, 0]}
    >
      <Script script={WaterTransformScript} />
    </Model>
  )
}

export default Water
