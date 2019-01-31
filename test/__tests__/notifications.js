import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { jsdom } from 'jsdom';
import sinon from 'sinon';
import Component, {
	show,
	success,
	error,
	warning,
	info,
	hide,
	removeAll,
	reducer
} from '../../src/notifications';
import NotifySystem from 'react-notification-system';

const createDOM = () =>
	jsdom('<!doctype html><html><body><div></div></body></html>');

describe('NotificationsComponent', () => {
	let DOM;
	let store;

	const notification = {
		title: "Hey, it's good to see you!",
		message: 'Now you can see how easy it is to use notifications in React!',
		dismissible: false,
		level: 'info',
		uid: 'demo-uid',
		autoDismiss: 5
	};

	beforeEach(() => {
		const mockStore = configureStore();
		store = mockStore({
			notifications: []
		});

		DOM = createDOM();
	});

	const mountComponent = props =>
		mount(
			<Component
				context={React.createContext({ store })}
				notifications={[]}
				{...props}
			/>,
			{
				attachTo: DOM.body.firstChild,
				context: {
					store: {
						dispatch: () => {}
					}
				}
			}
		);

	it('exports all actions', () => {
		expect(show).to.be.a('function');
		expect(success).to.be.a('function');
		expect(error).to.be.a('function');
		expect(warning).to.be.a('function');
		expect(info).to.be.a('function');
		expect(hide).to.be.a('function');
		expect(removeAll).to.be.a('function');
	});

	it('exports the reducer', () => {
		expect(reducer).to.be.a('function');
	});

	it('should render one <NotifySystem /> component', () => {
		const wrapper = mountComponent();
		expect(wrapper.find(NotifySystem).length).to.equal(1);
	});

	it('should warn if prop:notifications is not array', () => {
		const c = sinon.stub(console, 'error');

		const wrapper = mountComponent({ notifications: 1 });
		const warning = c.args[0][0];

		c.restore();

		expect(warning).to.match(
			/Invalid prop `notifications` of type `number` supplied to `Notifications`, expected `array`./
		);
	});

	it('should render a single notification', () => {
		const wrapper = mountComponent();

		wrapper.setProps({
			notifications: [notification]
		});
		wrapper.update();

		expect(wrapper.html()).to.have.string(notification.title);
		expect(wrapper.html()).to.have.string(notification.message);
	});

	it('should not add notification if it already exists based on the uid', () => {
		const wrapper = mountComponent();

		wrapper.setProps({
			notifications: [
				{ ...notification, uid: 1, title: '1st' },
				{ ...notification, uid: 2, title: '2nd' },
				{ ...notification, uid: 3, title: '3rd' },
				{ ...notification, uid: 1, title: '4th' },
				{ ...notification, uid: 2, title: '5th' },
				{ ...notification, uid: 3, title: '6th' }
			]
		});
		wrapper.update();

		const html = wrapper.html();

		expect(html).to.have.string('1st');
		expect(html).to.have.string('2nd');
		expect(html).to.have.string('3rd');

		expect(html).not.to.have.string('4th');
		expect(html).not.to.have.string('5th');
		expect(html).not.to.have.string('6th');
	});

	it('calls onRemove once the notification is auto dismissed', done => {
		const wrapper = mountComponent();
		const onRemove = sinon.spy();

		wrapper.setProps({
			notifications: [
				{
					...notification,
					autoDismiss: 1,
					onRemove
				}
			]
		});
		wrapper.update();

		setTimeout(() => {
			expect(onRemove.called).to.be.true;
			done();
		}, 1100);
	});

	it('calls onRemove once the notification is manually dismissed', done => {
		const wrapper = mountComponent();
		const onRemove = sinon.spy();
		const onCallback = sinon.spy();

		wrapper.setProps({
			notifications: [
				{
					...notification,
					autoDismiss: 0,
					action: {
						label: 'Dismiss',
						callback: onCallback
					},
					onRemove
				}
			]
		});
		wrapper.update();

		wrapper.find('button').simulate('click');

		setTimeout(() => {
			expect(onCallback.called).to.be.true;
			expect(onRemove.called).to.be.true;
			done();
		}, 50);
	});

	it('calls onRemove once the notification is auto dismissed while style is false', done => {
		const wrapper = mountComponent({ style: false });
		const onRemove = sinon.spy();

		wrapper.setProps({
			notifications: [
				{
					...notification,
					autoDismiss: 1,
					onRemove
				}
			]
		});
		wrapper.update();

		setTimeout(() => {
			expect(onRemove.called).to.be.true;
			done();
		}, 1100);
	});

	it('calls onRemove once the notification is manually dismissed while style is false', done => {
		const wrapper = mountComponent({ style: false });
		const onRemove = sinon.spy();
		const onCallback = sinon.spy();

		wrapper.setProps({
			notifications: [
				{
					...notification,
					autoDismiss: 0,
					action: {
						label: 'Dismiss',
						callback: onCallback
					},
					onRemove
				}
			]
		});
		wrapper.update();

		wrapper.find('button').simulate('click');

		setTimeout(() => {
			expect(onCallback.called).to.be.true;
			expect(onRemove.called).to.be.true;
			done();
		}, 50);
	});
});
