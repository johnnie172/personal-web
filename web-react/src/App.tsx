import React from "react";
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
import { useLocalStorage, useAxiosFetch } from "./hooks";
import { MainPage } from "./components/MainPage";
import { AppBar } from "./components/AppBar";
import { AppFooter } from "./components/AppFooter";
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
  const axiosParams = {
    api: USER_API,
  };
  const { data, loading, error } = useAxiosFetch(axiosParams);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [localTheme, setLocalTheme] = useLocalStorage<"dark" | "light">(
    "theme",
    prefersDarkMode ? "dark" : "light"
  );

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
        </AppBar>
        <Routes>
          {home_paths.map((path) => (
            <Route
              key={path}
              path={path}
              element={<MainPage {...{ user: data, loading, error }} />}
            />
          ))}
          <Route
            path="/Contact"
            element={
              <React.Suspense fallback={<LinearProgress/>}>
                <Contact contactInfo={data.contact_info} />
              </React.Suspense>
            }
          />
          <Route
            path="/Locations"
            element={
              <React.Suspense fallback={<LinearProgress/>}>
                <Map />
              </React.Suspense>
            }
          ></Route>
        </Routes>
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
