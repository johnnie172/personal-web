import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginButton: React.FC<ButtonProps> = ({ setLoginModalOpen }) => {
  return (
    <Button
      onClick={() => {
        setLoginModalOpen((loginModalOpen) => !loginModalOpen);
      }}
      sx={{ color: "#fff" }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
