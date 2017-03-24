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

import Toolbar from '../../components/Toolbar';
import SideBar from '../../components/SideBar';
import MenuItem from '../../components/MenuItem';

import nativeImageSource from 'nativeImageSource';

import AppRouter from '../AppRouter';

// Customize bottom tab bar height here if desired
const TAB_BAR_HEIGHT = 50;
// const DRAWER_ICON = nativeImageSource({
//         android: 'navicon',
//         width: 48,
//         height: 48
// });

class NavigationView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    onNavigateBack: PropTypes.func.isRequired,
    onNavigateCompleted: PropTypes.func,
    navigationState: PropTypes.shape({
      tabs: PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })).isRequired
      }).isRequired,
      NewsScene: NavigationPropTypes.navigationState.isRequired,
      LineUpScene: NavigationPropTypes.navigationState.isRequired
    }),
    switchTab: PropTypes.func.isRequired,
    pushRoute: PropTypes.func.isRequired
  };

  // NavigationHeader accepts a prop style
  // NavigationHeader.title accepts a prop textStyle
  renderHeader = (sceneProps) => {
    return (<Toolbar
                  sceneProps={sceneProps}
                  style={styles.toolbar}
                  navIcon={{uri: "navicon"}}
                  onIconClicked={() => this.sideBar.openMenu(true)}
                  title={sceneProps.scene.route.title}
                  titleColor="white"
                />
    );
  };

  renderScene = (sceneProps) => {
    // render scene and apply padding to cover
    // for app bar and navigation bar
    return (
      <View style={styles.container}>
        {AppRouter(sceneProps)}
      </View>
    );
  };

  handleMenuItem = (key) => {
    this.props.switchTab(key);
    this.sideBar.openMenu(false);
  }

  renderMenuItem = (rowData) => {
    return (
      <MenuItem
        switchScene={this.handleMenuItem}
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

    const scenes = this.props.navigationState.tabs;
    return (
          <View style={styles.menuContentWrapper}>
            <View style={styles.menuContentHeader}/>
            <ListView
              dataSource={dataSource.cloneWithRows(scenes.routes)}
              renderRow={this.renderMenuItem}/>
          </View>
        );
  };

  render() {
    const {tabs} = this.props.navigationState;
    const tabKey = tabs.routes[tabs.index].key;
    const scenes = this.props.navigationState[tabKey];

    
    return (
      <SideBar
        style={styles.container}
        menuWidth={Dimensions.get('window').width * 0.7}
        ref={(sideBar) => { this.sideBar = sideBar; }}
        menu={this.renderMenu}>
        <NavigationCardStack
          key={'stack_' + tabKey}
          onNavigateBack={this.props.onNavigateBack}
          navigationState={scenes}
          renderHeader={this.renderHeader}
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
  menuContentWrapper: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  menuContentHeader: {
    height: 112,
    backgroundColor: '#56d399',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#56d399',
  }
});

export default NavigationView;
