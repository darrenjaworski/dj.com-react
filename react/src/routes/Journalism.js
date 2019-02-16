import React, { Component } from "react";

import journalismData from "../data/journalism.json";
import { Heading, SmallHeading } from "../components/heading";
import { TextLink } from "../components/links";
import { ListItem, UnorderedList } from "../components/list";

class Journalism extends Component {
  render() {
    let sections = journalismData.map(d => {
      let articles = d.articles.map(a => {
        return (
          <ListItem>
            <TextLink href={a.link}>{a.title}</TextLink>
          </ListItem>
        );
      });
      return (
        <>
          <SmallHeading>{d.section}</SmallHeading>
          <UnorderedList>{articles}</UnorderedList>
        </>
      );
    });
    return (
      <>
        <Heading>journalism</Heading>
        {sections}
      </>
    );
  }
}

export default Journalism;
