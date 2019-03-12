import './app_router.scss';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import Users from './modules/Users/Users';
import Home from './modules/Home/Home';
import { connect } from 'react-redux';
import {
  addUser,
  fetchUsers,
  fetchUsersRandomData,
  setPreparedUsersDataRequest,
  setPreparedUsersDataSuccess,
  setPreparedUsersDataFailure
} from './modules/Users/actions';

class AppRouter extends Component {
  componentDidMount() {
    this.props.setPreparedUsersDataRequest();

    new Promise((resolve, reject) => {
      this.props.fetchUsers(resolve, reject);
    })
      .then(data => {
        if (!data?.length) {
          new Promise((resolve, reject) => {
            this.props.fetchUsersRandomData(resolve, reject);
          })
            .then(data => {
              const users = data.map((user, index) => {
                return {
                  firstName: user.name.first,
                  lastName: user.name.last,
                  avatar: user.picture.large,
                  position: index
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
              )
                .then(() => {
                  this.props.setPreparedUsersDataSuccess();
                })
                .catch(() => {
                  console.error('Add users failure');
                  this.props.setPreparedUsersDataFailure();
                });
            })
            .catch(() => {
              console.error('Fetch random users failure');
              this.props.setPreparedUsersDataFailure();
            });
        } else {
          this.props.setPreparedUsersDataSuccess();
        }
      })
      .catch(() => {
        console.error('Fetch users failure');
        this.props.setPreparedUsersDataFailure();
      });
  }

  render() {
    const { isPreparedUsersData, isPreparingUsersData, afterPreparingUsersData } = this.props;

    if (isPreparingUsersData) {
      return 'Preparing...';
    }

    if (afterPreparingUsersData) {
      return 'Preparing failure';
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

          <ReduxToastr />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPreparingUsersData: state.users.statuses.isPreparing,
    afterPreparingUsersData: state.users.errors.afterPreparing,
    isPreparedUsersData: state.users.statuses.isPrepared
  };
};

const mapDispatchToProps = {
  fetchUsers,
  fetchUsersRandomData,
  addUser,
  setPreparedUsersDataRequest,
  setPreparedUsersDataSuccess,
  setPreparedUsersDataFailure
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
