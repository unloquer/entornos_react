import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_ADD_SENSOR_BEGIN,
  HOME_ADD_SENSOR_SUCCESS,
  HOME_ADD_SENSOR_FAILURE,
  HOME_ADD_SENSOR_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  addSensor,
  dismissAddSensorError,
  reducer,
} from 'src/features/home/redux/addSensor';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addSensor', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addSensor succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addSensor())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_ADD_SENSOR_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_ADD_SENSOR_SUCCESS);
      });
  });

  it('dispatches failure action when addSensor fails', () => {
    const store = mockStore({});

    return store.dispatch(addSensor({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_ADD_SENSOR_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_ADD_SENSOR_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissAddSensorError', () => {
    const expectedAction = {
      type: HOME_ADD_SENSOR_DISMISS_ERROR,
    };
    expect(dismissAddSensorError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_ADD_SENSOR_BEGIN correctly', () => {
    const prevState = { addSensorPending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_SENSOR_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addSensorPending).to.be.true;
  });

  it('handles action type HOME_ADD_SENSOR_SUCCESS correctly', () => {
    const prevState = { addSensorPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_SENSOR_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addSensorPending).to.be.false;
  });

  it('handles action type HOME_ADD_SENSOR_FAILURE correctly', () => {
    const prevState = { addSensorPending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_SENSOR_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addSensorPending).to.be.false;
    expect(state.addSensorError).to.exist;
  });

  it('handles action type HOME_ADD_SENSOR_DISMISS_ERROR correctly', () => {
    const prevState = { addSensorError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_SENSOR_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addSensorError).to.be.null;
  });
});
