import React, {PropTypes, Component} from 'react';
import {
  View,
  TouchableNativeFeedback,
  Image,
  Text,
  StyleSheet
} from 'react-native';

class MenuItem extends Component {
  static displayName = 'MenuItem';

  static propTypes = {
    switchScene: React.PropTypes.func,
    scene: React.PropTypes.string,
    title: React.PropTypes.string,
    icon: React.PropTypes.string,
  };

  render() {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.switchScene(this.props.scene);
        }}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.item}>
          <Image
            source={{uri: this.props.icon}}
            style={styles.itemIcon}/>
          <Text style={styles.itemTitle}>{this.props.title}</Text>
        </View>
      </TouchableNativeFeedback>
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