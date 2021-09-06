import { Environment } from "./components/Environment";
import { frogReducer, initialData } from "./data/main";
import { Frog as FrogComponent } from "./components/Frog";
import React, { useReducer } from "react";
import Paragraph from "../../components/paragraph";
import { SmallHeading } from "../../components/heading";
import styled from "@emotion/styled";

const Button = styled.button`
  color: ${(props) => props.theme.color};
  background: ${(props) => props.theme.bgColor};
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.color};
  transition: color 0.5s, background 0.5s, border 0.5s;
  &:hover {
    color: ${(props) => props.theme.bgColor};
    background: ${(props) => props.theme.color};
    border-color: ${(props) => props.theme.bgColor};
  }
`;

function GeneticFrogs() {
  const [data, dispatch] = useReducer(frogReducer, initialData);

  return (
    <div>
      <Paragraph>
        Frogs are represented here by color squares with a fitness number in the
        center. The initial population's colors and background color are chosen
        at random. The frogs goal is to blend with the background as closely as
        possible to maximize survival. With each generation, the frogs that have
        the highest fitness survive and create offspring. That offspring have
        color averages of the parent frogs, plus a small percentage of random
        mutation. The frogs through successive generations are able to more
        closely adapt to their environment.
      </Paragraph>
      <SmallHeading>{`generation number ${data.generationNumber}`}</SmallHeading>
      <Button onClick={() => dispatch({ type: "generate" })}>
        create new generation
      </Button>
      <Button onClick={() => dispatch({ type: "newBackground" })}>
        create new background color
      </Button>
      <Environment bg={data.backgroundColor}>
        {data.frogs.map((frog) => {
          return <FrogComponent key={frog.uuid} frog={frog} />;
        })}
      </Environment>
    </div>
  );
}

export default GeneticFrogs;
