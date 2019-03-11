import axios from 'axios';

const DELETE_USER = 'DELETE_USER';

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
    .delete(`/users/${userId}`)
    .then(response => {
      console.log(response);
      dispatch(deleteUserSuccess(userId));
    })
    .catch(error => {
      console.log(error);
      dispatch(deleteUserFailure(userId));
    });
};
