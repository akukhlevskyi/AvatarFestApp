import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

class DrawerDecorator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
              <Image style={styles.headerLogo}
                source={{uri: 'ic_menu_logo',}} />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Avatar</Text>
                <Text style={styles.subtitle}>yoga fest</Text>
              </View>
        </View>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    titleContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    title: {
      flexWrap: "wrap",
      fontSize: 20,
      color: 'white',
    },
    subtitle: {
      flexWrap: "wrap",
      fontSize: 14,
      color: '#fffd',
      marginBottom: 15,
    },
    headerLogo: {
      width: 48,
      height: 48,
      margin: 15,
      resizeMode: 'contain',
    },
    header: {
      height: 138,
      backgroundColor: '#61B0DF',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
  },
);

export default DrawerDecorator;
