import { createContext, useState, useEffect } from "react";
import httpService from "../services/httpService";
import Loader from "../components/loader";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // httpService.setJwt(authTokens && authTokens.access ? authTokens.access : null)

  const login = async (username, password) => {
    try {
      const { data } = await httpService.post("/auth/jwt/create/", {
        username,
        password,
      });
      // httpService.setJwt(data.access);
      setAuthTokens({ access: data.access, refresh: data.refresh });
      setUserInfo({
        username: data.username,
        email: data.email,
        isAdmin: data.email,
      });
      localStorage.setItem(
        "authTokens",
        JSON.stringify({ access: data.access, refresh: data.refresh })
      );
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin,
        })
      );
      setError("");
      return true;
    } catch (ex) {
      setError({ login: ex.response.data });
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await httpService.post("/auth/users/", {
        username,
        email,
        password,
      });
      await login(username, password);
      return true;
    } catch (ex) {
      setError({ register: ex.response.data });
      return false;
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUserInfo(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userInfo");
    // httpService.setJwt(undefined)
  };

  const refresh = async () => {
    try {
      const { data } = await httpService.post("/auth/jwt/refresh/", {
        refresh: authTokens.refresh,
      });
      // httpService.setJwt(data.access)
      setAuthTokens({ access: data.access, refresh: data.refresh });
      localStorage.setItem(
        "authTokens",
        JSON.stringify({ access: data.access, refresh: data.refresh })
      );
    } catch (ex) {
      logout();
    }
  };

  useEffect(() => {
    if (authTokens) {
      refresh();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    httpService.setJwt(authTokens && authTokens.access ? authTokens.access : null);
  },[loading,authTokens])

  useEffect(() => {
    let timeInterval = 1000 * 60 * 60; // Refresh tokens after every 1 hour
    const interval = setInterval(() => {
      if (authTokens) refresh();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [authTokens]);

  const updateProfile = async (username, email, password) => {
    try {
      let flag = 0,payload = {};
      if (username != userInfo.username && username != "") {
        payload.username = username;
        flag = 1;
      }
      if (email != userInfo.email && email != "") {
        payload.email = email;
        flag = 1;
      }
      if (password != "") {
        payload.password = password;
        flag = 1;
      }
      if (flag == 0) return;

      const { data } = await httpService.patch("/auth/users/me/", payload);
      setUserInfo({
        username: data.username,
        email: data.email,
        isAdmin: userInfo.isAdmin,
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          username: data.username,
          email: data.email,
          isAdmin: userInfo.isAdmin,
        })
      );
      setError("");
      return true;
    } catch (ex) {
      return false;
    }
  };

  const contextData = {
    authTokens,
    userInfo,
    error,
    login,
    register,
    refresh,
    logout,
    updateProfile,
  };

  return (
    <UserContext.Provider value={contextData}>
      {loading && <Loader />}
      {!loading && children}
    </UserContext.Provider>
  );
};
