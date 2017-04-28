import React, {PropTypes, Component} from 'react';
import {addNavigationHelpers} from 'react-navigation';

import AppNavigator from './Navigator';
import {
  View,
} from 'react-native';


class NavigatorView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired
      }))
    }).isRequired
  };

  constructor(props) {
    super(props);


  }


  render() {
    if (!this.props.navigatorState) {
      return (<View />)
    }

    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navigatorState
          })
        }
      />
    );
  }
}

export default NavigatorView;
