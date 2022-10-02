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
import { useAxiosFetch } from "../../hooks";
interface IUser {
  email: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  description?: string;
}

const MainPage = () => {
  const axiosParams = {
    api: USER_API,
  };
  const { data, loading, error } = useAxiosFetch(axiosParams);
  const user: IUser = data;
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
