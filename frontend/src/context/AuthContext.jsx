import { createContext, useCallback, useEffect, useState } from "react";
import { postReq, baseUrl } from "../utils/services.js";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setloginError] = useState(null);
  const [isloginLoading, setisloginLoading] = useState(false);

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  console.log("registration info", registerInfo);
  console.log("login info", loginInfo);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = (info) => {
    setRegisterInfo(info);
  };

  const updateloginInfo = (info) => {
    setloginInfo(info);
  };

  const registerUser = async () => {
    setIsRegisterLoading(true);
    setloginError(null);

    try {
      const response = await postReq(
        `${baseUrl}/register`,
        JSON.stringify(registerInfo)
      );
      console.log(response);

      if (response.ok) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        setloginError(response.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setloginError(error.message || "An error occurred during registration");
    } finally {
      setloginError(false);
    }
  };

  const loginUser = useCallback(async () => {
    setisloginLoading(true);
    setisloginLoading(null);

    try {
      const response = await postReq(
        `${baseUrl}/login`,
        JSON.stringify(loginInfo)
      );
      console.log(response);

      if (response.ok) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        setRegisterError(response.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterError(
        error.message || "An error occurred during registration"
      );
    } finally {
      setIsRegisterLoading(false);
    }
  }, [loginInfo]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        registerUser,
        registerError,
        updateRegisterInfo,
        isRegisterLoading,
        loginError,
        isloginLoading,
        loginUser,
        updateloginInfo,
        loginInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
