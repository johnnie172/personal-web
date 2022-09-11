import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import axios from "axios";

interface Project {
  id: number;
  title?: string;
  desc?: string;
  img?: string;
  link?: string;
}

const AlbumGrid = () => {
  const [projects, setProjects] = useState<Array<Project> | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      await axios("http://127.0.0.1:5000/projects", {
        cancelToken: source.token,
      })
        .then((res) => {
          setProjects(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Axios request aborted.");
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
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : (
          projects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={project?.img}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    textAlign={"center"}
                  >
                    {project.title || "No title"}
                  </Typography>
                  <Typography textAlign={"center"}>
                    {project.desc || "No description"}
                  </Typography>
                </CardContent>
                <CardActions>
                  {project?.link && (
                    <Button
                      size="small"
                      href={`${project.link}`}
                      target="_blank"
                    >
                      View Project
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AlbumGrid;
