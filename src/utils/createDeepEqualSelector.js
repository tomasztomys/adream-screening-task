import isEqual from 'lodash/isEqual';

import { createSelectorCreator, defaultMemoize } from 'reselect';

export default createSelectorCreator(defaultMemoize, isEqual);
