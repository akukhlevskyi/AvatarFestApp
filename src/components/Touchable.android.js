import React, {PropTypes, Component} from 'react';
import {
  TouchableNativeFeedback,
} from 'react-native';

class Touchable extends Component {
  static displayName = 'Touchable';

  static propTypes = {
    onPress: PropTypes.func,
    children: React.PropTypes.element.isRequired
  };

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
        background={TouchableNativeFeedback.SelectableBackground()}>
        {this.props.children}
      </TouchableNativeFeedback>
    )
  }
}

export default Touchable;
