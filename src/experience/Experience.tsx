import { Application } from '@playcanvas/react'
import Enviroment from './Enviroment'
import Scene from './scene/Scene'

function Experience() {
  return (
    <Application usePhysics={true}>
      <Enviroment />
      <Scene />
    </Application>
  )
}

export default Experience
