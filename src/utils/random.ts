export const getRandomPosition = (
  {
    x = { min: 0, max: 0 },
    y = { min: 0, max: 0 },
    z = { min: 0, max: 0 },
  }: {
    x?: { min: number; max: number }
    y?: { min: number; max: number }
    z?: { min: number; max: number }
  },
  options?: {
    fixedX?: number
    fixedY?: number
    fixedZ?: number
  }
) => {
  return [
    options?.fixedX ?? Math.random() * (x.max - x.min) + x.min,
    options?.fixedY ?? Math.random() * (y.max - y.min) + y.min,
    options?.fixedZ ?? Math.random() * (z.max - z.min) + z.min,
  ]
}
