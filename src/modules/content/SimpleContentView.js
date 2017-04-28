import React, {Component, PropTypes} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


import SharedView from '../../components/SharedView';
import ParalaxToolbar from '../../components/ParalaxToolbar';

class SimpleContentView extends Component {
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
    back: PropTypes.func.isRequired,
  };

  render() {
    const {params, routeName} = this.props.navigation.state;
    const icon = 'ic_action_back';
    const onPress = () => {
       this.props.back();
    }

    return (
      <ParalaxToolbar
        navbarBackgroundColor='#61B0DF'
        style={styles.container}
        title={params.title}
        profileImage={params.profileImage}
        navbarBackgroundImage={params.headerImage}
        headerHeight={240}
        routeName={routeName}
        leftIcon={{icon, onPress}} >
        <SharedView name={`content-${params.title}`} containerRouteName={routeName}>
        <View style={styles.fill}>
          <Text style={styles.title}>{params.title}</Text>
          <Text style={styles.description}>{params.description}</Text>
        </View>
      </SharedView>
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

export default SimpleContentView;
