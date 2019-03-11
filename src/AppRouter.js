import React, { Component } from 'react';
import './app_router.scss';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Users from './modules/Users/Users';
import Home from './modules/Home/Home';
import { connect } from 'react-redux';
import {
  addUser,
  fetchUsers,
  fetchUsersRandomData,
  setIsPreparingUsersData,
  setPreparedUsersData
} from './modules/Users/actions';

class AppRouter extends Component {
  componentDidMount() {
    this.props.setIsPreparingUsersData(true);

    new Promise((resolve, reject) => {
      this.props.fetchUsers(resolve, reject);
    }).then(data => {
      if (!data?.length) {
        new Promise((resolve, reject) => {
          this.props.fetchUsersRandomData(resolve, reject);
        }).then(data => {
          const users = data.map(user => {
            return {
              id: user.email,
              firstName: user.name.first,
              lastName: user.name.last,
              avatar: user.picture.large
            };
          });

          Promise.all(
            users.map((user, index) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  this.props.addUser(user, resolve, reject);
                }, index * 100);
              });
            })
          ).then(() => {
            this.props.setPreparedUsersData(true);
            this.props.setIsPreparingUsersData(false);
          });
        });
      } else {
        this.props.setPreparedUsersData(true);
        this.props.setIsPreparingUsersData(false);
      }
    });
  }

  render() {
    const { isPreparedUsersData, isPreparingUsersData } = this.props;

    if (isPreparingUsersData) {
      return 'Preparing...';
    }

    if (!isPreparedUsersData) {
      return 'Data is not prepared yet.';
    }

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

const mapStateToProps = state => {
  return {
    isPreparingUsersData: state.users.statuses.isPreparing,
    isPreparedUsersData: state.users.statuses.isPrepared
  };
};

const mapDispatchToProps = {
  fetchUsers,
  fetchUsersRandomData,
  addUser,
  setPreparedUsersData,
  setIsPreparingUsersData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
