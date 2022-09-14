import { useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  minHeight: theme.spacing(10),
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface Props {
  api: string;
}

const ProjectPage: React.FC<Props> = ({ api }) => {
  const { data, loading, error, setRerender } = useAxiosFetch(api, null, false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setRerender(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Project
      </Button>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {loading ? "Loading" : `Project ${data?.id}`}
        </BootstrapDialogTitle>
        {loading ? (
          <StyledDialogContent dividers>
            <CircularProgress />
          </StyledDialogContent>
        ) : error ? (
          <StyledDialogContent dividers>
            <Typography gutterBottom color="error">
              {error}
            </Typography>
          </StyledDialogContent>
        ) : (
          <>
            <StyledDialogContent dividers>
              <Typography gutterBottom></Typography>
              <Typography gutterBottom></Typography>
              <Typography gutterBottom></Typography>
            </StyledDialogContent>
          </>
        )}
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            back
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};
export default ProjectPage;
