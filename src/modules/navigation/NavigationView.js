import React, {PropTypes, Component} from 'react';
import {
  NavigationExperimental,
  Dimensions,
  View,
  StyleSheet
} from 'react-native';
import MenuViewContainer from '../menu/MenuViewContainer';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes,
  Transitioner: NavigationTransitioner,
} = NavigationExperimental;

import ParalaxToolbar, {NAVBAR_HEIGHT} from '../../components/ParalaxToolbar'
import SideBar from '../../components/SideBar';
import MenuItem from '../../components/MenuItem';

import AppRouter from '../AppRouter';

class NavigationView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    onNavigateBack: PropTypes.func.isRequired,
    navigationState: PropTypes.shape({
      menu: PropTypes.shape({
        routes: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })).isRequired
      }).isRequired,
      scenes: PropTypes.object.isRequired,
    }),
  };

  renderScene = (sceneProps) => {
    return (
      <View style={styles.container}>
        {AppRouter(sceneProps)}
      </View>
    );
  };

  render() {
    const {menu} = this.props.navigationState;
    const sceneKey = menu.routes[menu.index].key;
    const scene = this.props.navigationState.scenes[sceneKey];

    return (
      <MenuViewContainer
        items={this.props.navigationState.menu.routes}
        onItemPress={this.props.onSwitchScene}>
        <NavigationCardStack
            style={styles.container}
            key={'stack_' + sceneKey}
            onNavigateBack={this.props.onNavigateBack}
            navigationState={scene}
            renderScene={this.renderScene}
            />
      </MenuViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NavigationView;
