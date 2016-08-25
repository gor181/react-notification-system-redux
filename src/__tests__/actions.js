import * as Actions from '../actions';

describe('actions', () => {
  it('sets the correct notification level', () => {
    expect(Actions.success().level).toBe('success');
    expect(Actions.warning().level).toBe('warning');
    expect(Actions.info().level).toBe('info');
    expect(Actions.error().level).toBe('error');
  });

  it('accepts custom opts', () => {
    expect(Actions.success({ custom: true }).custom).toBeTruthy();
  });

  it('generates random uid when not provided', () => {
    expect(Actions.success().uid).toBeDefined();
  });

  if('sets the custom uid when provided', () => {
    expect(Actions.success({ uid: 1 }).uid).toBe(1);
  });
});
