# react-notification-system-redux

Wrapps [react-notification-system](https://github.com/igorprado/react-notification-system) into a component and exposes actions and reducer.  

Open for PR's and contributions!

## Demo & Examples

Live demo: [gor181.github.io/react-notification-system-redux](http://gor181.github.io/rreact-notification-system-redux/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation via NPM

```
npm install react-notification-system-redux react-notification-system --save
```

## Usage

Import the reducer and pass it to your store:

```
import {createStore, combineReducers} from 'redux';

import {reducer as notifications} from 'react-notification-system-redux';

export function configureStore(initialState = {}) {
  return createStore(
    combineReducers({
      notifications
    }),
    initialState
  );
}
```  

Include the Notifications component and pass the data from the reducer by using `connect`:

```
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import Notifications from 'react-notification-system-redux';

class DemoComponent extends React.Component {

	render() {
    const {notifications} = this.props;

		return (
      <Notifications notifications={notifications} />
		);
	}
}

DemoComponent.contextTypes = {
  store: PropTypes.object
};

DemoComponent.propTypes = {
  notifications: PropTypes.array
};

export default connect(
  state => ({ notifications: state.notifications })
)(DemoComponent);
```

Dispatch notification actions from any other component:

```
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

class OtherComponent extends React.Component {

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.context.store.dispatch(
      Notifications.success(notificationOpts)
    );
  }

	render() {
    const {notifications} = this.props;

		return (
	    <div>
        <button onClick={this.handleClick}>
          Spawn some notifications!!!
        </button>
      </div>
		);
	}
}

OtherComponent.contextTypes = {
  store: PropTypes.object
};

export default OtherComponent;
```

There is a working example in example/src/**

### Properties
It accepts all properties as react-notification-system does, actually it pipes them in the react-notification-system.

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## Thanks  

Jed Watson for making react-component yo builder!

## License

MIT Licensed  
Copyright (c) 2016 Goran Udosic && Headstart App.
