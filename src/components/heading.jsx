import React from 'react';
import styled from '@emotion/styled';

const HeadingOne = styled.h1`
  color: ${(props) => props.theme.color};
  transition: color 0.5s;
  font-size: 2rem;
`;

export const Heading = (props) => <HeadingOne>{props.children}</HeadingOne>;

const HeadingTwo = styled.h1`
  color: ${(props) => props.theme.color};
  transition: color 0.5s;
  font-size: 1.5rem;
`;

export const SmallHeading = (props) => <HeadingTwo>{props.children}</HeadingTwo>;
