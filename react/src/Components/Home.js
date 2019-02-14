import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <>
        <h1>home</h1>
        <p>
          Welcome. This is my home on the web. I dramatically simplified the
          site and I hope that you like it. I'm always available for public
          comment. Please send an email to{" "}
          <a href="mailto:darrenjaworski@gmail.com">darrenjaworski@gmail.com</a>{" "}
          . (Please allow 10-15 months for response.)
        </p>
        <p>
          Check out my past work in <a href="/journalism">journalism</a> and
          what I'm currently hacking away at in <a href="/projects">projects</a>
          .
        </p>
        <p>
          As always you can find me on{" "}
          <a href="https://twitter.com/darrenjaws">Twitter</a>,{" "}
          <a href="https://www.facebook.com/DarrenJJaworski">Facebook</a>,{" "}
          <a href="https://www.instagram.com/darrenjaws/">Instagram</a>,{" "}
          <a href="https://www.linkedin.com/in/darrenjaworski">LinkedIn</a>,{" "}
          <a href="https://github.com/darrenjaworski">Github</a>,{" "}
          <a href="http://bl.ocks.org/darrenjaworski">bl.ocks.org</a>, 
          <a href="https://medium.com/@DarrenJaws">Medium</a>,{" "}
          <a href="https://www.strava.com/athletes/3266824">Strava</a>... (I'm
          sure I'm missing others. You get the point. Troll away.)
        </p>
        <p>
          For those interested in watching me wear a tie and answer questions:{" "}
          <a href="https://docs.google.com/document/d/19L1W3PXUyboaUWB0shDedjKwzRPsqiBw0VxsAir45EU/edit?usp=sharing">
            résumé
          </a>
          .
        </p>
      </>
    );
  }
}

export default Home;
