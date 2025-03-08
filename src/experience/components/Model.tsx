import { Entity } from '@playcanvas/react'
import { Render } from '@playcanvas/react/components'
import useAsset from '../hooks/useAsset'

function Model({
  url,
  name,
  scale,
  position,
  rotation,
  children,
  onPointerOver,
  onPointerOut,
}: {
  url: string
  name?: string
  scale?: number[]
  position?: number[]
  rotation?: number[]
  children?: React.ReactNode
  onPointerOver?: () => void
  onPointerOut?: () => void
}) {
  const { data: asset } = useAsset(url, 'container')
  if (!asset) return null

  name = name || ''
  position = position || [0, 0, 0]
  scale = scale || [1, 1, 1]
  rotation = rotation || [0, 0, 0]

  return (
    <>
      <Entity
        name={name}
        scale={scale}
        position={position}
        rotation={rotation}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <Render type="asset" asset={asset} />
        {children}
      </Entity>
    </>
  )
}

export default Model
