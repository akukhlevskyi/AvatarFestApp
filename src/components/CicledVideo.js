import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Video from 'react-native-video';

class CicledVideo extends Component {
  static displayName = "CicledVideo";

  static propTypes = {
    source: PropTypes.any.isRequired,
  };

  render() {
    return (
      <Video source={this.props.source}
                  muted={true}
                  paused={false}
                  repeate={true}
                  resizeMode='stretch'
                  style={[styles.content, this.props.style]}
                />
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default CicledVideo;
