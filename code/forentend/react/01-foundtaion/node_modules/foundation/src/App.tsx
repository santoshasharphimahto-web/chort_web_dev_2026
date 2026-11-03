import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)

  

  return (
    <div className="App">
      <h1>show the count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default App
