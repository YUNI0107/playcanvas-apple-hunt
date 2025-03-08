import { useContext } from 'react'
import { StateContext } from '../contexts/StateContext'
import { getRandomPosition } from '../utils/random'
import { FruitsType, FruitCategoryType } from '../types/scene'
import appleIcon from '@assets/images/apple.png'
import orangeIcon from '@assets/images/orange.png'

function InteractButtons() {
  const { setFruits, groundScale } = useContext(StateContext)

  const fruits: Array<{
    type: FruitCategoryType
    title: string
    image: string
    color: string
  }> = [
    {
      type: 'apple',
      title: 'Apple',
      image: appleIcon,
      color: '#f94748',
    },
    {
      type: 'orange',
      title: 'Orange',
      image: orangeIcon,
      color: '#f9a748',
    },
  ]

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
          fixedY: 0.4,
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
    <div className="interact-buttons">
      {fruits.map((fruit, index) => (
        <div className="fruit-button-container" key={index}>
          <button
            key={fruit.type}
            className="fruit-button"
            onClick={() => addFruit(fruit.type)}
          >
            <p>{fruit.title}</p>
            <img src={fruit.image} alt={fruit.title} />
          </button>
          <div
            className="fruit-button-background"
            style={{ background: fruit.color }}
          />
        </div>
      ))}
    </div>
  )
}

export default InteractButtons
