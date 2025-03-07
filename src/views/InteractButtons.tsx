import { useContext } from 'react'
import { StateContext } from '../contexts/StateContext'
import { getRandomPosition } from '../utils/random'
import { FruitsType, FruitCategoryType } from '../types/scene'

function InteractButtons() {
  const { setFruits, groundScale, hungerLevel } = useContext(StateContext)

  const addFruit = (type: FruitCategoryType) => {
    setFruits((prevFruits: FruitsType[]) => {
      const scaleX = groundScale[0] / 2
      const scaleZ = groundScale[2] / 2
      const position = getRandomPosition(
        {
          x: { min: -scaleX, max: scaleX },
          z: { min: -scaleZ, max: scaleZ },
        },
        {
          fixedY: 1,
        }
      )

      return [
        ...prevFruits,
        {
          id: crypto.randomUUID(),
          type,
          position,
        },
      ]
    })
  }

  return (
    <div>
      <button onClick={() => addFruit('apple')}>Apple</button>
      <button onClick={() => addFruit('orange')}>Orange</button>

      {Array.from({ length: hungerLevel }).map((_, index) => (
        <div key={index}>O</div>
      ))}
    </div>
  )
}

export default InteractButtons
