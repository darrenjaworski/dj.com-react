import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledLink = styled.a`
  color: ${props => props.theme.linkColor};
  transition: color 0.5s;
  text-decoration: underline;
  font-size: 1.25rem;
`;

export const TextLink = ({ link, children, href }) => {
  return link ? (
    <Link to={link}>
      <StyledLink>{children}</StyledLink>
    </Link>
  ) : (
    <StyledLink href={href}>{children}</StyledLink>
  );
};

TextLink.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  href: PropTypes.string
};

TextLink.defaultProps = {
  link: null,
  href: ""
};

export default TextLink;
