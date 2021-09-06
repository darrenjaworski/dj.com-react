import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import { Sun, Moon } from "react-feather";

import themes from "./theme/theme";
import Home from "./routes/Home";
import Projects from "./routes/Projects";
import Journalism from "./routes/Journalism";
import FourOhFour from "./routes/404";
import GeneticFrogs from "./routes/genetic-frogs/GeneticFrogs";

const AppWrapper = styled.div`
  background: ${(props) => props.theme.bgColor};
  transition: background 0.3s;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 45rem;
  margin: auto;
  padding: 1rem;
`;

const Nav = styled.nav`
  padding: 1rem 0;
`;

const Toggle = styled.button`
  position: relative;
  background: transparent;
  color: ${(props) => props.theme.color};
  transition: all 0.5s;
  border: none;
  margin-top: 1rem;
`;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBillMurray() {
  const width = getRandomIntInclusive(500, 720);
  const height = getRandomIntInclusive(300, 600);
  const url = `https://www.fillmurray.com/g/${width}/${height}`;

  const image = new Image();
  image.src = url;

  return url;
}

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );
  const [image] = useState(getRandomBillMurray());

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  useEffect(() => localStorage.setItem("theme", theme));

  const NavStyle = {
    color: `${themes[theme].linkColor}`,
    transition: "color 0.5s",
    textDecoration: "underline",
    marginRight: "0.5rem",
    fontSize: "1.25rem",
  };

  return (
    <Router>
      <ThemeProvider theme={themes[theme]}>
        <AppWrapper data-testid="body-theme">
          <Container>
            <header>
              <Nav>
                <NavLink style={NavStyle} to="/">
                  home
                </NavLink>
                <NavLink style={NavStyle} to="/projects">
                  projects
                </NavLink>
                <NavLink style={NavStyle} to="/journalism">
                  journalism
                </NavLink>
              </Nav>
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/projects" component={Projects} />
                <Route path="/journalism" component={Journalism} />
                <Route path="/frogs" component={GeneticFrogs} />
                <Route component={() => <FourOhFour image={image} />} />
              </Switch>
            </main>
            <Toggle data-testid="toggle" onClick={toggleTheme}>
              {theme === "dark" ? <Sun /> : <Moon />}
            </Toggle>
          </Container>
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
};

export default App;
