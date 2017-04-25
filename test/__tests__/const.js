import { expect } from 'chai';
import * as Constants from '../../src/const';

describe('constants', () => {
  it('should be defined', () => {
    expect(Constants.RNS_SHOW_NOTIFICATION).to.be.defined;
    expect(Constants.RNS_HIDE_NOTIFICATION).to.be.defined;
    expect(Constants.RNS_REMOVE_ALL_NOTIFICATIONS).to.be.defined;
  });
});
