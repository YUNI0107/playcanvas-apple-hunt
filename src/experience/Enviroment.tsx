import { Entity } from '@playcanvas/react'
import { Light } from '@playcanvas/react/components'

function Enviroment() {
  return (
    <>
      <Entity name="light" rotation={[45, -45, 45]}>
        <Light type="directional" />
      </Entity>
    </>
  )
}

export default Enviroment
