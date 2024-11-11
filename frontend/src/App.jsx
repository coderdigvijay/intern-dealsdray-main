import { useState } from 'react'

import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'
import AdminDashboard from './pages/AdminDashboard'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} >
      <Route path='/login' index={true} element={<Login />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
)

function App() {


  return (
    <RouterProvider router={router}/>
  )
}

export default App
