import { useState } from 'react'
import './App.css'
import Calendar from './pages/Calendar'
import Login from './pages/Login'
import AppLayout from './layout/AppLayout'

function App() {
  const [count, setCount] = useState(0)
  

  const [tasks, setTasks] = useState([
  {
    id: 1,
    title: "Backend API",
    completed: false,
  },
  {
    id: 2,
    title: "React UI",
    completed: false,
  },
  {
    id: 3,
    title: "Gym",
    completed: false,
  },
  {
    id: 4,
    title: "Read Book",
    completed: false,
  },
]);

  return (
    
      <>
      <Calendar tasks={tasks} setTasks={setTasks} />
      </>
    
  )
}

export default App
