import React from "react";
import renderer from "react-test-renderer";

import Home from "./Hone";

describe("Home", () => {
  const img = "https://www.fillmurray.com/g/400/400";
  it("renders without crashing", () => {
    const tree = renderer.create(<Hone />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
