import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userPayload, setUserPayload] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decode = jwtDecode(token);
    setUserPayload(decode);
    setIsAuth(true);
    setIsAdmin(decode.role === "ADMIN");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserPayload(null);
    setIsAuth(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setUserPayload(decode)
      setIsAuth(true);
      setIsAdmin(decode.role === "ADMIN");
    }
  }, []);

  const value = {
    isAuth,
    userPayload,
    isAdmin,
    login,
    logout,
  };
  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
  )
}


export { AuthContext, AuthProvider} 