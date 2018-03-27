
//import * as actions from './redux/actions';
import {fetchSensors} from './fetchSensors'
import axios from 'axios'
import {
  HOME_ADD_SENSOR_BEGIN,
  HOME_ADD_SENSOR_SUCCESS,
  HOME_ADD_SENSOR_FAILURE,
  HOME_ADD_SENSOR_DISMISS_ERROR,
  API_URL
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function addSensor(environId, data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_ADD_SENSOR_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const url = `/environs/${environId}/sensors`
      console.log('data', environId)
      axios.post(API_URL + url, data)

      .then(
        (res) => {
          dispatch({
            type: HOME_ADD_SENSOR_SUCCESS,
            data: res.data,
          });
          dispatch(fetchSensors(environId))

          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_ADD_SENSOR_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAddSensorError() {
  return {
    type: HOME_ADD_SENSOR_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_ADD_SENSOR_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addSensorPending: true,
        addSensorError: null,
      };

    case HOME_ADD_SENSOR_SUCCESS:
      // The request is success

      return {
        ...state,
        addSensorPending: false,
        addSensorError: null,

      };

    case HOME_ADD_SENSOR_FAILURE:
      // The request is failed
      return {
        ...state,
        addSensorPending: false,
        addSensorError: action.data.error,
      };

    case HOME_ADD_SENSOR_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addSensorError: null,
      };

    default:
      return state;
  }
}
