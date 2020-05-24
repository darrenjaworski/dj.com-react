import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledParagraph = styled.p`
  color: ${(props) => props.theme.color};
  transition: color 0.5s;
  font-size: 1.25rem;
  line-height: 1.5;
`;

const Paragraph = ({ children }) => (
  <StyledParagraph>{children}</StyledParagraph>
);

export default Paragraph;

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
};
