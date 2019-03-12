import createDeepEqualSelector from '../../utils/createDeepEqualSelector';
import { getUsers } from './reducer';
import find from 'lodash/find';

export const selectUsers = createDeepEqualSelector([getUsers, (state, id) => id], (users, id) => {
  if (!id) {
    return users;
  }

  return find(users, user => user.id === id);
});
