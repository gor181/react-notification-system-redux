import {RNS_SHOW_NOTIFICATION, RNS_HIDE_NOTIFICATION} from './const';

export default function Notifications(state = [], action = {}) {
  switch(action.type) {
    case RNS_SHOW_NOTIFICATION:
      const { type, ...rest } = action;
      return [
        ...state,
        { ...rest, uid: action.uid}
      ];
    case RNS_HIDE_NOTIFICATION:
      return state.filter(notification => {
        return notification.uid !== action.uid;
      });
  }
  return state;
}
