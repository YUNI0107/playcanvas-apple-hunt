import * as pc from 'playcanvas'

class FloatingScript extends pc.Script {
  clock: number = 0
  defaultPosition: pc.Vec3 = new pc.Vec3()

  initialize() {
    this.defaultPosition.copy(this.entity.getPosition())
  }

  update(dt: number) {
    this.clock += dt
    const floatDelta = Math.sin(this.clock) * 0.5

    this.entity.setPosition(
      this.defaultPosition.x,
      this.defaultPosition.y + floatDelta,
      this.defaultPosition.z
    )
  }
}

export default FloatingScript
