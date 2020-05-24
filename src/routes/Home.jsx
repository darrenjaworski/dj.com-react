import React from "react";

import { Heading } from "../components/heading";
import Paragraph from "../components/paragraph";
import { TextLink } from "../components/links";

const Home = () => (
  <>
    <Heading>home</Heading>
    <Paragraph>
      Welcome. This is my home on the web. I dramatically simplified the site
      and I hope that you like it. I&apos;m always available for public comment.
      Please send an email to&nbsp;
      <TextLink href="mailto:darrenjaworski@gmail.com">
        darrenjaworski@gmail.com
      </TextLink>
      . (Please allow 10-15 months for response.)
    </Paragraph>
    <Paragraph>
      Check out my past work in&nbsp;
      <TextLink link="/journalism">journalism</TextLink>
      &nbsp;and what I&apos;m currently hacking away at in&nbsp;
      <TextLink link="/projects">projects</TextLink>.
    </Paragraph>
    <Paragraph>
      As always you can find me on&nbsp;
      <TextLink href="https://twitter.com/darrenjaws">Twitter</TextLink>
      {", "}
      <TextLink href="https://www.facebook.com/DarrenJJaworski">
        Facebook
      </TextLink>
      {", "}
      <TextLink href="https://www.instagram.com/darrenjaws/">
        Instagram
      </TextLink>
      {", "}
      <TextLink href="https://www.linkedin.com/in/darrenjaworski">
        LinkedIn
      </TextLink>
      {", "}
      <TextLink href="https://github.com/darrenjaworski">Github</TextLink>
      {", "}
      <TextLink href="https://medium.com/@DarrenJaws">Medium</TextLink>
      {", "}
      <TextLink href="https://www.strava.com/athletes/3266824">
        Strava
      </TextLink>{" "}
      ... (I&apos;m sure I&apos;m missing others. You get the point. Troll
      away.)
    </Paragraph>
    <Paragraph>
      For those interested in watching me wear a tie and answer questions:&nbsp;
      <TextLink href="https://docs.google.com/document/d/19L1W3PXUyboaUWB0shDedjKwzRPsqiBw0VxsAir45EU/edit?usp=sharing">
        résumé
      </TextLink>
      .
    </Paragraph>
    <Paragraph>Now with dark theme.</Paragraph>
  </>
);

export default Home;
