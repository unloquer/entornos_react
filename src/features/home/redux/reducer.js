// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.


import initialState from './initialState';
import { reducer as counterPlusOneReducer } from './counterPlusOne';
import { reducer as counterMinusOneReducer } from './counterMinusOne';
import { reducer as resetCounterReducer } from './resetCounter';
import { reducer as fetchRedditReactjsListReducer } from './fetchRedditReactjsList';
import { reducer as reduxReducer } from './redux';
import { reducer as fetchEnvironmsReducer } from './fetchEnvironms';
import { reducer as addEnvironmReducer } from './addEnvironm';
import { reducer as fetchDevicesReducer } from './fetchDevices';
import { reducer as addDeviceReducer } from './addDevice';
import { reducer as addSensorReducer } from './addSensor';
import { reducer as fetchSensorsReducer } from './fetchSensors';
import { reducer as setActiveEntornoReducer } from './setActiveEntorno';

const reducers = [
  counterPlusOneReducer,
  counterMinusOneReducer,
  resetCounterReducer,
  fetchRedditReactjsListReducer,
  reduxReducer,
  fetchEnvironmsReducer,
  addEnvironmReducer,
  fetchDevicesReducer,
  addDeviceReducer,
  addSensorReducer,
  fetchSensorsReducer,
  setActiveEntornoReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Put global reducers here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
