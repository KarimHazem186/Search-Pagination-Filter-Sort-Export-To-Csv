import React, {createContext, useState } from 'react'

export const addData = createContext();
export const updateData = createContext();
export const deleteData = createContext();
const ContextProvider = ({children}) => {

    const [useradd,setUseradd] = useState("");
    const [userUpdate,setUserUpdate] = useState("");
    const [userDelete,setUserDelete] = useState("");

    return (
    <>
        <addData.Provider value={{useradd,setUseradd}}>
           <updateData.Provider value={{userUpdate,setUserUpdate}}>
            <deleteData.Provider value={{userDelete,setUserDelete}}>
                {children}
            </deleteData.Provider>
            </updateData.Provider>
        </addData.Provider>
    </>
  )
}

export default ContextProvider