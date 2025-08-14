import { createContext, useContext, useState, useEffect } from "react";
import { logout as apiLogout, getAdmin } from "../api/blogapi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getAdmin();
        setUser(response.data.admin);
        console.log(user)
      } catch (error) {
        console.error("Auth check failed:", error);
        setError(error.response?.data?.error || "Authentication Failed");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const logout = () => {
    apiLogout();
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, error, loading, loggedIn, setUser, logout, setLoggedIn  }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
