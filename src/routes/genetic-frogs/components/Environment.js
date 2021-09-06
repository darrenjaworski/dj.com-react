import styled from "@emotion/styled";
import React from "react";

const Grid = styled.div`
  width: 100%;
  margin-top: 1rem;
  background: rgb(
    ${(props) => props.bg[0]},
    ${(props) => props.bg[1]},
    ${(props) => props.bg[2]}
  );
  border: 0.5rem solid white;
`;

function Environment({ children, bg }) {
  return <Grid bg={bg}>{children}</Grid>;
}

export { Environment };
