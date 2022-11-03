import { Button as MuiButton, ButtonProps, styled } from "@mui/material";
import React, { ReactNode, HTMLAttributeAnchorTarget } from "react";

interface LinkButtonProps extends ButtonProps {
  href?: string;
  icon?: JSX.Element;
  openNewTab?: boolean;
  children?: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}

const StyledButton = styled(MuiButton)(() => ({
  width: "80%",
  alignSelf: "center",
}));

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  openNewTab,
  icon,
  ...buttonProps
}) => {
  return (
    <StyledButton
      variant="outlined"
      startIcon={icon}
      target={openNewTab && "_blank"}
      {...buttonProps}
    >
      {children}
    </StyledButton>
  );
};

export default LinkButton;
