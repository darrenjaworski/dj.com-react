import React from "react";

import journalismData from "../data/journalism.json";
import { Heading, SmallHeading } from "../components/heading";
import { TextLink } from "../components/links";
import { ListItem, UnorderedList } from "../components/list";

const Journalism = () => {
  let sections = journalismData.map(d => {
    let articles = d.articles.map(a => {
      return (
        <ListItem key={a.title.replace(" ", "-")}>
          <TextLink href={a.link}>{a.title}</TextLink>
        </ListItem>
      );
    });
    return (
      <React.Fragment key={d.section.replace(" ", "-")}>
        <SmallHeading>{d.section}</SmallHeading>
        <UnorderedList>{articles}</UnorderedList>
      </React.Fragment>
    );
  });
  return (
    <>
      <Heading>journalism</Heading>
      {sections}
    </>
  );
};

export default Journalism;
