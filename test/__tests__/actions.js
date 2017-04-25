import { expect } from 'chai';
import * as Actions from '../../src/actions';

describe('actions', () => {
  it('sets the correct notification level', () => {
    expect(Actions.success().level).to.equal('success');
    expect(Actions.warning().level).to.equal('warning');
    expect(Actions.info().level).to.equal('info');
    expect(Actions.error().level).to.equal('error');
  });

  it('accepts custom opts', () => {
    expect(Actions.success({ custom: true }).custom).to.be.ok;
  });

  it('generates random uid when not provided', () => {
    expect(Actions.success().uid).to.be.defined;
  });

  it('sets the custom uid when provided', () => {
    expect(Actions.success({ uid: 1 }).uid).to.equal(1);
  });
});
