import React, {PropTypes, Component} from 'react';
import {
  View,
  ToolbarAndroid,
  Image,
  StatusBar,
  StyleSheet
} from 'react-native';

class Toolbar extends Component {
  static displayName = 'Toolbar';

  static propTypes = {
    navIcon: React.PropTypes.object,
    onIconClicked: React.PropTypes.func,
    title: React.PropTypes.string,
  };

  render() {
    return (
      // <View>
      //   <StatusBar translucent={true}/>
        <ToolbarAndroid
          style={this.props.style}
          navIcon={this.props.navIcon}
          onIconClicked={this.props.onIconClicked}
          title={this.props.title}
          titleColor="white">
          <StatusBar backgroundColor='#48af7f' />
        </ToolbarAndroid>
      // </View>
    )
  }
}

export default Toolbar;
