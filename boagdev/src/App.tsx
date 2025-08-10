import { useState } from 'react'
import './App.css'
import Header from './components/layout/Header'
import CentralLogo from './components/layout/CentralLogo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <CentralLogo />
      </div>
    </>
  )
}

export default App
