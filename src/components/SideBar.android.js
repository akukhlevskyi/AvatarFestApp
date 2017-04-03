import React, {PropTypes, Component} from 'react';
 import {
   View,
   StatusBar,
   StyleSheet,
   DrawerLayoutAndroid,
 } from 'react-native';

 import BaseSideBar from  './BaseSideBar';

 class SideBar extends BaseSideBar {
   render() {
     return (
       <DrawerLayoutAndroid
         drawerPosition={SideBar.POSITION_RIGHT == this.props.menuPosition ? DrawerLayoutAndroid.positions.Right : DrawerLayoutAndroid.positions.Left}
         drawerWidth={this.props.menuWidth}
         keyboardDismissMode="on-drag"
         onDrawerOpen={() => {
           this.opened = true;
           if (!!this.props.onChange) this.props.onChange(this.opened);
         }}
         onDrawerClose={() => {
           this.opened = false;
           if (!!this.props.onChange) this.props.onChange(this.opened);
         }}
         ref={(drawer) => { this.drawer = drawer; }}
         renderNavigationView={this.props.menu}>
           <View style={styles.container}>
             {this.props.children}
           </View>
       </DrawerLayoutAndroid>
     );
   }

   isOpen = () => {
     return this.opened;
   }

   toggle = () => {
     if (!this.drawer) {
       return;
     }

     if (!this.opened) {
       this.drawer.openDrawer();
     } else {
       this.drawer.closeDrawer();
     }
   }

   openMenu = (isOpen) => {
     if (!this.drawer) {
       return;
     }

     if (!!isOpen) {
       this.drawer.openDrawer();
     } else {
       this.drawer.closeDrawer();
     }
   }
 }

 const styles = StyleSheet.create({
  container: {
          flex: 1,
 },
})

export default SideBar;
