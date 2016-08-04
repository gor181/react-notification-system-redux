import {each, extend} from 'lodash';
import React, {PropTypes} from 'react';

import * as actions from './actions';
import reducer from './reducer';

import NotifySystem from 'react-notification-system';

class Notifications extends React.Component {

  system() {
    return this.refs.notify;
  }

  componentWillReceiveProps(nextProps) {
    const {notifications} = nextProps;

    each(notifications, notification => {
      this.system().addNotification({
        ...notification,
        onRemove: () => {
          this.context.store.dispatch(actions.hide(notification.uid));
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
  notifications: PropTypes.array
};

Notifications.contextTypes = {
  store: PropTypes.object
};

export default extend(
  Notifications,
  actions,
  {reducer}
);
