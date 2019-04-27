import React from "react";
import renderer from "react-test-renderer";

import Projects from "./Projects";

describe("FourOhFour", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<Projects />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
