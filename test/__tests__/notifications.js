import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Component from '../../src/notifications';
import NotifySystem from 'react-notification-system';

describe('NotificationsComponent', () => {
  it('should render one <NotifySystem /> component', () => {
    const wrapper = shallow(<Component />);
    expect(wrapper.children()).to.exist;
  });

  it('should warn if prop:notifications is not array', () => {
    const c = sinon.stub(console, 'error');

    const wrapper = shallow(<Component notifications={1} />);
    const warning = c.args[0][0];

    expect(warning).to.match(/Invalid prop `notifications` of type `number` supplied to `Notifications`, expected `array`./);

    c.restore();
  });
});
