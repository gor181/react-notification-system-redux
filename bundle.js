require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var level = arguments.length <= 1 || arguments[1] === undefined ? 'success' : arguments[1];

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

},{"./const":2}],2:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
var RNS_SHOW_NOTIFICATION = exports.RNS_SHOW_NOTIFICATION = 'RNS_SHOW_NOTIFICATION';
var RNS_HIDE_NOTIFICATION = exports.RNS_HIDE_NOTIFICATION = 'RNS_HIDE_NOTIFICATION';

},{}],3:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Notifications;

var _const = require('./const');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Notifications() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  switch (action.type) {
    case _const.RNS_SHOW_NOTIFICATION:
      var type = action.type;

      var rest = _objectWithoutProperties(action, ['type']);

      return [].concat(_toConsumableArray(state), [_extends({}, rest, { uid: action.uid })]);
    case _const.RNS_HIDE_NOTIFICATION:
      return state.filter(function (notification) {
        return notification.uid !== action.uid;
      });
  }
  return state;
}

},{"./const":2}],"react-notification-system-redux":[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reactNotificationSystem = require('react-notification-system');

var _reactNotificationSystem2 = _interopRequireDefault(_reactNotificationSystem);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notifications = function (_React$Component) {
  _inherits(Notifications, _React$Component);

  function Notifications() {
    _classCallCheck(this, Notifications);

    return _possibleConstructorReturn(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).apply(this, arguments));
  }

  _createClass(Notifications, [{
    key: 'system',
    value: function () {
      function system() {
        return this.refs.notify;
      }

      return system;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var notifications = nextProps.notifications;

        var notificationIds = notifications.map(function (notification) {
          return notification.uid;
        });

        // Get all active notifications from react-notification-system
        /// and remove all where uid is not found in the reducer
        (this.system().state.notifications || []).forEach(function (notification) {
          if (notificationIds.indexOf(notification.uid) < 0) {
            _this2.system().removeNotification(notification.uid);
          }
        });

        notifications.forEach(function (notification) {
          _this2.system().addNotification(_extends({}, notification, {
            onRemove: function () {
              function onRemove() {
                _this2.context.store.dispatch(actions.hide(notification.uid));
              }

              return onRemove;
            }()
          }));
        });
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'shouldComponentUpdate',
    value: function () {
      function shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props = this.props;
        var notifications = _props.notifications;

        var rest = _objectWithoutProperties(_props, ['notifications']);

        return _react2['default'].createElement(_reactNotificationSystem2['default'], _extends({ ref: 'notify' }, rest));
      }

      return render;
    }()
  }]);

  return Notifications;
}(_react2['default'].Component);

Notifications.propTypes = {
  notifications: _react.PropTypes.array
};

Notifications.contextTypes = {
  store: _react.PropTypes.object
};

// Tie actions to Notifications component instance
Object.keys(actions).forEach(function (key) {
  Notifications[key] = actions[key];
});

Notifications.reducer = _reducer2['default'];

exports['default'] = Notifications;

},{"./actions":1,"./reducer":3,"react":undefined,"react-notification-system":undefined}]},{},[]);
