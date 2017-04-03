/* @flow */
import {fromJS} from 'immutable';
import {NavigationExperimental} from 'react-native';
import {isNumber} from 'lodash';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

export const FETCH_NEWS = 'NewsState/FETCH_NEWS';

export function updateNews() {
  return fetch("https://api.myjson.com/bins/lkl77")
    .then((r) => r.json())
    .then((jsonRes) => ({
        type: FETCH_NEWS,
        payload: jsonRes
      }));
}

// Initial state
const initialState = fromJS({
  items: [],
  isReady: false,
});

// Reducer
export default function NewsStateReduces(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEWS:
      if (action.payload === undefined || action.payload.length == 0) {
        return state.set('isReady', false).set('items', []);
      } else {
        return state.set('isReady', true).set('items', action.payload);
      }
    default:
      return state;
  }
}
