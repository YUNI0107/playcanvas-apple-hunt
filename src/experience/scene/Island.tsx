import { Entity } from '@playcanvas/react'
import { useContext, useEffect } from 'react'
import Model from '../components/Model'
import { StateContext } from '../../contexts/StateContext'
import islandGlb from '@assets/models/island.glb'
import waterGlb from '@assets/models/water.glb'

function Island({
  ref: boundingBox,
}: {
  ref: React.RefObject<pc.BoundingBox>
}) {
  const { groundPosition, groundScale } = useContext(StateContext)

  useEffect(() => {
    if (boundingBox.current) {
      boundingBox.current.center.fromArray(groundPosition)
      boundingBox.current.halfExtents.fromArray(groundScale.map((s) => s / 2))
    }
  }, [groundScale, groundPosition, boundingBox])

  return (
    <>
      <Model
        name="island"
        url={islandGlb}
        scale={[0.1, 0.1, 0.1]}
        position={[0, 0.25, 0]}
      />

      <Model
        name="water"
        url={waterGlb}
        scale={[0.05, 0.05, 0.05]}
        position={[0, -2.5, 0]}
      />

      <Entity name="ground" scale={groundScale} />
    </>
  )
}

export default Island
