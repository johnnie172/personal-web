import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthContext = () => {
    const { userAuth, setUserAuth } = useContext(AuthContext);
    return { userAuth, setUserAuth };
  };