import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import Notifications from 'react-notification-system-redux';

const notificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Hey, it\'s good to see you!',
  message: 'Now you can see how easy it is to use notifications in React!',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'Click me!!',
    callback: () => alert('clicked!')
  }
};

class Container extends React.Component {

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  dispatchNotification(fn, timeout) {
    setTimeout(() => {
      this.context.store.dispatch(fn(notificationOpts));
    }, timeout);
  }

  handleClick() {
    this.dispatchNotification(Notifications.success, 250);
    this.dispatchNotification(Notifications.error, 500);
    this.dispatchNotification(Notifications.warning, 750);
    this.dispatchNotification(Notifications.info, 1000);
  }

	render() {
    const {notifications} = this.props;

		return (
	    <div>
        <button onClick={this.handleClick}>Spawn some notifications!!!</button>

        <Notifications notifications={notifications} />
      </div>
		);
	}
}

Container.contextTypes = {
  store: PropTypes.object
};

Container.propTypes = {
  notifications: PropTypes.array
};

export default connect(
  state => ({ notifications: state.notifications })
)(Container);
