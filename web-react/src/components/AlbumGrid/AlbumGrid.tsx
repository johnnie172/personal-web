import { useState } from "react";
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
import { useAuthContext } from "../../context/AuthContext";

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

interface ProjectDetails {
  id: number;
  field: string;
}
interface EditableWrapperProps {
  children?: React.ReactNode;
  projectDetails: ProjectDetails;
  projectsToEdit: {} | Project;
  setProjectsToEdit: React.Dispatch<React.SetStateAction<{} | Project>>;
}
const EditableWrapper: React.FC<EditableWrapperProps> = ({
  children,
  projectDetails,
  projectsToEdit,
  setProjectsToEdit,
}) => {
  const changeElementText = (
    e: React.FormEvent<HTMLHeadingElement>,
    projectDetails: ProjectDetails
  ) => {
    // TODO: remove errors
    const newProjects = { ...projectsToEdit };
    // @ts-expect-error
    newProjects[projectDetails.id] = newProjects[projectDetails?.id] || {};
    // @ts-expect-error
    newProjects[projectDetails.id][projectDetails?.field] =
      e?.currentTarget?.textContent;
    setProjectsToEdit(newProjects);

    // TODO: add debounce
    // setTimeout(() => {
    //   setProjectsToEdit({ ...projectsToEdit, ...objToAdd });
    // }, 1000);
  };
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onInput={(e: React.FormEvent<HTMLHeadingElement>) => {
        changeElementText(e, {
          id: projectDetails.id,
          field: projectDetails.field,
        });
      }}
    >
      {children}
    </div>
  );
};

const AlbumGrid = () => {
  const {
    userAuth: { isAuth },
  } = useAuthContext();
  const axiosParams = {
    api: `${PROJECTS_API}/${USER_EMAIL}`,
  };
  const {
    data: projectsData,
    loading,
    error,
    setAxiosParams,
  } = useAxiosFetch<Array<Project>>(axiosParams);

  const [projectsToEdit, setProjectsToEdit] = useState<Project | {}>({});
  const handleEditClick = () => {
    setAxiosParams({
      ...axiosParams,
      data: projectsToEdit,
      method: "post",
      fetch: true,
    });
    setTimeout(() => {
      setAxiosParams(axiosParams);
    }, 1500);
  };
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
          projectsData &&
          projectsData?.map((project) => (
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
                  <EditableWrapper
                    projectDetails={{ id: project.id, field: "title" }}
                    projectsToEdit={projectsToEdit}
                    setProjectsToEdit={setProjectsToEdit}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      textAlign={"center"}
                    >
                      {project.title || "No title"}
                    </Typography>
                  </EditableWrapper>
                  <EditableWrapper
                    projectDetails={{ id: project.id, field: "description" }}
                    projectsToEdit={projectsToEdit}
                    setProjectsToEdit={setProjectsToEdit}
                  >
                    <Typography textAlign={"center"}>
                      {project.description || "No description"}
                    </Typography>
                  </EditableWrapper>
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
                  {isAuth && <Button onClick={handleEditClick}>Update</Button>}
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
