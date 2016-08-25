import React from 'react';
import { shallow } from 'enzyme';
import Component from '../notifications';
import NotifySystem from 'react-notification-system';

describe('NotificationsComponent', () => {
  it('should render one <NotifySystem /> component', () => {
    const wrapper = shallow(<Component />);
    expect(wrapper.children()).toBeDefined();
  });

  it('should warn if prop:notifications is not array', () => {
    spyOn(console, 'error');

    const wrapper = shallow(<Component notifications={1} />);
    const warning = console.error.calls.argsFor(0)[0];

    expect(warning).toMatch(/Invalid prop `notifications` of type `number` supplied to `Notifications`, expected `array`./);
  });
});
