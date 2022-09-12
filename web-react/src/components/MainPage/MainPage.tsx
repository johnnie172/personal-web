import {
  LinearProgress,
  Button,
  Stack,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { USER_API } from "../../consts";
import { AlbumGrid } from "../AlbumGrid";
import useAxiosFetch from "../../hooks/useAxiosFetch"
interface User {
  title?: string;
  desc?: string;
}

const MainPage = () => {
  // TODO: get user id
  const { data, loading, error } = useAxiosFetch(USER_API, {"user_id": "1"});
  const user: User = data
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
              {user?.title}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {user?.desc}
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
