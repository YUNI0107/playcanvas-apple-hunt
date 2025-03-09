import { StateProvider } from './contexts/StateContext.tsx'
import Experience from './experience/Experience.tsx'
import InteractButtons from './views/InteractButtons.tsx'
import HungerLevel from './views/HungerLevel.tsx'
import Bubble from './views/Bubble.tsx'
import './App.css'

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
