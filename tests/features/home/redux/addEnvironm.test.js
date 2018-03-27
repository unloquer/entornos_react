import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_ADD_ENVIRONM_BEGIN,
  HOME_ADD_ENVIRONM_SUCCESS,
  HOME_ADD_ENVIRONM_FAILURE,
  HOME_ADD_ENVIRONM_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  addEnvironm,
  dismissAddEnvironmError,
  reducer,
} from 'src/features/home/redux/addEnvironm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addEnvironm', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addEnvironm succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addEnvironm())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_ADD_ENVIRONM_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_ADD_ENVIRONM_SUCCESS);
      });
  });

  it('dispatches failure action when addEnvironm fails', () => {
    const store = mockStore({});

    return store.dispatch(addEnvironm({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_ADD_ENVIRONM_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_ADD_ENVIRONM_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissAddEnvironmError', () => {
    const expectedAction = {
      type: HOME_ADD_ENVIRONM_DISMISS_ERROR,
    };
    expect(dismissAddEnvironmError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_ADD_ENVIRONM_BEGIN correctly', () => {
    const prevState = { addEnvironmPending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_ENVIRONM_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addEnvironmPending).to.be.true;
  });

  it('handles action type HOME_ADD_ENVIRONM_SUCCESS correctly', () => {
    const prevState = { addEnvironmPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_ENVIRONM_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addEnvironmPending).to.be.false;
  });

  it('handles action type HOME_ADD_ENVIRONM_FAILURE correctly', () => {
    const prevState = { addEnvironmPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_ENVIRONM_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addEnvironmPending).to.be.false;
    expect(state.addEnvironmError).to.exist;
  });

  it('handles action type HOME_ADD_ENVIRONM_DISMISS_ERROR correctly', () => {
    const prevState = { addEnvironmError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_ENVIRONM_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addEnvironmError).to.be.null;
  });
});
