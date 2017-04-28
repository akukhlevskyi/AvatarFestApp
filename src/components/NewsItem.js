import React, {PropTypes, Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Touchable from './Touchable'
import SharedView from './SharedView';

const ITEM_OFFSET = 6;
const shadowOpt = {
  // width:Dimensions.,
  height:100,
    color:"#000",
    border:2,
    radius:3,
    opacity:0.2,
    x:0,
    y:3,
    style:{ flex: 1, marginVertical:5}
};

class NewsItem extends Component {
  static displayName = 'NewsItem';

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    routeName: PropTypes.string.isRequired,
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
            <SharedView style={styles.wrap} name={`image-${this.props.data.title}`} containerRouteName={this.props.routeName}>
                <Image source={{uri: this.props.data.image}}
                  style={styles.icon}/>
            </SharedView>
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
    paddingLeft:2*ITEM_OFFSET,
    paddingRight:2*ITEM_OFFSET,
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
    flex: 1,
    height: 160,
    borderRadius: 5,
  },
  wrap: {
    flexDirection:'row',
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    marginBottom: 2*ITEM_OFFSET,
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
    marginTop: 2*ITEM_OFFSET,
    justifyContent: 'center',
    color: '#646464',
  },
});

export default NewsItem;
