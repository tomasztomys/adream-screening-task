import React, { Component } from 'react';
import './app_router.scss';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Users from './modules/Users/Users';
import Home from './modules/Home/Home';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div className="app-router">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/users" component={Users} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
