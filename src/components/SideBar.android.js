import React, {PropTypes, Component} from 'react';
 import {
   View,
   StatusBar,
   StyleSheet,
   DrawerLayoutAndroid,
 } from 'react-native';

 import BaseSideBar from  './BaseSideBar';

 class SideBar extends BaseSideBar {

   constructor(props) {
     super(props);
     this.state = {opened: props.isOpen};
   }

   componentWillReceiveProps(props) {
    if (this.isOpen() !== props.isOpen) {
       this.openMenu(props.isOpen);
    }
   }

   render() {
     return (
       <DrawerLayoutAndroid
         drawerPosition={SideBar.POSITION_RIGHT == this.props.menuPosition ? DrawerLayoutAndroid.positions.Right : DrawerLayoutAndroid.positions.Left}
         drawerWidth={this.props.menuWidth}
         keyboardDismissMode="on-drag"
         onDrawerOpen={() => {
           this.setState({opened: true});
           if (!!this.props.onChange) this.props.onChange(true);
         }}
         onDrawerClose={() => {
           this.setState({opened: false});
           if (!!this.props.onChange) this.props.onChange(false);
         }}
         ref={(drawer) => {
           this.drawer = drawer;
         }}
         renderNavigationView={this.props.menu}>
           <View style={styles.container}>
             {this.props.children}
           </View>
       </DrawerLayoutAndroid>
     );
   }

   isOpen = () => {
     return this.state.opened;
   }

   toggle = () => {
     this.openMenu(!this.isOpen())
   }

   openMenu = (isOpen) => {
     if (!this.drawer) {
       return;
     }

     this.setState({opened : isOpen});
     if (isOpen) {
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
