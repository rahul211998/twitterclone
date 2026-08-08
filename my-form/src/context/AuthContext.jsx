import { useEffect } from "react";
import { createContext, useState } from "react";
import { getRequest } from "../services/Api";
// import { getRequest } from "../services/Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [runFunctions, setRunFunctions] = useState(false);

  useEffect(() => {
    console.log("parent runnings")
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  ) {
    return;
  }

  const getUser = async () => {
    try {
      const response = await getRequest("/auth/me");
      setAuthUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  getUser();
}, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};  