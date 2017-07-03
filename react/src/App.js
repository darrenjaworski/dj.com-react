import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'

import Home from './Components/Home';
import Projects from './Components/Projects';
import Journalism from './Components/Journalism';
import FourOhFour from './Components/404.js';

import 'normalize.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <nav id="navigation" className="nav">
              <NavLink to="/" exact activeClassName="active">home</NavLink>
              <NavLink to="/projects" activeClassName="active">projects</NavLink>
              <NavLink to="/journalism" activeClassName="active">journalism</NavLink>
            </nav>
          </header>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/projects" component={Projects}></Route>
            <Route path="/journalism" component={Journalism}></Route>
            <Route component={FourOhFour}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
