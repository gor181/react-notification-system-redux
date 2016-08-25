import Reducer from '../reducer';
import * as Actions from '../actions';

describe('reducer', () => {
  it('initializes state with an array', () => {
    expect(Reducer()).toEqual([]);
  });

  it('stores the notification to state', () => {
    const action = Actions.success();
    const state = Reducer([], action);

    expect(state.length).toEqual(1);
  });

  it('stores and removes notification', () => {
    const uid = 1;

    const state = Reducer([], Actions.success({ uid }));
    expect(state.length).toEqual(1);

    const newState = Reducer(state, Actions.hide(uid));
    expect(newState.length).toEqual(0);
  });
});
