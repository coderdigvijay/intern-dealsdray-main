import React from 'react'
import Navbar from '../components/Navbar'

import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Home = () => {
  const navigate = useNavigate()
  const {userInfo} = useSelector((state) => state.auth)
  useEffect(() => {
    if(userInfo){
      navigate('/dashboard')
    }
  },[])
  return (
    <>
    <Navbar/>
    <Outlet/>
 
    </>
  )
}

export default Home