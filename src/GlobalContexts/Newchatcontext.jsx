import React, { createContext, useState } from 'react'

export const NewchatcontextProvider = createContext()
const Newchatcontext = ({children}) => {
    const[newChat, setNewChat] = useState(false)
  return (
    <NewchatcontextProvider.Provider value = {{newChat, setNewChat}}>
      {children}
    </NewchatcontextProvider.Provider>
  )
}

export default Newchatcontext
