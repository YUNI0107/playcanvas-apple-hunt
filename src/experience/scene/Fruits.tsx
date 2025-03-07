import { Entity } from '@playcanvas/react'
import { Collision, Render, Script } from '@playcanvas/react/components'
import { useContext, useEffect } from 'react'
import { StateContext } from '../../contexts/StateContext'
import { FruitCategoryType } from '../../types/scene'
import { useApp, useMaterial } from '@playcanvas/react/hooks'
import FruitEatScript from '../scripts/FruitEatScript'

const Fruit = ({
  id: fruitId,
  position,
  type,
}: {
  id: string
  position: number[]
  type: FruitCategoryType
}) => {
  // @ts-expect-error - MaterialProps string is not Color
  const appleMaterial = useMaterial({ diffuse: 'red' })
  // @ts-expect-error - MaterialProps string is not Color
  const orangeMaterial = useMaterial({ diffuse: 'orange' })

  switch (type) {
    case 'apple':
      return (
        <Entity position={position} name={fruitId}>
          <Render type="sphere" material={appleMaterial} />
          <Collision type="sphere" radius={1} />
          <Script script={FruitEatScript} />
        </Entity>
      )
    case 'orange':
      return (
        <Entity position={position} name={fruitId}>
          <Render type="sphere" material={orangeMaterial} />
          <Collision type="sphere" radius={1} />
          <Script script={FruitEatScript} />
        </Entity>
      )
    default:
      return null
  }
}

function Fruits() {
  const app = useApp()
  const { fruits, setFruits, setHungerLevel } = useContext(StateContext)

  useEffect(() => {
    const eat = (fruitId: string) => {
      setHungerLevel((prevHungerLevel) => Math.max(0, prevHungerLevel - 1))
      setFruits((prevFruits) =>
        prevFruits.filter((fruit) => fruit.id !== fruitId)
      )
    }

    app.on('fruit:eat', eat)
    return () => {
      app.off('fruit:eat', eat)
    }
  }, [app, setFruits, setHungerLevel])

  return (
    <>
      {fruits.map((fruit) => (
        <Fruit key={fruit.id} {...fruit} />
      ))}
    </>
  )
}

export default Fruits
