import React, { Component } from 'react';

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
    }
  }
  componentWillMount() {
    const width = getRandomIntInclusive(400, 700);
    const height = getRandomIntInclusive(300, 500);
    const url = `https://www.fillmurray.com/g/${width}/${height}`;
    var img = new Image();
    img.src = url;

    this.setState({billurl: url});
  }
  render() {
    return (
      <main>
        <h1>Something strange.</h1>
        <img src={this.state.billurl} alt="Bill Murray." />
      </main>
    )
  }
}

export default Home;
