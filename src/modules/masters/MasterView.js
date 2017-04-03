import React from 'react';

import {
  Animated,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const PROFILE_WIDTH = 90;
const PROFILE_RADIUS = PROFILE_WIDTH / 2;
const HEADER_HEIGHT = 200 + (Platform.OS === 'android' ? 24 : 26);
const NAVBAR_HEIGHT = 56 + (Platform.OS === 'android' ? 24 : 26);

class MasterView extends React.Component {

  state = {
    scrollY: new Animated.Value(0),
  };

  _blockJS = () => {
    const start = Date.now();
    setTimeout(() => {
      while (Date.now() - start < 5000) {}
    }, 1);
  }

  _renderContent() {
    return <Text style={styles.description}>{this.props.data.description}</Text>;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.name}>{this.props.data.name}</Text>
        <Text style={styles.description}>{this.props.data.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  name: {
    backgroundColor: 'transparent',
    marginTop: 60,
    marginBottom: 16,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    backgroundColor: 'transparent',
    margin: 16,
    textAlign: 'justify',
    fontWeight: 'normal',
  },
});

export default MasterView;
