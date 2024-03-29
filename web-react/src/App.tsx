import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { LinearProgress } from "@mui/material";
import "./App.css";
import { USER_API } from "./consts";
import { useLocalStorage, useAxiosFetch } from "./hooks";
import { MainPage } from "./components/MainPage";
import {
  AppBar,
  ThemeButton,
  LogoutButton,
  LoginButton,
} from "./components/AppBar";
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
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // get user date
  const { userAuth } = useAuthContext();
  const axiosParams = {
    api: USER_API,
  };
  const { data: userData, loading, error } = useAxiosFetch<User>(axiosParams);

  // check for default theme or localStorage theme and set the correct theme
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [localTheme, setLocalTheme] = useLocalStorage<"dark" | "light">(
    "theme",
    prefersDarkMode ? "dark" : "light"
  );
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
          <ThemeButton localTheme={localTheme} setLocalTheme={setLocalTheme} />
          {userAuth.isAuth ? (
            <LogoutButton />
          ) : (
            <LoginButton setLoginModalOpen={setLoginModalOpen} />
          )}
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
                  userData && (
                    <MainPage {...{ user: userData, loading, error }}>
                      {}
                    </MainPage>
                  )
                }
              />
            ))}
            <Route
              path="/Contact"
              element={
                <React.Suspense fallback={<LinearProgress />}>
                  <Contact contactInfo={userData?.contact_info} />
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
        {userData && (
          <AppFooter
            {...{
              title: `${userData?.first_name} ${userData?.last_name}`,
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
