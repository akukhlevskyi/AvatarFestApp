import React, {PropTypes, Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import Touchable from "./Touchable"

class MenuItem extends Component {
  static displayName = 'MenuItem';

  static propTypes = {
    onPress: PropTypes.func,
    scene: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
  };

  render() {
    return (
      <Touchable
        onPress={() => {
          this.props.onPress(this.props.scene);
        }}>
        <View style={styles.item}>
          <Image
            source={{uri: this.props.icon}}
            style={styles.itemIcon}/>
          <Text style={styles.itemTitle}>{this.props.title}</Text>
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemIcon: {
    width: 36,
    height: 36,
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
  },
});

export default MenuItem;
