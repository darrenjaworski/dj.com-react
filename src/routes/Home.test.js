import React from "react";
import renderer from "react-test-renderer";

import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";

describe("Home", () => {
  it("renders without crashing", () => {
    const tree = renderer
      .create(
        <Router>
          <Home />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
