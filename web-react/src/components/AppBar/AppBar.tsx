import Toolbar from "@mui/material/Toolbar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import { AppBar as MuiAppBar } from "@mui/material";
import Typography from "@mui/material/Typography";

const AppBar = () => {
  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          My Web
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
