import React from "react";
import renderer from "react-test-renderer";

import Journalism from "./Journalism";

describe("FourOhFour", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<Journalism />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
