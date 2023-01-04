import { createContext, useState, useContext } from "react";
import { useCookies } from "react-cookie";

interface AuthUser {
  email?: string;
  token?: string;
  tokenExp?: string;
  isAuth: boolean;
}

export interface AuthContext {
  userAuth: AuthUser;
  setUserAuth: (userAuth: AuthUser) => void;
}

export const AuthContext = createContext<AuthContext>({
  userAuth: { isAuth: false },
  setUserAuth: () => {},
});

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [storageToken] = useCookies(["access_token"]);
  const isStorageToken = storageToken?.access_token ? true: false

  const [authContext, setAuthContext] = useState({
    isAuth: isStorageToken,
    ...(isStorageToken && { token: storageToken.access_token }),
  });
  return (
    <AuthContext.Provider
      value={{ userAuth: authContext, setUserAuth: setAuthContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  return { ...authContext };
};
