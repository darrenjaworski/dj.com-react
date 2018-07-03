import React, { Component } from "react";

import projectData from "../data/projects.json";

class Projects extends Component {
  render() {
    let projects = projectData.map(d => {
      return (
        <div>
          <h2>
            <a href={d.link}>{d.title}</a>
          </h2>
          <p dangerouslySetInnerHTML={{ __html: d.paragraph }} />
        </div>
      );
    });
    return (
      <main>
        <h1>projects</h1>
        {projects}
      </main>
    );
  }
}

export default Projects;
