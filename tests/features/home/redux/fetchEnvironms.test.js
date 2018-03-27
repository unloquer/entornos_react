import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_ENVIRONMS_BEGIN,
  HOME_FETCH_ENVIRONMS_SUCCESS,
  HOME_FETCH_ENVIRONMS_FAILURE,
  HOME_FETCH_ENVIRONMS_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchEnvironms,
  dismissFetchEnvironmsError,
  reducer,
} from 'src/features/home/redux/fetchEnvironms';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchEnvironms', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchEnvironms succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchEnvironms())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_ENVIRONMS_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_ENVIRONMS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchEnvironms fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchEnvironms({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_ENVIRONMS_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_ENVIRONMS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchEnvironmsError', () => {
    const expectedAction = {
      type: HOME_FETCH_ENVIRONMS_DISMISS_ERROR,
    };
    expect(dismissFetchEnvironmsError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_FETCH_ENVIRONMS_BEGIN correctly', () => {
    const prevState = { fetchEnvironmsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ENVIRONMS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchEnvironmsPending).to.be.true;
  });

  it('handles action type HOME_FETCH_ENVIRONMS_SUCCESS correctly', () => {
    const prevState = { fetchEnvironmsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ENVIRONMS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchEnvironmsPending).to.be.false;
  });

  it('handles action type HOME_FETCH_ENVIRONMS_FAILURE correctly', () => {
    const prevState = { fetchEnvironmsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ENVIRONMS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchEnvironmsPending).to.be.false;
    expect(state.fetchEnvironmsError).to.exist;
  });

  it('handles action type HOME_FETCH_ENVIRONMS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchEnvironmsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_ENVIRONMS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchEnvironmsError).to.be.null;
  });
});
