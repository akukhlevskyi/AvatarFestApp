import React, {Component} from 'react';
import BaseSideBar from  './BaseSideBar';
import SideMenu from  'react-native-side-menu';

import {
  View,
  StyleSheet
} from 'react-native';

class SideBar extends BaseSideBar {

  render() {
    const menu = this.props.menu();

    return (
      <SideMenu
        menuPosition={this.props.menuPosition}
        openMenuOffset={this.props.menuWidth}
        onChange={this.props.onChange}
        ref={(sideMenu) => { this.sideMenu = sideMenu; }}
        menu={menu}>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </SideMenu>
    );
  }
  openMenu = (isOpen) => {
    if (!this.sideMenu) {
      return;
    }

    this.sideMenu.openMenu(isOpen);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default SideBar;
