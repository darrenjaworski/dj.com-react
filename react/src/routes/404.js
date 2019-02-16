import React, { Component } from "react";

import { Heading } from "../components/heading";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      billurl: undefined
    };
  }
  componentDidMount() {
    const width = getRandomIntInclusive(500, 720);
    const height = getRandomIntInclusive(300, 600);
    const url = `https://www.fillmurray.com/g/${width}/${height}`;

    this.setState({ billurl: url });
  }
  render() {
    return (
      <>
        <Heading>
          Human sacrifice, dogs and cats living together... mass hysteria!
        </Heading>
        <img src={this.state.billurl} alt="Bill Murray." />
      </>
    );
  }
}

export default Home;
