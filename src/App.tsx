import { StateProvider } from './contexts/StateContext.tsx'
import Experience from './experience/Experience.tsx'
import InteractButtons from './views/InteractButtons.tsx'
import HungerLevel from './views/HungerLevel.tsx'
import './App.css'

function App() {
  return (
    <>
      <StateProvider>
        <Experience />

        <div className="container">
          <HungerLevel />
          <InteractButtons />
        </div>
      </StateProvider>
    </>
  )
}

export default App
