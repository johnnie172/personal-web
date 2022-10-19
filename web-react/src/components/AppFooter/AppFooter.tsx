import { Box, Typography, Link } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
  link: string;
}

const Copyright: React.FC<{link: Props["link"]}> = ({link}) => {
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



const AppFooter: React.FC<Props> = ({ title, subtitle, link }) => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography id="footer-title" variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <Typography
        id="footer-subtitle"
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        {/* TODO: add desc for db */}
        {subtitle}
      </Typography>
      <Copyright link={link || "/"} />
    </Box>
  );
};

export default AppFooter;
