import { useEffect } from "react";
import { createContext, useState } from "react";
import { getRequest } from "../services/Api";
// import { getRequest } from "../services/Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  

  useEffect(() => {
    console.log("authcontext page")

    const getUser = async () => {

      try {
        const response = await getRequest("/auth/me");

        console.log("response me",response)

        setAuthUser(response);
      } catch (error) {
        console.log("error in authcontext page",error)
      }

    }

    getUser()
  },[])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};  