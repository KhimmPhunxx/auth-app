import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './auth/Register'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
