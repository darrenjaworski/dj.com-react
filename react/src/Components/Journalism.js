import React, { Component } from "react";

import journalismData from "../data/journalism.json";

class Journalism extends Component {
  render() {
    let sections = journalismData.map(d => {
      let articles = d.articles.map(a => {
        return (
          <li>
            <a href={a.link}>{a.title}</a>
          </li>
        );
      });
      return (
        <div>
          <h2>{d.section}</h2>
          <ul>{articles}</ul>
        </div>
      );
    });
    return (
      <main>
        <h1>journalism</h1>
        {sections}
      </main>
    );
  }
}

export default Journalism;
