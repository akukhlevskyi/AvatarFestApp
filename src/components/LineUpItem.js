import React, {PropTypes, Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Platform,
  NativeModules,
  StyleSheet,
} from 'react-native';
import Locale from 'react-native-locale'
import Touchable from './Touchable'

function getLocale () {
  const locale = Locale.constants();
  if (locale && locale.localeIdentifier){
    return locale.localeIdentifier.replace(/_/, '-')
  }
  return "ru-UA";
}

const LOCALE = getLocale();
const ITEM_OFFSET = 6;
const shadowOpt = {
  height:100,
    color:"#000",
    border:2,
    radius:3,
    opacity:0.2,
    x:0,
    y:3,
    style:{ flex: 1, marginVertical:5}
};

class LineUpItem extends Component {
  static displayName = 'LineUpItem';

  static propTypes = {
    onPress: PropTypes.func,
    data: PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    backgroundColor: PropTypes.string,
  };
  static defaultProps = {
    backgroundColor : "#F6F6F6",
  };

  _getDuration = () => {
    if (Platform.OS === 'android') {
      return this.props.data.duration;
    }
    const locale = getLocale();
    const options = {hour: 'numeric', minute: 'numeric',};

    const startDate = new Date(this.props.data.startDate);
    const endDate = new Date(this.props.data.endDate);

    return (startDate.toLocaleString(locale, options) +
            " - " +
            endDate.toLocaleString(locale, options));
  }

  _getDate = () => {
    const locale = getLocale();
    const options = {month: 'long', day: 'numeric',};
    const date = new Date(this.props.data.startDate);
    const timestam = date.getTime();

    return date.toLocaleDateString(locale, options)
  }

  render() {
    return (
      <View style={styles.item}>
        <Touchable
          onPress={() => {
            if (this.props.onPress) { this.props.onPress(this.props.data) }
          }}>
          <View style={[styles.content, {backgroundColor: this.props.backgroundColor}]}>
            <View style={styles.wrap} numberOfLines={2}>
              <Text style={styles.title}>{this.props.data.title}</Text>
            </View>

            <View style={styles.wrap}>
              <Text style={styles.date}>
                  {this._getDate()}
              </Text>
              <Text style={styles.duration}>
                  {this._getDuration()}
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
    margin:ITEM_OFFSET,
    borderRadius: 5,
  },
  wrap: {
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    margin: 6,
    minHeight: 20,
    maxHeight: 50,
    justifyContent: 'center',
    color: '#222'
  },
  date: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    margin: 6,
    justifyContent: 'center',
    textAlign: 'left',
    color: '#646464',
  },
  duration: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14,
    textAlign: 'right',
    margin: 6,
    justifyContent: 'center',
    color: '#646464',
  },
});

export default LineUpItem;
