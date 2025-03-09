import * as pc from 'playcanvas'

class ShapePickerScript extends pc.Script {
  ray: pc.Ray = new pc.Ray()
  hitPosition: pc.Vec3 = new pc.Vec3()
  nextPosition: pc.Vec3 = new pc.Vec3()
  lookAtPosition: pc.Vec3 = new pc.Vec3()

  speed = 10
  positionY = 0
  boundingBoxRef: { current: pc.BoundingBox } | null = null
  cameraEntityRef: { current: pc.Entity } | null = null

  initialize() {
    this.positionY = this.entity.getPosition().y

    if (this.app.mouse) {
      this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this)
    }

    this.on('destroy', () => {
      if (this.app.mouse) {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this)
      }
    })
  }

  onMouseDown(event: pc.MouseEvent) {
    if (event.button == pc.MOUSEBUTTON_LEFT) {
      this.doRayCast(event)
    }
  }

  doRayCast(event: pc.MouseEvent) {
    if (!this.boundingBoxRef || !this.cameraEntityRef) return

    const cameraEntity = this.cameraEntityRef.current
    const camera = cameraEntity.camera
    if (!camera) return

    camera.screenToWorld(event.x, event.y, camera.farClip, this.ray.direction)
    this.ray.origin.copy(cameraEntity.getPosition())
    this.ray.direction.sub(this.ray.origin).normalize()

    const boundingBox = this.boundingBoxRef.current
    const result = boundingBox.intersectsRay(this.ray, this.hitPosition)
    if (result) {
      this.lookAtPosition.copy(this.hitPosition)
      this.lookAtPosition.y = this.positionY
      this.entity.lookAt(this.lookAtPosition)

      this.app.fire(
        'shape:pick',
        this.lookAtPosition,
        this.entity.getEulerAngles()
      )
    }
  }
}

export default ShapePickerScript
