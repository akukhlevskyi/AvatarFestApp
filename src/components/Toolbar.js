import React, {PropTypes, Component} from 'react';
import {
   Text,
   Image,
   Platform,
   StyleSheet,
   StatusBar,
   View,
} from 'react-native';
import Touchable from './Touchable';

const NAVBAR_HEIGHT = Platform.OS === 'android' ? 24 : 26;
const TOOLBAR_HEIGHT = 56;

class Toolbar extends Component {
  static displayName = 'Toolbar';

  static propTypes = {
    leftIcon: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onPress: React.PropTypes.func,
    }),
    rightIcon: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onPress: React.PropTypes.func,
    }),
    title: React.PropTypes.string,
  };

  renderIcon = (config) => {
    if (config === undefined) {
      return (<View style={styles.area} />);
    }

    let view = (<View style={styles.area}><Image
       style={styles.icon} source={{uri: config.icon}} /></View>);
    if (config.onPress !== undefined) {
      view = (<Touchable onPress={config.onPress}>{view}</Touchable>);
    }
    return view;
  }

  render() {
    return (
        <View style={styles.toolbar}>
          {Platform.OS === 'android' ? <StatusBar backgroundColor="#00000066" translucent={true}/> : undefined}
          {this.renderIcon(this.props.leftIcon)}
          <Text style={styles.title}>{this.props.title}</Text>
          {this.renderIcon(this.props.rightIcon)}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  toolbar: {
    position: 'absolute',
    left:0,
    top:0,
    right:0,
    zIndex: 100, // enusure topmost
    backgroundColor: '#00000000',
    marginTop: NAVBAR_HEIGHT,
    height: TOOLBAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  area: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: TOOLBAR_HEIGHT - 16,
    height: TOOLBAR_HEIGHT - 16,
  },
  icon: {
    width: TOOLBAR_HEIGHT/2,
    height: TOOLBAR_HEIGHT/2,
  },
  header: {
    flex: 1,
    fontSize: 18,
    justifyContent: Platform.OS === 'android' ? 'flex-start' : 'center',
  },
});

export default Toolbar;
