import React from "react";
import styled from "@emotion/styled";

const StyledParagraph = styled.p`
  color: ${props => props.theme.color};
  transition: color 0.5s;
  font-size: 1.25rem;
  line-height: 1.5;
`;

const Paragraph = props => {
  return <StyledParagraph>{props.children}</StyledParagraph>;
};

export default Paragraph;
