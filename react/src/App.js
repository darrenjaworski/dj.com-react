import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

import Home from "./Components/Home";
import Projects from "./Components/Projects";
import Journalism from "./Components/Journalism";
import FourOhFour from "./Components/404.js";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <header>
            <nav id="navigation">
              <NavLink to="/">home</NavLink>
              <NavLink to="/projects">projects</NavLink>
              <NavLink to="/journalism">journalism</NavLink>
            </nav>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/projects" component={Projects} />
              <Route path="/journalism" component={Journalism} />
              <Route component={FourOhFour} />
            </Switch>
          </main>
        </>
      </Router>
    );
  }
}

export default App;
