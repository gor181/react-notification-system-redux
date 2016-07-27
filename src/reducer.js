import {filter, omit} from 'lodash';

import {RNS_SHOW_NOTIFICATION, RNS_HIDE_NOTIFICATION} from './const';

export default function Notifications(state = [], action) {
  switch(action.type) {
    case RNS_SHOW_NOTIFICATION:
      return [
        ...state,
        { ...omit(action, 'type'), uid: action.uid || Date.now() }
      ];
    case RNS_HIDE_NOTIFICATION:
      return filter(state, notification => {
        return notification.uid !== action.uid;
      });
  }
  return state;
}
