import { StateProvider } from './contexts/StateContext.tsx'
import Experience from './experience/Experience.tsx'
import InteractButtons from './views/InteractButtons.tsx'
import HungerLevel from './views/HungerLevel.tsx'
import './App.css'
import Bubble from './views/Bubble.tsx'

function App() {
  return (
    <>
      <StateProvider>
        <Experience />
        <Bubble />
        <div className="container">
          <HungerLevel />
          <InteractButtons />
        </div>
      </StateProvider>
    </>
  )
}

export default App
