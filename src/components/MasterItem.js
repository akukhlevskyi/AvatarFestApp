import React, {PropTypes, Component} from 'react';

import {
  View,
  Image,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';

import Touchable from "./Touchable"
import SharedView from './SharedView';

const ITEM_OFFSET = 6;
const ITEM_SIZE = Dimensions.get('window').width/2 - ITEM_OFFSET;

class MasterItem extends Component {
  static displayName = 'MasterItem';

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    routeName: PropTypes.string.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarImg: PropTypes.string.isRequired,
      backgrounImg: PropTypes.string,
      backgroundColor: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    data: {
      backgroundColor: '#61B0DF',
    },
  };

  render() {
    const {routeName} = this.props;
    const {name, description, avatarImg, backgrounImg} = this.props.data;
    const backgroundColor = this.props.data.backgroundColor ? this.props.data.backgroundColor : '#61B0DF';
    return (
      <View style={styles.item}>
        <Touchable
          onPress={() => {
            this.props.onPress(this.props.data);
          }}>
          <View style={styles.content}>
            <View style={{ height: ITEM_SIZE-2*ITEM_OFFSET,
                           width: ITEM_SIZE-2*ITEM_OFFSET,
                           justifyContent: 'center',
                           alignItems: 'center',
                         }}>

                        <SharedView style={[styles.background]}
                                    itemZIndex={0}
                                    name={`image-${name}`}
                                    containerRouteName={routeName}>
                          { backgrounImg
                            ? (<Image style={[styles.backgroundImg]} source={{uri: backgrounImg}} />)
                            : (<View style={[styles.background, {backgroundColor}]} />)}
                        </SharedView>

                        <SharedView name={`profile-${name}`}
                                    itemZIndex={1}
                                    containerRouteName={routeName}>
                          <Image
                            source={{uri: avatarImg}}
                            style={styles.icon}/>
                        </SharedView>

            </View>
            <View style={styles.textWrap}>
              <Text style={styles.title}>{name}</Text>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.description}>{description}</Text>
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
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  backgroundImg: {
    flex: 1,
    ...(Platform.OS === 'android' ? {borderTopRightRadius: 5, borderTopLeftRadius: 5,} : {borderRadius: 5}),
  },
  icon: {
    width: 90,
    height: 90,
    zIndex: 7,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 90/2,
  },
  textWrap: {
    flexDirection:'row',
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
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
    margin: 12,
    marginTop: 6,
    color: '#646464',
  },
});

export default MasterItem;
