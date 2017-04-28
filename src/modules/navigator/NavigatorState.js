import {fromJS} from 'immutable';
import {NavigationActions} from 'react-navigation';
import includes from 'lodash/includes';

import AppNavigator from './Navigator';

export default function NavigatorReducer(state, action) {
  // Initial state
  if (!state) {
    return fromJS(AppNavigator.router.getStateForAction(action, state));
  }

  let newState = state;
  // Is this a navigation action that we should act upon?
  if (includes(NavigationActions, action.type)) {
    newState = fromJS(AppNavigator.router.getStateForAction(action, state.toJS()));
  }

  if (!newState) {
    // TODO: fix this
    // for some reason close drawer action return null state
    // action = {type: "Navigation/Navigate", routeName: "v" }
    newState = state;
  }

  return newState;
}
