import * as pc from 'playcanvas'

class BindAnimScript extends pc.Script {
  asset: pc.Asset | null = null

  initialize() {
    const animations = (this.asset?.resource as { animations: Array<pc.Asset> })
      ?.animations

    if (animations) {
      animations.forEach((animation: pc.Asset) => {
        if (this.entity.anim && this.entity.anim.baseLayer) {
          const resource = animation.resource as pc.AnimTrack
          if (resource) {
            this.entity.anim.baseLayer.assignAnimation(resource.name, resource)
          }
        }
      })
    }
  }
}

export default BindAnimScript
