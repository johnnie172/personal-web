import React from "react";
import { Typography, TextField, Stack } from "@mui/material";
import { Email } from "@mui/icons-material";
import { LinkButton } from "../LinkButton";
import { Modal } from "../Modal";

const ModalStackStyle = {
  position: "absolute" as "absolute",
  justifyContent: "space-evenly",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EmailModal = ({ email }: { email: string }) => {
  const [bodyValue, SetBodyValue] = React.useState("");
  const [subjValue, SetSubjValue] = React.useState("");
  const [emailModalOpen, setEmailModalOpen] = React.useState(false);

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetBodyValue(event.target.value);
  };

  const handleSubjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetSubjValue(event.target.value);
  };

  return (
    <>
      <LinkButton onClick={() => setEmailModalOpen(true)} icon={<Email />}>
        Email Me
      </LinkButton>
      <Modal shouldOpen={emailModalOpen} setModalOpen={setEmailModalOpen}>
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
            onClick={() => setEmailModalOpen(false)}
          >
            Send Email
          </LinkButton>
        </Stack>
      </Modal>
    </>
  );
};

export default EmailModal;
