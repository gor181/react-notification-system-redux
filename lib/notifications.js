'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

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

  function Notifications(props) {
    _classCallCheck(this, Notifications);

    var _this = _possibleConstructorReturn(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).call(this, props));

    _this.notifyRef = _react2['default'].createRef();
    return _this;
  }

  _createClass(Notifications, [{
    key: 'system',
    value: function () {
      function system() {
        return this.notifyRef.current;
      }

      return system;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        var _this2 = this;

        var _props = this.props,
            notifications = _props.notifications,
            store = _props.store;

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
                  store.dispatch(actions.hide(notification.uid));
                  notification.onRemove && notification.onRemove();
                }

                return onRemove;
              }()
            }));
          });
        }

        if (prevProps.notifications !== notifications && notifications.length === 0) {
          this.system().clearNotifications();
        }
      }

      return componentDidUpdate;
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
        var _props2 = this.props,
            notifications = _props2.notifications,
            store = _props2.store,
            rest = _objectWithoutProperties(_props2, ['notifications', 'store']);

        return _react2['default'].createElement(_reactNotificationSystem2['default'], _extends({ ref: this.notifyRef }, rest));
      }

      return render;
    }()
  }]);

  return Notifications;
}(_react2['default'].Component);

Notifications.propTypes = {
  notifications: _propTypes2['default'].array,
  store: _propTypes2['default'].shape({
    dispatch: _propTypes2['default'].func.isRequired
  }).isRequired
};

var NotificationsWithContext = function NotificationsWithContext(props) {
  var Context = props.context || _reactRedux.ReactReduxContext;

  if (Context == null) {
    throw 'Please upgrade to react-redux v6';
  }

  return _react2['default'].createElement(
    Context.Consumer,
    null,
    function (otherProps) {
      var store = otherProps.store;

      return _react2['default'].createElement(Notifications, _extends({ store: store }, props));
    }
  );
};

NotificationsWithContext.propTypes = {
  context: _propTypes2['default'].object
};

// Tie actions to Notifications component instance
Object.keys(actions).forEach(function (key) {
  NotificationsWithContext[key] = actions[key];
});

NotificationsWithContext.reducer = _reducer2['default'];

module.exports = NotificationsWithContext;