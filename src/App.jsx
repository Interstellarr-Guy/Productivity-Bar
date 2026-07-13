import { Routes, Route  } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import MainLayout from './layout/MainLayout'
import ProtectedRoute from './routes/ProtectedRoute'


function App() {

  return (

        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );
}

export default App
