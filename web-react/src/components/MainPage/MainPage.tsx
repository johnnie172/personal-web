import {
  LinearProgress,
  Button,
  Stack,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { AlbumGrid } from "../AlbumGrid";
import {User} from "../../App"

interface Props {
  user:User;
  loading: boolean;
  error: string;
}

const MainPage : React.FC<Props> = ({user, loading, error}) => {

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        {loading ? (
          <LinearProgress />
        ) : error ? (
          <Typography
            variant="h4"
            align="center"
            color="error"
          >{`${error}`}</Typography>
        ) : (
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {`${user?.first_name || ""} ${user?.last_name || ""} ${
                user?.title || ""
              }`}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {user?.description || ""}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        )}
      </Box>
      <AlbumGrid />
    </main>
  );
};

export default MainPage;
