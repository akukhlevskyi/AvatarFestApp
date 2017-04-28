import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackAndroid} from 'react-native';
import {NavigationActions} from 'react-navigation';

class AvatarFest extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    let state = store.getState().get('navigatorState');

    let bispatchBack = false;
    do {
      const index = state.get('index');
      if ( typeof index === 'number' && index !== 0){
        bispatchBack = true;
        break;
      }

      state = state.getIn(['routes', index]);
    } while (state);

    if (bispatchBack) {
      store.dispatch(NavigationActions.back());
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AvatarFest', () => AvatarFest);
