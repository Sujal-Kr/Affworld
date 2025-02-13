import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({user,redirect="/"}) => {
  return (
    user? <Outlet/>:<Navigate to={redirect}/>
  )
}

export default ProtectRoute