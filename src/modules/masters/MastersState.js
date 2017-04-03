/* @flow */
import {fromJS} from 'immutable';
import {NavigationExperimental} from 'react-native';
import {isNumber} from 'lodash';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

export const FETCH_MASTERS = 'MasterState/FETCH_MASTERS';

export function updateMasters() {
  return fetch("https://api.myjson.com/bins/155x3j")
    .then((r) => r.json())
    .then((jsonRes) => ({
        type: FETCH_MASTERS,
        payload: jsonRes
      }));
}

// export function ttt() {
//   return (dispatch, getState) => {
//
//   }
//     .then((r) => r.json())
//     .then((jsonRes) => ({
//         type: FETCH_MASTERS,
//         payload: state
//       }));
// }

// Initial state
const initialState = fromJS({
  items: [],
  isReady: false,
});

// Reducer
export default function MastersStateReduces(state = initialState, action) {
  switch (action.type) {
    case FETCH_MASTERS:
      if (action.payload === undefined || action.payload.length == 0) {
        return state.set('isReady', false).set('items', []);
      } else {
        return state.set('isReady', true).set('items', action.payload);
      }
    default:
      return state;
  }
}
