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
    navigationStateActions: PropTypes.shape({
      pushRoute: PropTypes.func.isRequired,
    }).isRequired,
    updateLineUp: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.updateLineUp();
  }

  renderDecorator = (content, shadow=true) => {
    const icon = 'ic_action_navigate';
    const onPress = () => {
       this.props.navigationStateActions.toggleMenu();
    }

    return (
        <ParalaxToolbar
          navbarBackgroundColor='#61B0DF'
          style={styles.container}
          title={this.props.title}
          showShadow={shadow}
          leftIcon={{icon, onPress}} >
            {content}
        </ParalaxToolbar>
  )}

  render() {
    if (!this.props.isReady) {
      return this.renderDecorator((<ActivityIndicator style={styles.centered} />));
    }

    const {items} = this.props;
    return items.length > 0 ?
              this.renderDecorator(this.renderContent(items), false) :
              this.renderDecorator(this.renderNoData());
  }

  renderContent = (items) => {
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
          return (<View key={i} tabLabel={item.title}>{this.renderList(item.lineup)}</View>)
        })}
      </ScrollableTabView>
    );
  }

  handleItem = (rowData) => {
    this.props.navigationStateActions.pushRoute({
      key: 'Master',
      title: rowData.name,
      profileImage: rowData.avatarImg,
      headerImage: rowData.backgrounImg,
      description: rowData.description,
    });
  }

  renderItem = (rowData) => {
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

  renderList = (items) => {
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
        renderRow={this.renderItem} />
    )
  }

  renderNoData = () => {
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
