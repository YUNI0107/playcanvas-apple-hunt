import * as pc from 'playcanvas'

class PoseEffect extends pc.Script {
  cameraFrame: pc.CameraFrame | null = null

  initialize() {
    if (this.entity.camera) {
      this.cameraFrame = new pc.CameraFrame(this.app, this.entity.camera)
      this.cameraFrame.rendering.samples = 8
      // @ts-expect-error Property 'enabled' does not exist on type 'bloom'.
      this.cameraFrame.bloom.enabled = true
      this.cameraFrame.bloom.intensity = 0.01

      this.cameraFrame.update()
    }
  }
}

export default PoseEffect
