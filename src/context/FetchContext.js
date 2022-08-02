import React, { createContext } from 'react';
import axios from 'axios';


export const FetchContext = createContext({
  authAxios:null,
  publicAxios:null
});


const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: '/order/'
  })
  
  const publicAxios = axios.create({
    baseURL: '/authenticate/'
  })
  


  

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