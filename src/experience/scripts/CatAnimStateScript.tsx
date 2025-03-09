import * as pc from 'playcanvas'

const ANIM_STATES = {
  IDLE: 'Idle',
  RUN: 'Run',
}

type AnimStateType = (typeof ANIM_STATES)[keyof typeof ANIM_STATES]

class CatAnimStateScript extends pc.Script {
  animationState: AnimStateType = ANIM_STATES.IDLE
  needRolling: boolean = false

  initialize() {
    this.animationState = ANIM_STATES.IDLE
    this.needRolling = false
    this.playAnimation('Idle_A')
    this.app.on('cat:animationState', this.handleStateChanged, this)
    this.app.on('cat:eatFruit', this.handleFruitEaten, this)

    this.on('destroy', () => {
      this.app.off('cat:animationState', this.handleStateChanged, this)
      this.app.on('cat:eatFruit', this.handleFruitEaten, this)
    })
  }

  handleFruitEaten() {
    this.needRolling = true
  }

  handleStateChanged(state: AnimStateType) {
    this.animationState = state

    if (state === ANIM_STATES.RUN) {
      this.playAnimation('Run')
    } else if (state === ANIM_STATES.IDLE) {
      if (this.needRolling) {
        this.playAnimation('Roll')
        this.needRolling = false
      } else {
        this.playAnimation('Idle_A')
      }
    }
  }

  playAnimation(state: string) {
    if (this.entity.anim && this.entity.anim.baseLayer) {
      this.entity.anim.baseLayer.transition(state)
    }
  }

  update() {
    if (this.entity.anim?.baseLayer) {
      const baseLayer = this.entity.anim.baseLayer
      const state = baseLayer.activeState
      if (state === 'Roll' && baseLayer.activeStateProgress >= 1) {
        this.playAnimation('Idle_A')
        this.needRolling = false
      }
    }
  }
}

export default CatAnimStateScript
