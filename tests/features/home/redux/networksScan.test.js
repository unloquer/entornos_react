import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_NETWORKS_SCAN_BEGIN,
  HOME_NETWORKS_SCAN_SUCCESS,
  HOME_NETWORKS_SCAN_FAILURE,
  HOME_NETWORKS_SCAN_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  networksScan,
  dismissNetworksScanError,
  reducer,
} from 'src/features/home/redux/networksScan';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/networksScan', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when networksScan succeeds', () => {
    const store = mockStore({});

    return store.dispatch(networksScan())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_NETWORKS_SCAN_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_NETWORKS_SCAN_SUCCESS);
      });
  });

  it('dispatches failure action when networksScan fails', () => {
    const store = mockStore({});

    return store.dispatch(networksScan({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_NETWORKS_SCAN_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_NETWORKS_SCAN_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissNetworksScanError', () => {
    const expectedAction = {
      type: HOME_NETWORKS_SCAN_DISMISS_ERROR,
    };
    expect(dismissNetworksScanError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_NETWORKS_SCAN_BEGIN correctly', () => {
    const prevState = { networksScanPending: false };
    const state = reducer(
      prevState,
      { type: HOME_NETWORKS_SCAN_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.networksScanPending).to.be.true;
  });

  it('handles action type HOME_NETWORKS_SCAN_SUCCESS correctly', () => {
    const prevState = { networksScanPending: true };
    const state = reducer(
      prevState,
      { type: HOME_NETWORKS_SCAN_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.networksScanPending).to.be.false;
  });

  it('handles action type HOME_NETWORKS_SCAN_FAILURE correctly', () => {
    const prevState = { networksScanPending: true };
    const state = reducer(
      prevState,
      { type: HOME_NETWORKS_SCAN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.networksScanPending).to.be.false;
    expect(state.networksScanError).to.exist;
  });

  it('handles action type HOME_NETWORKS_SCAN_DISMISS_ERROR correctly', () => {
    const prevState = { networksScanError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_NETWORKS_SCAN_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.networksScanError).to.be.null;
  });
});
