import { useState } from 'react'
import ManualFrom from './ManualFrom'
import HookFrom from './hookFrom'


function App() {
  const [tab,settab]=useState("mula")

  return (
    <>
    <h1>hello from react!!</h1> 
    {tab=="manual"?<ManualFrom/>:<HookFrom/>}
    <button className='px-2p p-2 rounded-sm bg-amber-300  mt-1' onClick={()=>settab("mula")}>manulab</button>

</>
  )
}

export default App
