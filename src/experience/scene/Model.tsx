import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import glb from '@assets/organic_objects_v2.glb'

// hooks
import useAsset from '../hooks/useAsset'

function Model() {
  const { data: asset } = useAsset(glb, 'container')
  if (!asset) return null

  return (
    <>
      <Entity name="model">
        <Render type="asset" asset={asset} />
      </Entity>
    </>
  )
}

export default Model
