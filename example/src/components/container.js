import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import Notifications, { success, error, warning, info, removeAll, editNotification } from 'react-notification-system-redux';

const notificationOpts = {
  // uid: '123', // you can specify your own uid if required
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
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.editNotification = this.editNotification.bind(this);
  }

  dispatchNotification(fn, timeout) {
    setTimeout(() => {
      this.context.store.dispatch(fn(notificationOpts));
    }, timeout);
  }

  handleClick() {
    this.dispatchNotification(success, 250);
    this.dispatchNotification(error, 500);
    this.dispatchNotification(warning, 750);
    this.dispatchNotification(info, 1000);
  }

  handleRemoveAll() {
    this.context.store.dispatch(removeAll());
  }

  editNotification(){
    let notificationPayload = {
      uid : 'timer',
      title: 'Updates every second',
      message: `${new Date().getMinutes()}:${new Date().getSeconds()}`,
      position: 'tr',
      autoDismiss: 0,
      action: {
        label: 'Click me!!',
        callback: () => alert('clicked!')
      }
    };

    // show notificatiom first time
    this.context.store.dispatch(success(notificationPayload));

    // updates same uid notification after every sec.
    setInterval(() => {
      this.context.store.dispatch(editNotification(Object.assign({}, notificationPayload , {
        message: `${new Date().getMinutes()}:${new Date().getSeconds()}`
     })));
    }, 1000);
  }

	render() {
    const {notifications} = this.props;

		return (
	    <div>
        <button onClick={this.handleClick}>Spawn some notifications!!!</button>
        <button onClick={this.handleRemoveAll}>Remove all notifications</button>
        <br /> <br />
        <button onClick={this.editNotification}>Edit Notitfication (New)</button>
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
