import React from 'react';

import projectData from '../data/projects.json';
import { Heading, SmallHeading } from '../components/heading';
import { TextLink } from '../components/links';
import Paragraph from '../components/paragraph';

const Projects = () => {
  const projects = projectData.map((d) => (
    <React.Fragment key={d.title.replace(' ', '-')}>
      <SmallHeading>
        <TextLink href={d.link}>{d.title}</TextLink>
      </SmallHeading>
      <Paragraph>{d.paragraph}</Paragraph>
    </React.Fragment>
  ));
  return (
    <>
      <Heading>projects</Heading>
      {projects}
    </>
  );
};

export default Projects;
