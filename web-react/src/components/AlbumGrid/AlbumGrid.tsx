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
import { PROJECTS_API, USER_EMAIL } from "../../consts";
import { useAxiosFetch } from "../../hooks";

interface Project {
  id: number;
  title?: string;
  description?: string;
  img?: string;
  img64?: string;
  link?: string;
  git?: string;
  additional_info: boolean;
}

const chooseImg = ([img64, img]: Array<string | undefined> | []): string => {
  return img64 ? `data:image/webp;base64,${img64}` : img ? img : "";
};

const AlbumGrid = () => {
  const axiosParams = {
    api: `${PROJECTS_API}/${USER_EMAIL}`,
  };
  const { data, loading, error } = useAxiosFetch(axiosParams);
  const projects: Array<Project> = Object.keys(data).length !== 0 ? data : [];

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
                  image={chooseImg([project?.img64, project?.img])}
                  alt={`img-${project.id}`}
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
                    {project.description || "No description"}
                  </Typography>
                </CardContent>
                <CardActions>
                  {project?.additional_info && (
                    <ProjectPage projectId={project.id}></ProjectPage>
                  )}
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
