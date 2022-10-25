import { Computer as ComputerIcon } from "@mui/icons-material";
import {
  Typography,
  Toolbar,
  Box,
  Button,
  AppBar as MuiAppBar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
interface Props {
  children?: React.ReactNode;
}

const AppBar: React.FC<Props> = ({ children }) => {
  const pages = ["Home", "Contact", "Locations"];

  return (
    <MuiAppBar position="sticky" id="navbar">
      <Toolbar>
        <ComputerIcon sx={{ mr: 2 }} />
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/${page}`}
              >
                <Typography>
                {page}
                </Typography>
              </Link>
            </Button>
          ))}
        </Box>
        {children}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
