import React from 'react';
import PropTypes from 'prop-types';

import * as actions from './actions';
import reducer from './reducer';

import NotifySystem from 'react-notification-system';

class Notifications extends React.Component {

  constructor(props){
    super(props);
    this.notifications = []; //variable to keep refernce to all notifications, needs in case of update notification
    this.editNotifications = this.editNotifications.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  system() {
    return this.refs.notify;
  }

  editNotifications(notifications){
    notifications.map((notification, index) => {
      this.system().editNotification(this.notifications[index] , {
        ...notification,
        onRemove: () => {
          this.context.store.dispatch(actions.hide(notification.uid));
          notification.onRemove && notification.onRemove();
        }
      });
    });
  }

  addNotification(notifications){
    this.notifications = notifications.map(notification => {
      return this.system().addNotification({
        ...notification,
        onRemove: () => {
          this.context.store.dispatch(actions.hide(notification.uid));
          notification.onRemove && notification.onRemove();
        }
      });
    });
  }

  removeNotification(){
    this.system().clearNotifications();
    this.notifications = [];
  }

  componentWillReceiveProps(nextProps) {
    const {notifications} = nextProps;
    const notificationIds = notifications.map(notification => notification.uid);
    const systemNotifications = this.system().state.notifications || [];
    
    if(this.props.notifications.length === nextProps.notifications.length){
      this.editNotifications( notifications);
    }
    else{
      if (notifications.length > 0) {
        // Get all active notifications from react-notification-system
        /// and remove all where uid is not found in the reducer
        (systemNotifications).forEach(notification => {
          if (notificationIds.indexOf(notification.uid) < 0) {
            this.system().removeNotification(notification.uid);
          }
        });

        this.addNotification(notifications);
      }
    }

    if ((this.props.notifications !== notifications) && notifications.length === 0) {
        this.removeNotification();
    }
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
  notifications: PropTypes.array
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
// export default Notifications;
