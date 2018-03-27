import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_DEVICES_BEGIN,
  HOME_FETCH_DEVICES_SUCCESS,
  HOME_FETCH_DEVICES_FAILURE,
  HOME_FETCH_DEVICES_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchDevices,
  dismissFetchDevicesError,
  reducer,
} from 'src/features/home/redux/fetchDevices';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchDevices', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchDevices succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchDevices())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_DEVICES_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_DEVICES_SUCCESS);
      });
  });

  it('dispatches failure action when fetchDevices fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchDevices({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_DEVICES_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_DEVICES_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchDevicesError', () => {
    const expectedAction = {
      type: HOME_FETCH_DEVICES_DISMISS_ERROR,
    };
    expect(dismissFetchDevicesError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_FETCH_DEVICES_BEGIN correctly', () => {
    const prevState = { fetchDevicesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_DEVICES_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchDevicesPending).to.be.true;
  });

  it('handles action type HOME_FETCH_DEVICES_SUCCESS correctly', () => {
    const prevState = { fetchDevicesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_DEVICES_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchDevicesPending).to.be.false;
  });

  it('handles action type HOME_FETCH_DEVICES_FAILURE correctly', () => {
    const prevState = { fetchDevicesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_DEVICES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchDevicesPending).to.be.false;
    expect(state.fetchDevicesError).to.exist;
  });

  it('handles action type HOME_FETCH_DEVICES_DISMISS_ERROR correctly', () => {
    const prevState = { fetchDevicesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_DEVICES_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchDevicesError).to.be.null;
  });
});
