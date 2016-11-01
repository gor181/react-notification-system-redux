import React, {PropTypes} from 'react';

import * as actions from './actions';
import reducer from './reducer';

import NotifySystem from 'react-notification-system';

class Notifications extends React.Component {

  system() {
    return this.refs.notify;
  }

  componentWillReceiveProps(nextProps) {
    const notifications = nextProps.notifications.toJS();
    const notificationIds = notifications.map(notification => notification.uid);

    // Get all active notifications from react-notification-system
    /// and remove all where uid is not found in the reducer
    (this.system().state.notifications || []).forEach(notification => {
      if (notificationIds.indexOf(notification.uid) < 0) {
        this.system().removeNotification(notification.uid);
      }
    });

    notifications.forEach(notification => {
      this.system().addNotification({
        ...notification,
        onRemove: () => {
          this.context.store.dispatch(actions.hide(notification.uid));
          notification.onRemove && notification.onRemove();
        }
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const {notifications, ...rest} = this.props;

    return (
      <NotifySystem ref='notify' { ...rest } />
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.object
};

Notifications.contextTypes = {
  store: PropTypes.object
};

// Tie actions to Notifications component instance
Object.keys(actions).forEach(key => {
  Notifications[key] = actions[key];
});

Notifications.reducer = reducer;

module.exports = Notifications;
