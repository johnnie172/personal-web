import { Typography, Link } from "@mui/material";


const Copyright: React.FC<{ link: string }> = ({ link }) => {
  return (
    <Typography
      id="footer-copyright"
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href={link}>
        Home
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
