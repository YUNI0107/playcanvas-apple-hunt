import { createContext, ReactNode, useState } from 'react'
import { FruitsType } from '../types/scene'

const DEFAULT_GROUND_SCALE = [10, 0.5, 10]
const DEFAULT_GROUND_POSITION = [0, 0, 0]
export const DEFAULT_HUNGER_LEVEL = 5

const StateContext = createContext<{
  fruits: FruitsType[]
  setFruits: React.Dispatch<React.SetStateAction<FruitsType[]>>
  groundScale: number[]
  setGroundScale: React.Dispatch<React.SetStateAction<number[]>>
  groundPosition: number[]
  setGroundPosition: React.Dispatch<React.SetStateAction<number[]>>
  hungerLevel: number
  setHungerLevel: React.Dispatch<React.SetStateAction<number>>
}>({
  fruits: [],
  setFruits: () => {},
  groundScale: DEFAULT_GROUND_SCALE,
  setGroundScale: () => {},
  groundPosition: DEFAULT_GROUND_POSITION,
  setGroundPosition: () => {},
  hungerLevel: DEFAULT_HUNGER_LEVEL,
  setHungerLevel: () => {},
})

const StateProvider = ({ children }: { children: ReactNode }) => {
  // scene
  const [groundScale, setGroundScale] = useState(DEFAULT_GROUND_SCALE)
  const [groundPosition, setGroundPosition] = useState(DEFAULT_GROUND_POSITION)
  const [hungerLevel, setHungerLevel] = useState(DEFAULT_HUNGER_LEVEL)

  // interactions
  const [fruits, setFruits] = useState<FruitsType[]>([])

  return (
    <StateContext.Provider
      value={{
        groundScale,
        setGroundScale,
        groundPosition,
        setGroundPosition,
        fruits,
        setFruits,
        hungerLevel,
        setHungerLevel,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export { StateContext, StateProvider }
