'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Notifications;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _lodash = require('lodash');

var _const = require('./const');

function Notifications(state, action) {
  if (state === undefined) state = [];

  switch (action.type) {
    case _const.RNS_SHOW_NOTIFICATION:
      return [].concat(_toConsumableArray(state), [_extends({}, (0, _lodash.omit)(action, 'type'), { uid: action.uid })]);
    case _const.RNS_HIDE_NOTIFICATION:
      return (0, _lodash.filter)(state, function (notification) {
        return notification.uid !== action.uid;
      });
  }
  return state;
}

module.exports = exports['default'];