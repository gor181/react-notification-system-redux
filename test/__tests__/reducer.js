import { expect } from 'chai';

import Reducer from '../../src/reducer';
import * as Actions from '../../src/actions';

describe('reducer', () => {
  it('initializes state with an array', () => {
    expect(Reducer()).to.deep.equal([]);
  });

  it('stores the notification to state', () => {
    const action = Actions.success();
    const state = Reducer([], action);

    expect(state.length).to.equal(1);
  });

  it('stores and removes notification', () => {
    const uid = 1;

    const state = Reducer([], Actions.success({ uid }));
    expect(state.length).to.equal(1);

    const newState = Reducer(state, Actions.hide(uid));
    expect(newState.length).to.equal(0);
  });

  it('removes all notifications', () => {
    const state = Reducer([], Actions.success({ uid: 1 }));
    const newState = Reducer(state, Actions.success({ uid: 2 }));
    const emptyState = Reducer(newState, Actions.removeAll());

    expect(newState.length).to.equal(2);
    expect(emptyState.length).to.equal(0);
  });
});
