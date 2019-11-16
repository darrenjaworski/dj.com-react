import React from 'react';

import { Heading } from '../components/heading';
import Paragraph from '../components/paragraph';
import { TextLink } from '../components/links';

const Home = (props) => (
  <>
    <Heading>home</Heading>
    <Paragraph>
        Welcome. This is my home on the web. I dramatically simplified the site
        and I hope that you like it. I'm always available for public comment.
        Please send an email to
      {' '}
      <TextLink href="mailto:darrenjaworski@gmail.com">
          darrenjaworski@gmail.com
      </TextLink>
        .
        (Please allow 10-15 months for response.)
    </Paragraph>
    <Paragraph>
        Check out my past work in
      {' '}
      <TextLink link="/journalism">journalism</TextLink>
      {' '}
and what I'm
        currently hacking away at in
      {' '}
      <TextLink link="/projects">projects</TextLink>
.
    </Paragraph>
    <Paragraph>
        As always you can find me on
      {' '}
      <TextLink href="https://twitter.com/darrenjaws">Twitter</TextLink>
,
      {' '}
      <TextLink href="https://www.facebook.com/DarrenJJaworski">
          Facebook
      </TextLink>
        ,
      {' '}
      <TextLink href="https://www.instagram.com/darrenjaws/">
          Instagram
      </TextLink>
        ,
      {' '}
      <TextLink href="https://www.linkedin.com/in/darrenjaworski">
          LinkedIn
      </TextLink>
        ,
      {' '}
      <TextLink href="https://github.com/darrenjaworski">Github</TextLink>
,
      {' '}
      <TextLink href="http://bl.ocks.org/darrenjaworski">
          bl.ocks.org
      </TextLink>
        ,
      <TextLink href="https://medium.com/@DarrenJaws">Medium</TextLink>
,
      {' '}
      <TextLink href="https://www.strava.com/athletes/3266824">
          Strava
      </TextLink>
        ... (I'm sure I'm missing others. You get the point. Troll away.)
    </Paragraph>
    <Paragraph>
        For those interested in watching me wear a tie and answer questions:
      {' '}
      <TextLink href="https://docs.google.com/document/d/19L1W3PXUyboaUWB0shDedjKwzRPsqiBw0VxsAir45EU/edit?usp=sharing">
          résumé
      </TextLink>
        .
    </Paragraph>
    <Paragraph>Now with dark theme.</Paragraph>
  </>
);

export default Home;
