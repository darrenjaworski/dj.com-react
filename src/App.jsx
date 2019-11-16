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
import FourOhFour from "./routes/404";

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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: "dark",
      image: undefined
    };
  }

  componentDidMount() {
    const themeChoice = localStorage.getItem("theme");
    if (themeChoice) {
      this.setState({ theme: themeChoice });
    }
    const width = getRandomIntInclusive(500, 720);
    const height = getRandomIntInclusive(300, 600);
    const url = `https://www.fillmurray.com/g/${width}/${height}`;

    const image = new Image();
    image.src = url;
    this.setState({ image: url });
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
    const { theme, image } = this.state;
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
                  <Route component={() => <FourOhFour image={image} />} />
                </Switch>
              </main>
              <Toggle className="toggle" onClick={toggleTheme}>
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
