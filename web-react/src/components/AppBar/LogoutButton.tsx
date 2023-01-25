import { useUserAuth } from "../../hooks";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useUserAuth();

  return (
    <Button onClick={logout} sx={{ color: "#fff" }}>
      Logout
    </Button>
  );
};

export default LogoutButton;
