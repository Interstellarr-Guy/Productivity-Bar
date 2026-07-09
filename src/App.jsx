import { useState } from 'react'
import './App.css'
import Calendar from './pages/Calendar'
import Login from './pages/Login'
import AppLayout from './layout/AppLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <>
      <Calendar />
      </>
    
  )
}

export default App
