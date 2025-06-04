import React, { createContext, useState } from 'react'

export const AuthcontextProvider = createContext()
const Authcontext = ({children}) => {
    const[auth, setAuth] = useState(false)
  return (
    <AuthcontextProvider.Provider value = {{auth, setAuth}}>
      {children}
    </AuthcontextProvider.Provider>
  )
}

export default Authcontext

