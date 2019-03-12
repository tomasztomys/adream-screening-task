import axios from 'axios';
import * as apiConfig from '../../config/apiConfig';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_RANDOM_DATA = 'FETCH_USERS_RANDOM_DATA';
export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_PREPARED_USERS_DATA = 'SET_PREPARED_USERS_DATA';

const fetchUsersRequest = () => {
  return {
    type: `${FETCH_USERS}_REQUEST`
  };
};

const fetchUsersSuccess = data => {
  return {
    type: `${FETCH_USERS}_SUCCESS`,
    data
  };
};

const fetchUsersFailure = () => {
  return {
    type: `${FETCH_USERS}_FAILURE`
  };
};

export const fetchUsers = (resolve, reject) => dispatch => {
  dispatch(fetchUsersRequest());

  return axios
    .get(`${apiConfig.apiUrl}/users?_sort=position`)
    .then(response => {
      dispatch(fetchUsersSuccess(response.data));
      resolve && resolve(response.data);
    })
    .catch(error => {
      console.error(error);
      dispatch(fetchUsersFailure());
      reject && reject(error);
    });
};

const fetchUsersRandomDataRequest = () => {
  return {
    type: `${FETCH_USERS_RANDOM_DATA}_REQUEST`
  };
};

const fetchUsersRandomDataSuccess = data => {
  return {
    type: `${FETCH_USERS_RANDOM_DATA}_SUCCESS`,
    data
  };
};

const fetchUsersRandomDataFailure = () => {
  return {
    type: `${FETCH_USERS_RANDOM_DATA}_FAILURE`
  };
};

export const fetchUsersRandomData = (resolve, reject) => dispatch => {
  dispatch(fetchUsersRandomDataRequest());

  return axios
    .get(`https://randomuser.me/api?results=10`)
    .then(response => {
      dispatch(fetchUsersRandomDataSuccess(response.data.results));
      resolve && resolve(response.data.results);
    })
    .catch(error => {
      console.error(error);
      dispatch(fetchUsersRandomDataFailure());
      reject && reject(error);
    });
};

const addUserRequest = user => {
  return {
    type: `${ADD_USER}_REQUEST`,
    user
  };
};

const addUserSuccess = user => {
  return {
    type: `${ADD_USER}_SUCCESS`,
    user
  };
};

const addUserFailure = user => {
  return {
    type: `${ADD_USER}_FAILURE`,
    user
  };
};

export const addUser = (user, resolve, reject) => dispatch => {
  dispatch(addUserRequest(user));

  return axios
    .post(`${apiConfig.apiUrl}/users`, user)
    .then(response => {
      dispatch(addUserSuccess(response.data));
      resolve && resolve(response.data);
    })
    .catch(error => {
      console.error(error);
      dispatch(addUserFailure(user));
      reject && reject(user);
    });
};

const editUserRequest = user => {
  return {
    type: `${EDIT_USER}_REQUEST`,
    user
  };
};

const editUserSuccess = user => {
  return {
    type: `${EDIT_USER}_SUCCESS`,
    user
  };
};

const editUserFailure = user => {
  return {
    type: `${EDIT_USER}_FAILURE`,
    user
  };
};

export const editUser = (user, resolve, reject) => dispatch => {
  dispatch(editUserRequest(user));

  return axios
    .put(`${apiConfig.apiUrl}/users/${user.id}`, user)
    .then(response => {
      dispatch(editUserSuccess(response.data));
      resolve && resolve(response.data);
    })
    .catch(error => {
      console.error(error);
      dispatch(editUserFailure(user));
      reject && reject(user);
    });
};

const deleteUserRequest = userId => {
  return {
    type: `${DELETE_USER}_REQUEST`,
    userId
  };
};

const deleteUserSuccess = userId => {
  return {
    type: `${DELETE_USER}_SUCCESS`,
    userId
  };
};

const deleteUserFailure = userId => {
  return {
    type: `${DELETE_USER}_FAILURE`,
    userId
  };
};

export const deleteUser = (userId, resolve, reject) => dispatch => {
  dispatch(deleteUserRequest(userId));

  return axios
    .delete(`${apiConfig.apiUrl}/users/${userId}`)
    .then(response => {
      dispatch(deleteUserSuccess(userId));
      resolve && resolve(response.data);
    })
    .catch(error => {
      console.error(error);
      dispatch(deleteUserFailure(userId));
      reject && reject(userId);
    });
};


export const setPreparedUsersDataRequest = () => {
  return {
    type: `${SET_PREPARED_USERS_DATA}_REQUEST`
  };
};

export const setPreparedUsersDataSuccess = () => {
  return {
    type: `${SET_PREPARED_USERS_DATA}_SUCCESS`
  };
};

export const setPreparedUsersDataFailure = () => {
  return {
    type: `${SET_PREPARED_USERS_DATA}_FAILURE`
  };
};
