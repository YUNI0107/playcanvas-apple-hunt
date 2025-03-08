import { Entity } from '@playcanvas/react'
import { Light } from '@playcanvas/react/components'
import { EnvAtlas } from '@playcanvas/react/components'
import useAsset from './hooks/useAsset'
import envAtlasUrl from '@assets/textures/env_atlas.png'

function Enviroment() {
  const { data: envAtlas } = useAsset(envAtlasUrl, 'texture')

  return (
    <>
      {envAtlas && (
        <EnvAtlas asset={envAtlas} intensity={1} showSkybox={false} />
      )}
      <Entity name="light" rotation={[45, -45, 45]}>
        <Light type="directional" />
      </Entity>
    </>
  )
}

export default Enviroment
