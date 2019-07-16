import React from "react";
import renderer from "react-test-renderer";

import FourOhFour from "./404";

describe("FourOhFour", () => {
  const img = "https://www.fillmurray.com/g/400/400";
  it("renders without crashing", () => {
    const tree = renderer.create(<FourOhFour image={img} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
