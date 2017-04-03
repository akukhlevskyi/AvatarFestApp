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

class NewsItem extends Component {
  static displayName = 'NewsItem';

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
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
            <View style={styles.wrap}>
              <Text style={styles.title}>{this.props.data.title}</Text>
            </View>
            <View style={styles.wrap}>
              <Image source={{uri: this.props.data.image}}
                style={styles.icon}/>
            </View>
            <View style={styles.wrap}>
              <Text numberOfLines={3}
                style={styles.description}>
                  {this.props.data.description}
                </Text>
            </View>
          </View>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexWrap: "wrap",
    padding: ITEM_OFFSET,
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
  },
  icon: {
    flex: 1,
    height: 160,
    margin:ITEM_OFFSET,
    borderRadius: 5,
  },
  wrap: {
    flexDirection:'row',
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    margin: 6,
    height: 20,
    justifyContent: 'center',
    color: '#222'
  },
  description: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    minHeight: 20,
    maxHeight: 70,
    margin: 6,
    justifyContent: 'center',
    color: '#646464',
  },
});

export default NewsItem;
