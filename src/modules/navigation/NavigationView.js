import React, {PropTypes, Component} from 'react';
import {
  NavigationExperimental,
  View,
  Text,
  Image,
  ListView,
  Dimensions,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';
const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes
} = NavigationExperimental;

import ParalaxToolbar from '../../components/ParalaxToolbar'
import SideBar from '../../components/SideBar';
import MenuItem from '../../components/MenuItem';

import AppRouter from '../AppRouter';

class NavigationView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    onNavigateBack: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      menuItems: PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })).isRequired
      }).isRequired,
      scenes: PropTypes.object.isRequired,
    }),
    switchScene: PropTypes.func.isRequired
  };

  renderScene = (sceneProps) => {
    // render scene and apply padding to cover
    // for app bar and navigation bar
    const showBackButton = this.props.showBackButton;
    const icon = showBackButton ?  'ic_action_back' : 'ic_action_navigate';
    const onPress = () => {
      showBackButton ? this.props.onNavigateBack() : this.sideBar.toggle();
    }

    return (
        <ParalaxToolbar
          navbarBackgroundColor='#56d399'
          style={styles.container}
          title={sceneProps.scene.route.title}
          profileImage={sceneProps.scene.route.profileImage}
          navbarBackgroundImage={sceneProps.scene.route.backgroundImage}
          leftIcon={{icon, onPress}} >
            {AppRouter(sceneProps)}
        </ParalaxToolbar>
    );
  };

  handleMenuItem = (key) => {
    this.props.switchScene(key);
    this.sideBar.openMenu(false);
  }

  renderMenuItem = (rowData) => {
    return (
      <MenuItem
        onPress={this.handleMenuItem}
        scene={rowData.key}
        title={rowData.title}
        icon={rowData.icon}
      />
    )
  }

  renderMenu = () => {
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
    });

    const {menuItems} = this.props.navigationState;
    return (
          <View style={styles.menuContentWrapper}>
            <View style={styles.menuContentHeader}/>
            <ListView
              dataSource={dataSource.cloneWithRows(menuItems.routes)}
              renderRow={this.renderMenuItem}/>
          </View>
        );
  };

  render() {
    const {menuItems} = this.props.navigationState;
    const sceneKey = menuItems.routes[menuItems.index].key;
    const scene = this.props.navigationState.scenes[sceneKey];

    return (
      <SideBar
        style={styles.container}
        menuWidth={Dimensions.get('window').width * 0.7}
        ref={(sideBar) => { this.sideBar = sideBar; }}
        menu={this.renderMenu}>
        <NavigationCardStack
          key={'stack_' + sceneKey}
          onNavigateBack={this.props.onNavigateBack}
          navigationState={scene}
          renderScene={this.renderScene}
          />
      </SideBar>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  menuContentWrapper: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  menuContentHeader: {
    height: 112,
    backgroundColor: '#56d399',
  },
});

export default NavigationView;
