import React, {Component, PropTypes} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class SimpleContent extends Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <View style={styles.fill}>
        <Text style={styles.title}>{this.props.data.title}</Text>
        <Text style={styles.description}>{this.props.data.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  title: {
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

export default SimpleContent;
