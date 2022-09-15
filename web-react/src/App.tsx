import React from "react";
import "./App.css";
import { MainPage } from "./components/MainPage";
import { AppBar } from "./components/AppBar";
import { AppFooter } from "./components/AppFooter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Button } from "@mui/material";
import { Brightness3, Brightness7 } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";

const home_paths = ["home", "/"];

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<"dark" | "light">(
    prefersDarkMode ? "dark" : "light"
  );

  const NavButton = () => {
    return (
      <Button
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        sx={{ color: "#fff" }}
      >
        {mode === "dark" ? <Brightness3 /> : <Brightness7 />}
      </Button>
    );
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header"></header>
        <AppBar>
          <NavButton />
        </AppBar>
        <Routes>
          {home_paths.map((path) => (
            <Route key={path} path={path} element={<MainPage />} />
          ))}
          <Route path="/Contact" element={<>Unavailable</>}></Route>
        </Routes>
        <AppFooter />
      </div>
    </ThemeProvider>
  );
};

export default App;
