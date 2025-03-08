import { Collision, Script } from '@playcanvas/react/components'
import { useContext, useEffect, useMemo } from 'react'
import { StateContext } from '../../contexts/StateContext'
import { FruitCategoryType } from '../../types/scene'
import { useApp } from '@playcanvas/react/hooks'
import FruitEatScript from '../scripts/FruitEatScript'
import Model from './components/Model'
import appleUrl from '@assets/models/apple.glb'
import orangeUrl from '@assets/models/orange.glb'

const Fruit = ({
  id: fruitId,
  position,
  type,
}: {
  id: string
  position: number[]
  type: FruitCategoryType
}) => {
  const url = useMemo(() => {
    switch (type) {
      case 'apple':
        return appleUrl
      case 'orange':
        return orangeUrl
    }
  }, [type])

  return (
    <Model url={url} position={position} name={fruitId} scale={[0.5, 0.5, 0.5]}>
      <Collision type="sphere" radius={1} />
      <Script script={FruitEatScript} />
    </Model>
  )
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
