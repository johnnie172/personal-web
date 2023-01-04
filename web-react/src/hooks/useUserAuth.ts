import { useCookies } from "react-cookie";

import { useEffect } from "react";
import { LOGIN_API } from "../consts";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useUserAuth = () => {
  const { userAuth, setUserAuth } = useAuthContext();
  const [storageToken, setStorageToken, removeStorageToken] = useCookies([
    "access_token",
  ]);

  const getAuth = async (email: string, pass: string) => {
    try {
      const res = await axios({
        method: "POST",
        url: LOGIN_API,
        data: {
          email: email,
          password: pass,
        },
      });
      if (res.status == 200)
        setUserAuth({ ...userAuth, token: res.data.access_token });
      return res;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        if (userAuth?.token !== undefined)
          setUserAuth({ ...userAuth, token: undefined });
        console.log("token removed");
      }
      console.error(err);
    }
  };

  const logout = () => {
    removeStorageToken("access_token");
    setUserAuth({ ...userAuth, isAuth: false, token: undefined });
  };

  const login = (token: string) => {
    checkAuth(token);
    //TODO: on init check token and update userAuth
  };

  const checkAuth = async (token: string) => {
    if (!token) return;
    try {
      const res = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/jwt",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        console.log(res.data);
        return res.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userAuth?.token !== undefined) {
      setUserAuth({ ...userAuth, isAuth: true });
      setStorageToken("access_token", userAuth.token);
    } else {
      setUserAuth({ ...userAuth, isAuth: false });
      removeStorageToken("access_token");
    }
  }, [userAuth?.token]);

  return { getAuth, logout };
};

export default useUserAuth;
