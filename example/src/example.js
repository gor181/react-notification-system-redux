import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {configureStore} from './store';

import Container from './components/container';

const store = configureStore();

window.appStore = store; //In case you want to see what's inside by executing appStore in console;

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Container />
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
