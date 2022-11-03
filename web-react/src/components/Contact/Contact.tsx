import React from "react";
import { Container, Stack } from "@mui/material";
import { ContactInfo } from "../../App";
import { EmailModal } from "./";
import { LinkButton } from "../LinkButton";
import { GitHub, LinkedIn, Phone } from "@mui/icons-material";

interface ContactProps {
  contactInfo?: ContactInfo;
}
export const Contact: React.FC<ContactProps> = ({ contactInfo }) => {
  return (
    <Container maxWidth="lg">
      <Stack
        mt={10}
        justifyContent="space-between"
        minHeight={"25vh"}
        sx={{ width: "80%", ml: "auto", mr: "auto" }}
      >
        {contactInfo?.email && <EmailModal email={contactInfo.email} />}
        {contactInfo?.phone && (
          <LinkButton href={`tel:${contactInfo.phone}`} icon={<Phone />}>
            Call Me
          </LinkButton>
        )}
        {contactInfo?.git && (
          <LinkButton href={contactInfo.git} icon={<GitHub />} openNewTab>
            My Git
          </LinkButton>
        )}
        {contactInfo?.linkdin && (
          <LinkButton href={contactInfo.linkdin} icon={<LinkedIn />} openNewTab>
            My LinkdIn
          </LinkButton>
        )}
      </Stack>
    </Container>
  );
};
