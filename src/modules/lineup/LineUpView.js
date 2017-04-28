import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  ActivityIndicator,
  Dimensions,
  StyleSheet
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import ParalaxToolbar from '../../components/ParalaxToolbar';
import LineUpItem from '../../components/LineUpItem';

class LineUpView extends Component {
  static displayName = 'LineUpView';
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    updateLineUp: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.updateLineUp();
  }

  _renderDecorator = (content, shadow=true) => {
    const icon = 'ic_action_navigate';
    const onPress = () => {
      // open drawer
      this.props.navigate({routeName: 'DrawerOpen'});
    }

    return (
        <ParalaxToolbar
          style={styles.container}
          title="Line Up"
          routeName={this.props.navigation.state.routeName}
          showShadow={shadow}
          leftIcon={{icon, onPress}} >
            {content}
        </ParalaxToolbar>
  )}

  render() {
    if (!this.props.isReady) {
      return this._renderDecorator((<ActivityIndicator style={styles.centered} />));
    }

    const {items} = this.props;
    return items.length > 0 ?
              this._renderDecorator(this._renderContent(items), false) :
              this._renderDecorator(this._renderNoData());
  }

  _renderContent = (items) => {
    return (
      <ScrollableTabView
        initialPage={0}
        tabBarBackgroundColor="#61B0DF"
        tabBarActiveTextColor="#FFFFFF"
        tabBarInactiveTextColor="#EEEEEE"
        tabBarUnderlineStyle={{backgroundColor: "#00000022"}}
        style={styles.tabBar}
        renderTabBar={() => <ScrollableTabBar/>}>
        {items.map((item, i) => {
          return (<View key={i} tabLabel={item.title}>{this._renderList(item.lineup)}</View>)
        })}
      </ScrollableTabView>
    );
  }

  _renderItem = (rowData) => {
    switch (rowData.type) {
      case "day":
        return (<Text style={{marginHorizontal: 6, marginVertical: 10}}>{rowData.title}</Text>);
      case "masterclass":
        return (<LineUpItem
           backgroundColor="#fefef1"
           data={rowData} />);
      case "food":
      case "event":
        return (<LineUpItem
           data={rowData} />);
      default:
        console.warn(JSON.stringify(rowData));
        return null;
    }
  }

  _renderList = (items) => {
    const dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id},
    );
    return (
      <ListView
        style={styles.list}
        pageSize={2}
        initialListSize={21}
        scrollRenderAheadDistance={500}
        dataSource={dataSource.cloneWithRows(items)}
        renderRow={this._renderItem.bind(this)} />
    )
  }

  _renderNoData = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No data</Text>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 0,
    },
  },
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    fontSize: 18,
    color: '#646464',
  },
  list: {
    margin: 6,
  },
});
export default LineUpView;
