import React, {PropTypes, Component} from 'react';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import StatusBar from 'StatusBar';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

import nativeImageSource from 'nativeImageSource';

const DRAWER_HEADER_HEIGHT_MULTIPLIESR = 3;
const DRAWER_WIDTH_PERCENTAGE = 0.8;

class CounterView extends Component {
  static displayName = 'CounterView';

  static propTypes = {
    counter: PropTypes.number.isRequired,
    userName: PropTypes.string,
    userProfilePhoto: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    counterStateActions: PropTypes.shape({
      increment: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired,
      random: PropTypes.func.isRequired
    }).isRequired,
    navigationStateActions: PropTypes.shape({
      pushRoute: PropTypes.func.isRequired
    }).isRequired
  };

  increment = () => {
    this.props.counterStateActions.increment();
  };

  reset = () => {
    this.props.counterStateActions.reset();
  };

  random = () => {
    this.props.counterStateActions.random();
  };

  bored = () => {
    this.props.navigationStateActions.pushRoute({
      key: 'Color',
      title: 'Color Screen'
    });
  };

  renderUserInfo = () => {
    if (!this.props.userName) {
      return null;
    }

    return (
      <View style={styles.userContainer}>
        <Image
          style={styles.userProfilePhoto}
          source={{
            uri: this.props.userProfilePhoto,
            width: 80,
            height: 80
          }}
          />
        <Text style={styles.linkButton}>
          Welcome, {this.props.userName}!
        </Text>
      </View>
    );
  };

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (

          <View style={{flex: 1, flexDirection: 'column', }}>

            <View style={styles.container}>
                {this.renderUserInfo()}

            <TouchableOpacity
              accessible={true}
              accessibilityLabel={'Increment counter'}
              onPress={this.increment}
              style={[styles.counterButton, loadingStyle]}>
              <Text style={styles.counter}>
                {this.props.counter}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counterButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  },
});

export default CounterView;
