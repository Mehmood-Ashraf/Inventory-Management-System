import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import Home from './pages/Home'
// import Customers from './pages/Customers'
// import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element = {<Login />}/>
      <Route path='/' element={<Home />} />
    </Routes>
    </>
  )
}

export default App
