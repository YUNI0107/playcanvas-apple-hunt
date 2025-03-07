import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import { useContext, useEffect } from 'react'
import { StateContext } from '../../contexts/StateContext'

function Ground({
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
    <Entity name="ground" scale={groundScale}>
      <Render type="box" />
    </Entity>
  )
}

export default Ground
