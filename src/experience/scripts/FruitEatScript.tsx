import * as pc from 'playcanvas'

class FruitEatScript extends pc.Script {
  initialize() {
    if (this.entity.collision) {
      this.entity.collision.on('triggerenter', this.handleFruitEat, this)
    }

    this.on('destroy', () => {
      if (this.entity.collision) {
        this.entity.collision.off('triggerenter', this.handleFruitEat, this)
      }
    })
  }

  handleFruitEat() {
    this.app.fire('fruit:eat', this.entity.name)
  }
}

export default FruitEatScript
