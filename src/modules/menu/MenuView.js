import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  Dimensions,
  StyleSheet
} from 'react-native';

import SideBar from '../../components/SideBar';
import MenuItem from '../../components/MenuItem';

class MenuView extends Component {
  static displayName = 'MenuView';
  static propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired
        })).isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <SideBar
          style={styles.container}
          ref={(sideBar) => {
            this.sideBar = sideBar;
          }}
          isOpen={this.props.navigationState.menu.opened}
          onChange={(isOpen) => {
            if (this.sideBar && this.props.navigationState.menu.opened != isOpen){
              this.props.navigationStateActions.openMenu(isOpen)
            }
          }}
          menu={this.renderMenu}>
          <View style={{flex: 1, backgroundColor: "#E4E4E4"}}>
            {this.props.children}
          </View>
      </SideBar>
    );
  }

  renderMenu = () => {
    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id},
    );
    const {items} = this.props;
    return (
      <View style={styles.menuContentWrapper}>
        <View style={styles.menuContentHeader}>
          <Image style={styles.menuHeaderLogo}
            source={{uri: 'ic_menu_logo',}} />
        </View>
        <ListView
          dataSource={dataSource.cloneWithRows(items)}
          renderRow={this.renderMenuItem} />
      </View>
    );
  };

  handleMenuItem = (key) => {
    this.props.onItemPress(key);
    this.sideBar.openMenu(false);
  };

  renderMenuItem = (rowData) => {
    return (<MenuItem
      onPress={this.handleMenuItem}
      scene={rowData.key}
      title={rowData.title}
      icon={rowData.icon}
    />);
  };
}

const styles = StyleSheet.create(
  {
    container: {flex: 1},
    menuContentWrapper: {flexDirection: 'column', backgroundColor: 'white'},
    menuHeaderLogo: {
      width: 48,
      height: 48,
      marginLeft: 25,
      marginBottom: 25,
      resizeMode: 'contain',
    },
    menuContentHeader: {
      height: 138,
      backgroundColor: '#61B0DF',
      justifyContent: 'flex-end',
    },
  },
);
export default MenuView;
