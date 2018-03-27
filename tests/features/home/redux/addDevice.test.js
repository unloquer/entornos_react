import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_ADD_DEVICE_BEGIN,
  HOME_ADD_DEVICE_SUCCESS,
  HOME_ADD_DEVICE_FAILURE,
  HOME_ADD_DEVICE_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  addDevice,
  dismissAddDeviceError,
  reducer,
} from 'src/features/home/redux/addDevice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/addDevice', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addDevice succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addDevice())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_ADD_DEVICE_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_ADD_DEVICE_SUCCESS);
      });
  });

  it('dispatches failure action when addDevice fails', () => {
    const store = mockStore({});

    return store.dispatch(addDevice({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_ADD_DEVICE_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_ADD_DEVICE_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissAddDeviceError', () => {
    const expectedAction = {
      type: HOME_ADD_DEVICE_DISMISS_ERROR,
    };
    expect(dismissAddDeviceError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_ADD_DEVICE_BEGIN correctly', () => {
    const prevState = { addDevicePending: false };
    const state = reducer(
      prevState,
      { type: HOME_ADD_DEVICE_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addDevicePending).to.be.true;
  });

  it('handles action type HOME_ADD_DEVICE_SUCCESS correctly', () => {
    const prevState = { addDevicePending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_DEVICE_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addDevicePending).to.be.false;
  });

  it('handles action type HOME_ADD_DEVICE_FAILURE correctly', () => {
    const prevState = { addDevicePending: true };
    const state = reducer(
      prevState,
      { type: HOME_ADD_DEVICE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addDevicePending).to.be.false;
    expect(state.addDeviceError).to.exist;
  });

  it('handles action type HOME_ADD_DEVICE_DISMISS_ERROR correctly', () => {
    const prevState = { addDeviceError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_ADD_DEVICE_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.addDeviceError).to.be.null;
  });
});
