import { FETCH_USERS, SET_IS_PREPARING_USERS_DATA, SET_PREPARED_USERS_DATA } from './actions';

const INITIAL_STATE = {
  data: [],
  statuses: {
    isPrepared: false,
    isPreparing: false
  }
};

const UsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${FETCH_USERS}_SUCCESS`: {
      return {
        ...state,
        data: action.data
      };
    }

    case SET_PREPARED_USERS_DATA: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isPrepared: action.isPrepared
        }
      };
    }
    case SET_IS_PREPARING_USERS_DATA: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isPreparing: action.isPreparing
        }
      };
    }

    default:
      return state;
  }
};

export default UsersReducer;
