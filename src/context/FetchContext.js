import React, { createContext ,useEffect} from 'react';
import axios from 'axios';


export const FetchContext = createContext({
  authAxios:null,
  publicAxios:null
});


const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: '/app/'
  })
  
  const publicAxios = axios.create({
    baseURL: '/authenticate/'
  })

  useEffect(()=>{
    const getCsrfToken = async() =>{
      const {data} = await authAxios.get('/csrf-token');
      authAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken
    }
    getCsrfToken();
  },[authAxios])
  


  

  const value = {authAxios,publicAxios}
  return (
    <FetchContext.Provider
      value={value}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchProvider;