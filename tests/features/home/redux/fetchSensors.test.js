import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_SENSORS_BEGIN,
  HOME_FETCH_SENSORS_SUCCESS,
  HOME_FETCH_SENSORS_FAILURE,
  HOME_FETCH_SENSORS_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchSensors,
  dismissFetchSensorsError,
  reducer,
} from 'src/features/home/redux/fetchSensors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchSensors', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchSensors succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchSensors())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_SENSORS_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_SENSORS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchSensors fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchSensors({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_SENSORS_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_SENSORS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchSensorsError', () => {
    const expectedAction = {
      type: HOME_FETCH_SENSORS_DISMISS_ERROR,
    };
    expect(dismissFetchSensorsError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_FETCH_SENSORS_BEGIN correctly', () => {
    const prevState = { fetchSensorsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_SENSORS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchSensorsPending).to.be.true;
  });

  it('handles action type HOME_FETCH_SENSORS_SUCCESS correctly', () => {
    const prevState = { fetchSensorsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_SENSORS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchSensorsPending).to.be.false;
  });

  it('handles action type HOME_FETCH_SENSORS_FAILURE correctly', () => {
    const prevState = { fetchSensorsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_SENSORS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchSensorsPending).to.be.false;
    expect(state.fetchSensorsError).to.exist;
  });

  it('handles action type HOME_FETCH_SENSORS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchSensorsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_SENSORS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchSensorsError).to.be.null;
  });
});
