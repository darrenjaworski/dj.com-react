import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import themes from "./theme/theme";
import { Sun, Moon } from "react-feather";

import Home from "./routes/Home";
import Projects from "./routes/Projects";
import Journalism from "./routes/Journalism";
import FourOhFour from "./routes/404.js";

const AppWrapper = styled.div`
  background: ${props => props.theme.bgColor};
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
  color: ${props => props.theme.color};
  transition: all 0.5s;
  border: none;
  margin-top: 1rem;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: "dark"
    };
  }

  componentDidMount() {
    const themeChoice = localStorage.getItem("theme");
    if (themeChoice) {
      this.setState({ theme: themeChoice });
    }
  }

  toggleTheme = () => {
    if (this.state.theme === "dark") {
      this.setState({ theme: "light" });
      localStorage.setItem("theme", "light");
    } else {
      this.setState({ theme: "dark" });
      localStorage.setItem("theme", "dark");
    }
  };

  render() {
    const { theme } = this.state;
    const toggleTheme = this.toggleTheme;
    const NavStyle = {
      color: `${themes[theme].linkColor}`,
      transition: "color 0.5s",
      textDecoration: "underline",
      marginRight: "0.5rem",
      fontSize: "1.25rem"
    };

    return (
      <Router>
        <ThemeProvider theme={themes[theme]}>
          <AppWrapper>
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
                  <Route component={FourOhFour} />
                </Switch>
              </main>
              <Toggle onClick={toggleTheme}>
                {theme === "dark" ? <Sun /> : <Moon />}
              </Toggle>
            </Container>
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
