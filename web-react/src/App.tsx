import React from "React";
import "./App.css";
import { MainPage } from "./components/MainPage";
import { AppBar } from "./components/AppBar";
import { AppFooter } from "./components/AppFooter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header"></header>
        <AppBar />
        <MainPage />
        <AppFooter />
      </div>
    </ThemeProvider>
  );
};

export default App;
