import { createContext, ReactNode, useState } from 'react'
import { FruitsType } from '../types/scene'

const DEFAULT_GROUND_SCALE = [10, 1, 10]
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
  bubbleText: string
  setBubbleText: React.Dispatch<React.SetStateAction<string>>
  catScreenCoord: { x: number; y: number; z: number }
  setCatScreenCoord: React.Dispatch<
    React.SetStateAction<{ x: number; y: number; z: number }>
  >
}>({
  fruits: [],
  setFruits: () => {},
  groundScale: DEFAULT_GROUND_SCALE,
  setGroundScale: () => {},
  groundPosition: DEFAULT_GROUND_POSITION,
  setGroundPosition: () => {},
  hungerLevel: DEFAULT_HUNGER_LEVEL,
  setHungerLevel: () => {},
  bubbleText: '',
  setBubbleText: () => {},
  catScreenCoord: { x: 0, y: 0, z: 0 },
  setCatScreenCoord: () => {},
})

const StateProvider = ({ children }: { children: ReactNode }) => {
  // scene
  const [groundScale, setGroundScale] = useState(DEFAULT_GROUND_SCALE)
  const [groundPosition, setGroundPosition] = useState(DEFAULT_GROUND_POSITION)
  const [hungerLevel, setHungerLevel] = useState(DEFAULT_HUNGER_LEVEL)
  const [bubbleText, setBubbleText] = useState('')
  const [catScreenCoord, setCatScreenCoord] = useState({ x: 0, y: 0, z: 0 })

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
        bubbleText,
        setBubbleText,
        catScreenCoord,
        setCatScreenCoord,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export { StateContext, StateProvider }
