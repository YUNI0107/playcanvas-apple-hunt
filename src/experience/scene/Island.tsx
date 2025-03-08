import glb from '@assets/models/island.glb'
import useAsset from '../hooks/useAsset'
import Model from '../components/Model'
import { Entity } from '@playcanvas/react'
import { useContext, useEffect } from 'react'
import { StateContext } from '../../contexts/StateContext'

function Island({
  ref: boundingBox,
}: {
  ref: React.RefObject<pc.BoundingBox>
}) {
  const { data: asset } = useAsset(glb, 'container')

  const { groundPosition, groundScale } = useContext(StateContext)

  useEffect(() => {
    if (boundingBox.current) {
      boundingBox.current.center.fromArray(groundPosition)
      boundingBox.current.halfExtents.fromArray(groundScale.map((s) => s / 2))
    }
  }, [groundScale, groundPosition, boundingBox])

  if (!asset) return null

  return (
    <>
      <Model
        name="island"
        url={glb}
        scale={[0.1, 0.1, 0.1]}
        position={[0, 0.25, 0]}
      />

      <Entity name="ground" scale={groundScale} />
    </>
  )
}

export default Island
