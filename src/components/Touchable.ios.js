import React, {PropTypes, Component} from 'react';
import {
  TouchableHighlight,
} from 'react-native';

class Touchable extends Component {
  static displayName = 'Touchable';

  static propTypes = {
    onPress: PropTypes.func,
    children: React.PropTypes.element.isRequired
  };

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor="#00000011">
        {this.props.children}
      </TouchableHighlight>
    )
  }
}

export default Touchable;
