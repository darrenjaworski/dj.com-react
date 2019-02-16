import React from "react";
import styled from "@emotion/styled";

import { Heading } from "../components/heading";

const StyledImage = styled.img`
  width: 100%;
  background: ${props => props.theme.color};
`;

class Home extends React.Component {
  render() {
    const { image } = this.props;
    return (
      <>
        <Heading>
          Human sacrifice, dogs and cats living together... mass hysteria!
        </Heading>
        <StyledImage src={image} alt="Bill Murray." />
      </>
    );
  }
}

export default Home;
