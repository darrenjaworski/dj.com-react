import React from "react";

import projectData from "../data/projects.json";
import { Heading, SmallHeading } from "../components/heading";
import { TextLink } from "../components/links";
import Paragraph from "../components/paragraph";

class Projects extends React.Component {
  render() {
    let projects = projectData.map(d => {
      return (
        <>
          <SmallHeading>
            <TextLink href={d.link}>{d.title}</TextLink>
          </SmallHeading>
          <Paragraph>{d.paragraph}</Paragraph>
        </>
      );
    });
    return (
      <>
        <Heading>projects</Heading>
        {projects}
      </>
    );
  }
}

export default Projects;
