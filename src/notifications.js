import React from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';

import * as actions from './actions';
import reducer from './reducer';

import NotifySystem from 'react-notification-system';

class Notifications extends React.Component {

  constructor (props) {
    super(props);

    this.notifyRef = React.createRef();
  }

  system() {
    return this.notifyRef.current;
  }

  componentDidUpdate(prevProps) {
    const {notifications, store} = this.props;
    const notificationIds = notifications.map(notification => notification.uid);
    const systemNotifications = this.system().state.notifications || [];

    if (notifications.length > 0) {
      // Get all active notifications from react-notification-system
      /// and remove all where uid is not found in the reducer
      (systemNotifications).forEach(notification => {
        if (notificationIds.indexOf(notification.uid) < 0) {
          this.system().removeNotification(notification.uid);
        }
      });

      notifications.forEach(notification => {
        this.system().addNotification({
          ...notification,
          onRemove: () => {
            store.dispatch(actions.hide(notification.uid));
            notification.onRemove && notification.onRemove();
          }
        });
      });
    }

    if ((prevProps.notifications !== notifications) && notifications.length === 0) {
      this.system().clearNotifications();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const {notifications, store, ...rest} = this.props;

    return (
      <NotifySystem ref={this.notifyRef} { ...rest } />
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired
  }).isRequired
};

const NotificationsWithContext = props => {
  const Context = props.context || ReactReduxContext;

  if (Context == null) {
    throw 'Please upgrade to react-redux v6';
  }

  return (
    <Context.Consumer>
      {(otherProps) => {
        const { store } = otherProps;
        return <Notifications store={store} {...props} />;
      }}
    </Context.Consumer>
  );
};

NotificationsWithContext.propTypes = {
  context: PropTypes.object,
};

// Tie actions to Notifications component instance
Object.keys(actions).forEach(key => {
  NotificationsWithContext[key] = actions[key];
});

NotificationsWithContext.reducer = reducer;

module.exports = NotificationsWithContext;
