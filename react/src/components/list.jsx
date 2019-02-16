import React from "react";
import styled from "@emotion/styled";

const StyledListItem = styled.li`
  color: ${props => props.theme.color};
  transition: color 0.5s;
  font-size: 1.25rem;
  line-height: 1.5;
`;

const StyledUnorderedList = styled.ul`
  list-style: none;
  padding: 1rem 0;
  margin: 0;
`;

export const ListItem = props => {
  return <StyledListItem>{props.children}</StyledListItem>;
};

export const UnorderedList = props => {
  return <StyledUnorderedList>{props.children}</StyledUnorderedList>;
};
