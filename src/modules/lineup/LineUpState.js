/* @flow */
import {fromJS} from 'immutable';
import {NavigationExperimental} from 'react-native';
import {isNumber} from 'lodash';

const {StateUtils: NavigationStateUtils} = NavigationExperimental;

export const FETCH_LINEUP = 'LineUpState/FETCH_LINEUP';

export function updateLineUp() {
  // const lineup = require('../../../data/lineup')
  // const action = {
  //     type: FETCH_LINEUP,
  //     payload: lineup,
  //   };
  // return action;

  return fetch("https://api.myjson.com/bins/rge9z")
    .then((r) => r.json())
    .then((jsonRes) => ({
        type: FETCH_LINEUP,
        payload: jsonRes
      }));
}

// Initial state
const initialState = fromJS({
  items: [],
  isReady: false,
});

// Reducer
export default function LineUpStateReduces(state = initialState, action) {
  switch (action.type) {
    case FETCH_LINEUP:
      if (!action.payload) {
        return state.set('items', []).set('isReady', false);
      } else {
        return state.set('isReady', true).set('items', action.payload);
      }
    default:
      return state;
  }
}
