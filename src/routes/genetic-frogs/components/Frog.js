import styled from "@emotion/styled";
import React from "react";

const FrogContainer = styled.div`
  margin: 10px;
  width: 2em;
  height: 2em;
  display: inline-block;
  background: ${(props) => props.color};
`;

const CenteredFitness = styled.span`
  text-align: center;
  display: block;
  padding-top: 7px;
`;

function Frog({ frog }) {
  return (
    <FrogContainer color={frog.color}>
      <CenteredFitness>{frog.fitness.toFixed(0)}</CenteredFitness>
    </FrogContainer>
  );
}

export { Frog };
