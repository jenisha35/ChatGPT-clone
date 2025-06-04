import React, { createContext, useState } from "react";

export const TemperorychatcontextProvider = createContext(false);
const Temperorychatcontext = ({ children }) => {
  const [tempChat, setTempChat] = useState(false);
  return (
    <TemperorychatcontextProvider.Provider value={{ tempChat, setTempChat }}>
      {children}
    </TemperorychatcontextProvider.Provider>
  );
};

export default Temperorychatcontext;
