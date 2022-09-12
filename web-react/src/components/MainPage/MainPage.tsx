import { useEffect, useState } from "react";
import {
  LinearProgress,
  Button,
  Stack,
  Box,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";
import { USER_API } from "../../consts";
import { AlbumGrid } from "../AlbumGrid";

interface User {
  title?: string;
  desc?: string;
}

const MainPage = () => {
  const [user, setUser] = useState<User>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      await axios(USER_API, {
        cancelToken: source.token,
        // TODO: get user id
        params: { user_id: 1 },
      })
        .then((res) => {
          setUser(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("fetch request aborted.");
            setIsLoading(false);
          } else if (err?.response?.data) {
            setError(err?.response?.data);
          } else {
            console.error(err);
          }
        });
    };
    fetchData();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        {isLoading ? (
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
