// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_SET_ACTIVE_ENTORNO,
} from './constants';

export function setActiveEntorno(id) {
  return {
    type: HOME_SET_ACTIVE_ENTORNO,
    entornoId: id
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SET_ACTIVE_ENTORNO:
      return {
        ...state,
        activeEntornoId: action.entornoId
      };

    default:
      return state;
  }
}
