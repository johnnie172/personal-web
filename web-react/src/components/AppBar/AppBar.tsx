import { Computer } from "@mui/icons-material";
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
  const pages = ["Home", "Contact"];

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Computer sx={{ mr: 2 }} />
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
