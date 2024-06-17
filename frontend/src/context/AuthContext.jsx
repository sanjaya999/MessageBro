import { createContext, useState } from "react";
import { postReq, baseUrl } from "../utils/services.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        userName: "",
        email: "",
        password: ""
    });

    console.log("registration info", registerInfo);

    const updateRegisterInfo = (info) => {
        setRegisterInfo(info);
    };

    const registerUser = async () => {
        setIsRegisterLoading(true);
        setRegisterError(null);
    
        try {
            const response = await postReq(`${baseUrl}/register`, JSON.stringify(registerInfo));
            console.log(response);
    
            if (response.ok) {
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            } else {
                setRegisterError(response.error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setRegisterError(error.message || "An error occurred during registration");
        } finally {
            setIsRegisterLoading(false);
        }
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                registerInfo,
                registerUser,
                registerError,
                updateRegisterInfo,
                isRegisterLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};