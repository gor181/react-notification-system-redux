'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Notifications;

var _const = require('./const');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Notifications() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _const.RNS_SHOW_NOTIFICATION:
      var type = action.type,
          rest = _objectWithoutProperties(action, ['type']);

      return [].concat(_toConsumableArray(state), [_extends({}, rest, { uid: action.uid })]);
    case _const.RNS_HIDE_NOTIFICATION:
      return state.filter(function (notification) {
        return notification.uid !== action.uid;
      });
    case _const.RNS_REMOVE_ALL_NOTIFICATIONS:
      return [];
  }
  return state;
}