import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AppShell from '../AppShell'
import { AuthContext } from '../context/AuthContext'


const AdminRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext)
  const { isAdmin,isAuthenticated } = authContext
  return (<>
    {isAdmin() && isAuthenticated ? <AppShell>{children}</AppShell> : <Navigate to='/' />}
  </>
  )
}

export default AdminRoute