import { List, toJS } from 'immutable'
import Reducer from '../reducer';
import * as Actions from '../actions';

describe('reducer', () => {
  it('initializes state with an array', () => {
    expect(Reducer().toJS()).toEqual([]);
  });

  it('stores the notification to state', () => {
    const action = Actions.success();
    const state = Reducer(List([]), action);

    expect(state.size).toEqual(1);
  });

  it('stores and removes notification', () => {
    const uid = 1;

    const state = Reducer(List([]), Actions.success({ uid }));
    expect(state.size).toEqual(1);

    const newState = Reducer(state, Actions.hide(uid));
    expect(newState.size).toEqual(0);
  });
});
