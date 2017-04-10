import React, {Component, PropTypes} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ParalaxToolbar from '../../components/ParalaxToolbar';

class SimpleContent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    profileImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    headerImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  render() {
    const icon = 'ic_action_back';
    const onPress = () => {
       this.props.onNavigateBack();
    }

    return (
      <ParalaxToolbar
        navbarBackgroundColor='#61B0DF'
        style={styles.container}
        title={this.props.title}
        profileImage={this.props.profileImage}
        navbarBackgroundImage={this.props.headerImage}
        headerHeight={240}
        leftIcon={{icon, onPress}} >
        <View style={styles.fill}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      </ParalaxToolbar>
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
