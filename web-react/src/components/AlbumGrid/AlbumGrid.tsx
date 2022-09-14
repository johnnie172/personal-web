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
import GitHubIcon from "@mui/icons-material/GitHub";
import { ProjectPage } from "../ProjectPage";
import { PROJECTS_API } from "../../consts";
import useAxiosFetch from "../../hooks/useAxiosFetch";

interface IProject {
  id: number;
  title?: string;
  desc?: string;
  img?: string;
  link?: string;
  git?: string;
}

const AlbumGrid = () => {
  const { data, loading, error } = useAxiosFetch(PROJECTS_API, null, true);
  const projects: Array<IProject> =
    Object.keys(data).length !== 0 ? data : [{ id: -1 }];

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : error ? (
          <Typography
            variant="h4"
            align="center"
            color="error"
          >{`${error}`}</Typography>
        ) : (
          projects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={6}>
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
                    pt: 3,
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
                  <ProjectPage
                    api={`${PROJECTS_API}/${project.id}`}
                  ></ProjectPage>
                  {project?.git && (
                    <Button
                      variant="outlined"
                      sx={{ ml: 1 }}
                      href={`${project.git}`}
                      target="_blank"
                      startIcon={<GitHubIcon />}
                    >
                      View Git
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
