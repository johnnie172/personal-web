import * as React from "react";
import {
  Typography,
  TextField,
  Backdrop,
  Modal,
  Fade,
  Stack,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import { LinkButton } from "../LinkButton";

const ModalStackStyle = {
  position: "absolute" as "absolute",
  justifyContent: "space-evenly",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EmailModal = ({ email }: { email: string }) => {
  const [bodyValue, SetBodyValue] = React.useState("");
  const [subjValue, SetSubjValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetBodyValue(event.target.value);
  };

  const handleSubjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetSubjValue(event.target.value);
  };

  return (
    <>
      <LinkButton onClick={handleOpen} icon={<Email />}>
        Email Me
      </LinkButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Stack component="form" sx={ModalStackStyle}>
            <Typography variant="h4" align="center" color="text.primary">
              Hey,
            </Typography>
            <Typography variant="h5" align="center" color="text.primary">
              I would love to hear from u!
            </Typography>
            <TextField
              id="standard-textarea"
              label="Please enter subject"
              autoFocus
              multiline
              fullWidth
              variant="standard"
              minRows={1}
              maxRows={2}
              value={subjValue}
              onChange={handleSubjChange}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Please enter your message"
              autoFocus
              multiline
              fullWidth
              minRows={5}
              maxRows={12}
              value={bodyValue}
              onChange={handleBodyChange}
            />
            <LinkButton
              href={`mailto:${email}?subject=${subjValue}&body=${bodyValue}`}
              icon={<Email />}
              disabled={!subjValue || !bodyValue}
              onClick={handleClose}
            >
              Send Email
            </LinkButton>
          </Stack>
        </Fade>
      </Modal>
    </>
  );
};

export default EmailModal;
