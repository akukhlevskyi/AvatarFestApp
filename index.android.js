import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackAndroid} from 'react-native';
import * as NavigationStateActions from './src/modules/navigation/NavigationState';

class AvatarFest extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    const navigationState = store.getState().get('navigationState');
    const items = navigationState.get('menu');
    const sceneKey = items.getIn(['routes', items.get('index')]).get('key');
    const currentScene = navigationState.getIn(['scenes', sceneKey]);

    // if we are in the beginning of our tab stack
    if (currentScene.get('index') === 0) {
      // if we are not in the first tab, switch tab to the leftmost one
      if (items.get('index') !== 0) {
        store.dispatch(NavigationStateActions.switchScene(0));
        return true;
      }

      // otherwise let OS handle the back button action
      return false;
    }

    store.dispatch(NavigationStateActions.popRoute());
    return true;
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
