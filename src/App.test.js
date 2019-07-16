import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render } from "enzyme";

import App from "./App";

describe("app", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be able to toggle light and dark mode", () => {});

  it("should store the theme mode in localstorage", () => {});

  it("should render with a dark background when in dark mode", () => {
    const wrapper = mount(<App />);
    wrapper.setState({ theme: "dark" });
    expect(wrapper.state("theme")).toBe("dark");
  });

  it("should render with a light background when in light mode", () => {
    const wrapper = mount(<App />);
    wrapper.setState({ theme: "light" });
    expect(wrapper.state("theme")).toBe("light");
  });

  it("should toggle between modes", () => {
    const clickWrapper = mount(<App />);
    const toggle = clickWrapper.find(".toggle");

    toggle.simulate("click");
    expect(clickWrapper.state.theme).toBe("light");

    toggle.simulate("click");
    expect(clickWrapper.state.theme).toBe("dark");
  });
});
