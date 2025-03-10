import { useContext, useEffect } from 'react'
import { StateContext, DEFAULT_HUNGER_LEVEL } from '../contexts/StateContext'
import hungerIcon from '@assets/images/pet-bowl.png'

function HungerLevel() {
  const { hungerLevel, setBubbleText } = useContext(StateContext)

  useEffect(() => {
    if (hungerLevel === 0) {
      setBubbleText("Thank you for feeding me! I'm full now.")
    }
  }, [hungerLevel, setBubbleText])

  return (
    <div className="hunger-level-container">
      {Array.from({ length: DEFAULT_HUNGER_LEVEL }).map((_, index) => (
        <div key={index} className="hunger-icon">
          <img
            src={hungerIcon}
            alt="hunger"
            style={{
              opacity: DEFAULT_HUNGER_LEVEL - hungerLevel > index ? 1 : 0.5,
              ...(!(DEFAULT_HUNGER_LEVEL - hungerLevel > index) && {
                filter: 'grayscale(80%)',
              }),
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default HungerLevel
