import React, { createContext, useEffect, useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, onAuthStateChangeListener, signOutUserFirebase } from '../Firebase/firebase.auth';

export const AuthContext = createContext({
  authState: null,
  setAuthState: () => {},
  isAuthenticated:()=>{},
  logout:() =>{},
  isAdmin:()=>{},
  loading:null,
  setLoading: ()=>{}
});


const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [authState, setAuthState] = useState({clientInfo:{}});

  useEffect(()=>{
    const unsubscribe = onAuthStateChangeListener(async(user)=>{
      setLoading(true)
      if(user){
        const clientInfo = await getCurrentUser(user.uid)
        setAuthState({clientInfo})
      }
      setLoading(false)
    })

    return unsubscribe
  },[])


  const setAuthInfo = ({ clientInfo }) => {
    setAuthState({ clientInfo })
  }

  const isAuthenticated = useCallback(() =>{
    return Object.keys(authState.clientInfo).length === 0 ? false : true
  },[authState])

  const isAdmin = useCallback(() =>{
    return authState.clientInfo.clientRole === 'admin'
  },[authState])

  const logout = async() =>{
    try {
      await signOutUserFirebase()
      setAuthState({
        clientInfo:{},
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }



  const value = {
    authState,
    setAuthState: (authInfo) => setAuthInfo(authInfo),
    isAuthenticated,
    logout,
    isAdmin,
    loading,
    setLoading
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;