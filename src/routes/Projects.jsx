import React from "react";
import { Link } from "react-router-dom";
import projectData from "../data/projects.json";
import { Heading, SmallHeading } from "../components/heading";
import { TextLink } from "../components/links";
import Paragraph from "../components/paragraph";
import styled from "@emotion/styled";

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.linkColor};
  transition: color 0.5s;
  text-decoration: underline;
  font-size: 1.25rem;
`;

const Projects = () => {
  const projects = projectData.map((d) => {
    let link;

    if (d.route) {
      link = (
        <>
          <TextLink href={d.link}>{d.title}</TextLink>
          {" - "}
          <StyledLink to="/frogs">demo</StyledLink>
        </>
      );
    } else {
      link = <TextLink href={d.link}>{d.title}</TextLink>;
    }

    return (
      <React.Fragment key={d.title.replace(" ", "-")}>
        <SmallHeading>{link}</SmallHeading>
        <Paragraph>{d.paragraph}</Paragraph>
      </React.Fragment>
    );
  });
  return (
    <>
      <Heading>projects</Heading>
      {projects}
    </>
  );
};

export default Projects;
