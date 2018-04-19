import {RNS_SHOW_NOTIFICATION, RNS_HIDE_NOTIFICATION, RNS_REMOVE_ALL_NOTIFICATIONS, RNS_EDIT_NOTIFICATION} from './const';

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
    case RNS_REMOVE_ALL_NOTIFICATIONS:
      return [];
    case RNS_EDIT_NOTIFICATION:
      const { opts } = action;
      const {uid , ...parms} = opts;
      return state.map(notification => notification.uid !== uid ? notification :  Object.assign({}, notification, parms));
     default :
      return state;
  }
}
