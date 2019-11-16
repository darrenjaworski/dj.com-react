import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const HeadingOne = styled.h1`
  color: ${props => props.theme.color};
  transition: color 0.5s;
  font-size: 2rem;
`;

export const Heading = ({ children }) => <HeadingOne>{children}</HeadingOne>;

Heading.propTypes = {
  children: PropTypes.node.isRequired
};

const HeadingTwo = styled.h1`
  color: ${props => props.theme.color};
  transition: color 0.5s;
  font-size: 1.5rem;
`;

export const SmallHeading = ({ children }) => (
  <HeadingTwo>{children}</HeadingTwo>
);

SmallHeading.propTypes = {
  children: PropTypes.node.isRequired
};
