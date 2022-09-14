import CameraIcon from "@mui/icons-material/PhotoCamera";
import { Typography, Toolbar, AppBar as MuiAppBar } from "@mui/material";

interface Props {
  children?: React.ReactNode;
}

const AppBar: React.FC<Props> = ({ children }) => {
  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Web
        </Typography>
        {children}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
