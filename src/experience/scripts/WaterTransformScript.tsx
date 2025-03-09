import * as pc from 'playcanvas'

class WaterTransformScript extends pc.Script {
  private water: pc.Entity | null = null

  initialize() {
    this.water = this.entity
  }

  update(dt: number) {
    const rotateY = dt * 2
    if (this.water) this.water.rotateLocal(0, rotateY, 0)
  }
}

export default WaterTransformScript
