import { createContext, useCallback } from "react";
import { useState } from "react";


export const  AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
        const [user, setuser] = useState(null);
        const [registerInfo , setregisterInfo] = useState({
            name : "",
            email : "",
            password : ""
        })
console.log("registration info " , registerInfo);
        const updateRegisterInfo = useCallback((info)=>{
            setregisterInfo(info);
        },[])

    return <AuthContext.Provider value = {{user , registerInfo, updateRegisterInfo}}>
            {children}
    </AuthContext.Provider>
}