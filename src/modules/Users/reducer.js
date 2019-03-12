import UserNotFoundException from './exceptions/UserNotFoundException';
import { ADD_USER, DELETE_USER, EDIT_USER, FETCH_USERS, SET_PREPARED_USERS_DATA } from './actions';
import { findIndex } from 'lodash';

const INITIAL_STATE = {
  data: [],
  statuses: {
    isPrepared: false,
    isPreparing: false,
    isAdding: false,
    isEditing: [],
    isFetching: false,
    isDeleting: false
  },
  errors: {
    afterPreparing: false,
    afterFetching: false,
    afterAdding: false,
    afterEditing: [],
    afterDeleting: false
  }
};

export const getUsers = state => state.users.data;

const UsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${FETCH_USERS}_REQUEST`: {
      return {
        ...state,
        data: action.data,
        statuses: {
          ...state.statuses,
          isFetching: true
        },
        errors: {
          ...state.errors,
          afterFetching: false
        }
      };
    }

    case `${FETCH_USERS}_SUCCESS`: {
      return {
        ...state,
        data: action.data,
        statuses: {
          ...state.statuses,
          isFetching: false
        },
        errors: {
          ...state.errors,
          afterFetching: false
        }
      };
    }

    case `${FETCH_USERS}_FAILURE`: {
      return {
        ...state,
        data: action.data,
        statuses: {
          ...state.statuses,
          isFetching: false
        },
        errors: {
          ...state.errors,
          afterFetching: true
        }
      };
    }

    case `${SET_PREPARED_USERS_DATA}_REQUEST`: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isPreparing: true
        },
        errors: {
          ...state.errors,
          afterPreparing: false
        }
      };
    }

    case `${SET_PREPARED_USERS_DATA}_SUCCESS`: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isPreparing: false,
          isPrepared: true
        },
        errors: {
          ...state.errors,
          afterPreparing: false
        }
      };
    }

    case `${SET_PREPARED_USERS_DATA}_FAILURE`: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isPreparing: false
        },
        errors: {
          ...state.errors,
          afterPreparing: true
        }
      };
    }

    case `${ADD_USER}_REQUEST`: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isAdding: true
        },
        errors: {
          ...state.errors,
          afterAdding: false
        }
      };
    }

    case `${ADD_USER}_SUCCESS`: {
      return {
        ...state,
        data: [...state.data, action.user]
      };
    }

    case `${ADD_USER}_FAILURE`: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isAdding: false
        },
        errors: {
          ...state.errors,
          afterAdding: true
        }
      };
    }

    case `${EDIT_USER}_REQUEST`: {
      const newIsEditing = [...state.statuses.isEditing];
      const newAfterEditing = [...state.errors.afterEditing];
      const isEditingIndex = newIsEditing.indexOf(action.user.id);
      const afterEditingIndex = newAfterEditing.indexOf(action.user.id);
      if (isEditingIndex === -1) {
        newIsEditing.push(action.user.id);
      }

      if (afterEditingIndex > -1) {
        newAfterEditing.splice(afterEditingIndex, 1);
      }

      return {
        ...state,
        statuses: {
          ...state.statuses,
          isEditing: newIsEditing
        },
        errors: {
          ...state.errors,
          afterEditing: newAfterEditing
        }
      };
    }

    case `${EDIT_USER}_SUCCESS`: {
      const index = findIndex(state.data, user => user.id === action.user.id);
      if (index < 0) {
        throw new UserNotFoundException('Exception. User to edit not found');
      }
      const newData = [...state.data];
      newData[index] = action.user;

      const newIsEditing = [...state.statuses.isEditing];
      const newAfterEditing = [...state.errors.afterEditing];
      const isEditingIndex = newIsEditing.indexOf(action.user.id);
      const afterEditingIndex = newAfterEditing.indexOf(action.user.id);
      if (isEditingIndex > -1) {
        newIsEditing.splice(isEditingIndex, 1);
      }

      if (afterEditingIndex > -1) {
        newAfterEditing.splice(afterEditingIndex, 1);
      }

      return {
        ...state,
        data: newData,
        statuses: {
          ...state.statuses,
          isEditing: newIsEditing
        },
        errors: {
          ...state.errors,
          afterEditing: newAfterEditing
        }
      };
    }

    case `${EDIT_USER}_FAILURE`: {
      const newIsEditing = [...state.statuses.isEditing];
      const newAfterEditing = [...state.errors.afterEditing];
      const isEditingIndex = newIsEditing.indexOf(action.user.id);
      const afterEditingIndex = newAfterEditing.indexOf(action.user.id);
      if (isEditingIndex > -1) {
        newIsEditing.splice(isEditingIndex, 1);
      }

      if (afterEditingIndex === -1) {
        newAfterEditing.push(action.user.id);
      }

      return {
        ...state,
        statuses: {
          ...state.statuses,
          isEditing: newIsEditing
        },
        errors: {
          ...state.errors,
          afterEditing: newAfterEditing
        }
      };
    }

    case `${DELETE_USER}_REQUEST`: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isDeleting: true
        },
        errors: {
          ...state.errors,
          afterDeleting: false
        }
      };
    }

    case `${DELETE_USER}_SUCCESS`: {
      const index = findIndex(state.data, user => user.id === action.userId);
      if (index < 0) {
        throw new UserNotFoundException('Exception. User to delete not found');
      }

      const newData = [...state.data];
      newData.splice(index, 1);

      return {
        ...state,
        data: newData,
        statuses: {
          ...state.statuses,
          isDeleting: false
        },
        errors: {
          ...state.errors,
          afterDeleting: false
        }
      };
    }

    case `${DELETE_USER}_FAILURE`: {
      return {
        ...state,
        statuses: {
          ...state.statuses,
          isDeleting: false
        },
        errors: {
          ...state.errors,
          afterDeleting: true
        }
      };
    }

    default:
      return state;
  }
};

export default UsersReducer;
