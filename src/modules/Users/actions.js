import axios from 'axios';
import * as apiConfig from "../../config/apiConfig";

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_RANDOM_DATA = 'FETCH_USERS_RANDOM_DATA';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_PREPARED_USERS_DATA = 'SET_PREPARED_USERS_DATA';
export const SET_IS_PREPARING_USERS_DATA = 'SET_IS_PREPARING_USERS_DATA';

const fetchUsersRequest = () => {
  return {
    type: `${FETCH_USERS}_REQUEST`
  };
};

const fetchUsersSuccess = (data) => {
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
    .get(`${apiConfig.apiUrl}/users`)
    .then(response => {
      dispatch(fetchUsersSuccess(response.data));
      resolve && resolve(response.data);
    })
    .catch(error => {
      console.log(error);
      dispatch(fetchUsersFailure());
      reject && reject(error);
    });
};

const fetchUsersRandomDataRequest = () => {
  return {
    type: `${FETCH_USERS_RANDOM_DATA}_REQUEST`
  };
};

const fetchUsersRandomDataSuccess = (data) => {
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
      console.log(error);
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
      console.log(response);
      dispatch(addUserSuccess(user));
      resolve && resolve(user);
    })
    .catch(error => {
      console.log(error);
      dispatch(addUserFailure(user));
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

export const deleteUser = userId => dispatch => {
  dispatch(deleteUserRequest(userId));

  return axios
    .delete(`${apiConfig.apiUrl}/${userId}`)
    .then(response => {
      console.log(response);
      dispatch(deleteUserSuccess(userId));
    })
    .catch(error => {
      console.log(error);
      dispatch(deleteUserFailure(userId));
    });
};

export const setPreparedUsersData = (isPrepared) => {
  return {
    type: SET_PREPARED_USERS_DATA,
    isPrepared
  };
};

export const setIsPreparingUsersData = (isPreparing) => {
  return {
    type: SET_IS_PREPARING_USERS_DATA,
    isPreparing
  };
};