import React, {PropTypes, Component} from 'react';

import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Touchable from "./Touchable"

const ITEM_OFFSET = 6;
const ITEM_SIZE = Dimensions.get('window').width / 2 - ITEM_OFFSET;

class MasterItem extends Component {
  static displayName = 'MasterItem';

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarImg: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <View style={styles.item}>
        <Touchable
          onPress={() => {
            this.props.onPress(this.props.data);
          }}>
          <View style={styles.content}>
            <Image
              source={{uri: this.props.data.avatarImg}}
              style={styles.icon}/>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{this.props.data.name}</Text>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.description}>{this.props.data.description}</Text>
            </View>
          </View>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    width: ITEM_SIZE,
    padding: ITEM_OFFSET,
    flexDirection: 'row',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft:ITEM_OFFSET,
    paddingRight:ITEM_OFFSET,
    paddingTop:12,
    paddingBottom:12,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    flexWrap: "wrap",
    flexDirection: 'column',
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 0
    },
  },
  icon: {
    width: (ITEM_SIZE-4*ITEM_OFFSET),
    height: (ITEM_SIZE-4*ITEM_OFFSET),
    borderRadius: (ITEM_SIZE-4*ITEM_OFFSET)/2,
  },
  textWrap: {
    flexDirection:'row',
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    marginTop: 12,
    height: 20,
    justifyContent: 'center',
    color: '#222'
  },
  description: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    height: 20,
    justifyContent: 'center',
    marginTop: 6,
    color: '#646464',
  },
});

export default MasterItem;
