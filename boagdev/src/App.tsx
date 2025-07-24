import { useState } from 'react'
import './App.css'
import Header from './components/layout/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>     
      </div>
    </>
  )
}

export default App
