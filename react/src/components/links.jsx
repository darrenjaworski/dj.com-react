import React from "react";
import styled from "@emotion/styled";

const StyledLink = styled.a`
  color: ${props => props.theme.linkColor};
  transition: color 0.5s;
  text-decoration: underline;
  font-size: 1.25rem;
`;

export const TextLink = props => {
  return <StyledLink href={props.href}>{props.children}</StyledLink>;
};
