import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Dimensions,
  StyleSheet
} from 'react-native';

//import MapView from 'react-native-maps';

import ParalaxToolbar from '../../components/ParalaxToolbar';
import CicledVideo from '../../components/CicledVideo';

class AboutView extends Component {
  static displayName = 'AboutView';
  static propTypes = {
    navigate: PropTypes.func.isRequired,
  };

  render() {
    const icon = 'ic_action_navigate';
    const onPress = () => {
      // open drawer
      this.props.navigate({routeName: 'DrawerOpen'});
    }

    return (
        <ParalaxToolbar
          style={styles.container}
          title='About'
          routeName={this.props.navigation.state.routeName}
          navbarBackgroundImage='http://avatarfest.com.ua/wp-content/uploads/2014/09/home-1.jpg'
          headerHeight={240}
          headerRender={() => (<CicledVideo style={styles.container} source={require('../../../data/res/video.mp4')}/>)}
          leftIcon={{icon, onPress}} >

        </ParalaxToolbar>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AboutView;
