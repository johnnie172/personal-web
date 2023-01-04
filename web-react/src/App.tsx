import React, { useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, LinearProgress } from "@mui/material";
import {
  Brightness3 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import { USER_API } from "./consts";
import { isEmptyObj } from "./utilities";
import { useLocalStorage, useAxiosFetch, useUserAuth } from "./hooks";
import { MainPage } from "./components/MainPage";
import { AppBar } from "./components/AppBar";
import { AppFooter } from "./components/AppFooter";
import { LoginForm } from "./components/LoginForm";
import { Modal } from "./components/Modal";
import { useAuthContext } from "./context/AuthContext";

const Contact = React.lazy(() => import("./components/Contact"));
const Map = React.lazy(() => import("./components/Map"));

export interface ContactInfo {
  email?: string;
  linkdin?: string;
  git?: string;
  phone?: string;
}

export interface User {
  email: string;
  contact_info: ContactInfo;
  first_name?: string;
  last_name?: string;
  title?: string;
  description?: string;
}

const home_paths = ["home", "/"];

const App = () => {
  const { userAuth } = useAuthContext();
  const { logout } = useUserAuth();
  const axiosParams = {
    api: USER_API,
  };
  const { data, loading, error } = useAxiosFetch(axiosParams);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [localTheme, setLocalTheme] = useLocalStorage<"dark" | "light">(
    "theme",
    prefersDarkMode ? "dark" : "light"
  );
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const ThemeButton = () => {
    return (
      <Button
        id="btn-theme"
        onClick={() => setLocalTheme(localTheme === "light" ? "dark" : "light")}
        sx={{ color: "#fff" }}
      >
        {localTheme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </Button>
    );
  };

  const LoginButton = () => {
    return (
      <Button
        onClick={() => {
          setLoginModalOpen(!loginModalOpen);
        }}
        sx={{ color: "#fff" }}
      >
        Login
      </Button>
    );
  };

  const LogoutButton = () => {
    return (
      <Button
        onClick={logout}
        sx={{ color: "#fff" }}
      >
        Logout
      </Button>
    );
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: localTheme,
        },
      }),
    [localTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header"></header>
        <AppBar>
          <ThemeButton />
          {userAuth.isAuth ? <LogoutButton /> : <LoginButton />}
        </AppBar>
        <>
          <Modal shouldOpen={loginModalOpen} setModalOpen={setLoginModalOpen}>
            <LoginForm />
          </Modal>
          <Routes>
            {home_paths.map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <MainPage {...{ user: data, loading, error }}>{}</MainPage>
                }
              />
            ))}
            <Route
              path="/Contact"
              element={
                <React.Suspense fallback={<LinearProgress />}>
                  <Contact contactInfo={data.contact_info} />
                </React.Suspense>
              }
            />
            <Route
              path="/Locations"
              element={
                <React.Suspense fallback={<LinearProgress />}>
                  <Map />
                </React.Suspense>
              }
            ></Route>
          </Routes>
        </>
        {!isEmptyObj(data) && (
          <AppFooter
            {...{
              title: `${data?.first_name} ${data?.last_name}`,
              subtitle: "subtitle",
              link: "",
            }}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
