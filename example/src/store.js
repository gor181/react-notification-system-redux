import {createStore, combineReducers} from 'redux';

import {reducer as notifications} from 'react-notification-system-redux';

export function configureStore(initialState = {}) {
  return createStore(
    combineReducers({
      notifications
    }),
    initialState
  );
}
