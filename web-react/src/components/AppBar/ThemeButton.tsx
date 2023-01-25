import { Button } from "@mui/material";
import {
  Brightness3 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from "@mui/icons-material";

interface ButtonProps {
  localTheme: "light" | "dark";
  setLocalTheme: (
    value: "light" | "dark" | ((val: "light" | "dark") => "light" | "dark")
  ) => void;
}

const ThemeButton: React.FC<ButtonProps> = ({ localTheme, setLocalTheme }) => {
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
export default ThemeButton;
