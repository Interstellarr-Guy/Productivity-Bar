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
        priority: "High",
        dueDate: "2026-07-10",
    },
    {
        id: 2,
        title: "React UI",
        completed: false,
        priority: "Medium",
        dueDate: "2026-07-10",
    },
    {
        id: 3,
        title: "Gym",
        completed: false,
        priority: "Low",
        dueDate: "2026-07-11",
    },
]);

    const addTask = (title, priority, dueDate) => {

    const newTask = {
        id: Date.now(),
        title,
        completed: false,
        priority,
        dueDate,
    };

    setTasks(prev => [...prev, newTask]);

};

  return (
    
      <>
      <Calendar tasks={tasks} setTasks={setTasks} addTask={addTask} />
      </>
    
  )
}

export default App
