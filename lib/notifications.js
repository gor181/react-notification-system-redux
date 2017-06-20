var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
        var systemNotifications = this.system().state.notifications || [];

        if (notifications.length > 0) {
          // Get all active notifications from react-notification-system
          /// and remove all where uid is not found in the reducer
          systemNotifications.forEach(function (notification) {
            if (notificationIds.indexOf(notification.uid) < 0) {
              _this2.system().removeNotification(notification.uid);
            }
          });

          notifications.forEach(function (notification) {
            _this2.system().addNotification(_extends({}, notification, {
              onRemove: function () {
                function onRemove() {
                  _this2.context.store.dispatch(actions.hide(notification.uid));
                  notification.onRemove && notification.onRemove();
                }

                return onRemove;
              }()
            }));
          });
        }

        if (this.props.notifications !== notifications && notifications.length === 0) {
          this.system().clearNotifications();
        }
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
        var _props = this.props,
            notifications = _props.notifications,
            rest = _objectWithoutProperties(_props, ['notifications']);

        return _react2['default'].createElement(_reactNotificationSystem2['default'], _extends({ ref: 'notify' }, rest));
      }

      return render;
    }()
  }]);

  return Notifications;
}(_react2['default'].Component);

Notifications.propTypes = {
  notifications: _propTypes2['default'].array
};

Notifications.contextTypes = {
  store: _propTypes2['default'].object
};

// Tie actions to Notifications component instance
Object.keys(actions).forEach(function (key) {
  Notifications[key] = actions[key];
});

Notifications.reducer = _reducer2['default'];

module.exports = Notifications;