import React,{useContext} from 'react'
import Loading from '../components/Loading/Loading.component'
import { AuthContext } from '../context/AuthContext'

const AllRoutes = ({children}) => {
    const authContext = useContext(AuthContext)
    const { loading } = authContext
  return (
    <>
    {loading && <Loading/>}
    {children}
    </>
  )
}

export default AllRoutes