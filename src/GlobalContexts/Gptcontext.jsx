import React, { createContext, useState } from 'react'

export const Gptprovider = createContext()
const Gptcontext = ({children}) => {
    const[gpt, setGpt] = useState(false)
  return (
    <Gptprovider.Provider value = {{gpt, setGpt}}>
      {children}
    </Gptprovider.Provider>
  )
}

export default Gptcontext

