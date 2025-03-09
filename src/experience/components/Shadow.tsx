import * as pc from 'playcanvas'
import shadowTexture from '@assets/textures/shadow.png'
import useAsset from '../hooks/useAsset'
import { useMaterial } from '@playcanvas/react/hooks'
import { Render } from '@playcanvas/react/components'
import { Entity } from '@playcanvas/react'

function Shadow({ scale = [1, 1, 1] }: { scale?: number[] }) {
  const { data: texture } = useAsset(shadowTexture, 'texture')
  const shadowMaterial = useMaterial({
    blendType: pc.BLENDMODE_ONE_MINUS_DST_COLOR,
    // @ts-expect-error Property 'diffuseMap' does not exist on type 'Material'
    diffuseMap: texture?.resource || null,
  })

  return (
    <Entity name="shadow" position={[0, 0.01, 0]} scale={scale}>
      <Render type="plane" material={shadowMaterial} />
    </Entity>
  )
}

export default Shadow
