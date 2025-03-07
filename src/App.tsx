import Experience from './experience/Experience.tsx'
import InteractButtons from './views/InteractButtons.tsx'
import './App.css'
import { StateProvider } from './contexts/StateContext.tsx'

function App() {
  return (
    <>
      <StateProvider>
        <Experience />

        {/* TODO: import css library */}
        <div style={{ position: 'absolute', top: 0, left: 0, padding: 10 }}>
          <InteractButtons />
        </div>
      </StateProvider>
    </>
  )
}

export default App
