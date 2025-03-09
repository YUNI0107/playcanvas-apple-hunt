import { useContext, useEffect, useRef } from 'react'
import { StateContext } from '../contexts/StateContext'

function Bubble() {
  const { bubbleText, setBubbleText, catScreenCoord } = useContext(StateContext)
  const timer = useRef<number>(null)

  useEffect(() => {
    if (bubbleText) {
      if (timer.current) clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setBubbleText('')
        if (timer.current) clearTimeout(timer.current)
      }, 2000)
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [bubbleText, setBubbleText])

  return (
    <>
      {bubbleText && (
        <div
          className="tooltip"
          style={{
            left: `${catScreenCoord.x}px`,
            top: `${catScreenCoord.y}px`,
          }}
        >
          {bubbleText}
        </div>
      )}
    </>
  )
}

export default Bubble
