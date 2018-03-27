import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_REDUX_BEGIN,
  HOME_REDUX_SUCCESS,
  HOME_REDUX_FAILURE,
  HOME_REDUX_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  redux,
  dismissReduxError,
  reducer,
} from 'src/features/home/redux/redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/redux', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when redux succeeds', () => {
    const store = mockStore({});

    return store.dispatch(redux())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_REDUX_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_REDUX_SUCCESS);
      });
  });

  it('dispatches failure action when redux fails', () => {
    const store = mockStore({});

    return store.dispatch(redux({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_REDUX_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_REDUX_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissReduxError', () => {
    const expectedAction = {
      type: HOME_REDUX_DISMISS_ERROR,
    };
    expect(dismissReduxError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_REDUX_BEGIN correctly', () => {
    const prevState = { reduxPending: false };
    const state = reducer(
      prevState,
      { type: HOME_REDUX_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.reduxPending).to.be.true;
  });

  it('handles action type HOME_REDUX_SUCCESS correctly', () => {
    const prevState = { reduxPending: true };
    const state = reducer(
      prevState,
      { type: HOME_REDUX_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.reduxPending).to.be.false;
  });

  it('handles action type HOME_REDUX_FAILURE correctly', () => {
    const prevState = { reduxPending: true };
    const state = reducer(
      prevState,
      { type: HOME_REDUX_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.reduxPending).to.be.false;
    expect(state.reduxError).to.exist;
  });

  it('handles action type HOME_REDUX_DISMISS_ERROR correctly', () => {
    const prevState = { reduxError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_REDUX_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.reduxError).to.be.null;
  });
});
