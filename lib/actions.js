'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.show = show;
exports.success = success;
exports.error = error;
exports.warning = warning;
exports.info = info;
exports.hide = hide;
exports.removeAll = removeAll;

var _const = require('./const');

//Example opts
// {
//   title: 'Hey, it\'s good to see you!',
//   message: 'Now you can see how easy it is to use notifications in React!',
//   position: 'tr',
//   autoDismiss: 0,
//   action: {
//     label: 'Awesome!',
//     callback: function() {
//       console.log('Clicked');
//     }
//   }
// }

function show() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';

  return _extends({
    type: _const.RNS_SHOW_NOTIFICATION
  }, opts, {
    uid: opts.uid || Date.now(),
    level: level
  });
}

function success(opts) {
  return show(opts, 'success');
}

function error(opts) {
  return show(opts, 'error');
}

function warning(opts) {
  return show(opts, 'warning');
}

function info(opts) {
  return show(opts, 'info');
}

function hide(uid) {
  return {
    type: _const.RNS_HIDE_NOTIFICATION,
    uid: uid
  };
}

function removeAll() {
  return { type: _const.RNS_REMOVE_ALL_NOTIFICATIONS };
}