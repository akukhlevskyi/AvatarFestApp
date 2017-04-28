import React, {PropTypes, Component} from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

import ParalaxToolbar from '../../components/ParalaxToolbar';
import NewsItem from '../../components/NewsItem';

class NewsView extends Component {
  static displayName = 'NewsView';
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    updateNews: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    drawer: () => ({
      label: 'Line Up',
    }),
  };

  componentDidMount() {
    this.props.updateNews();
  }

  render() {
    if (!this.props.isReady) {
      return this._renderDecorator((<ActivityIndicator style={styles.centered} />));
    }

    const {items} = this.props;
    return this._renderDecorator(items.length > 0 ? this._renderList(items) : this._renderNoData());
  }

  _renderDecorator = (content) => {
    const icon = 'ic_action_navigate';
    const onPress = () => {
      // open drawer
      this.props.navigate({routeName: 'DrawerOpen'});
    }

    return (
        <ParalaxToolbar
          style={styles.container}
          title="News"
          routeName={this.props.navigation.state.routeName}
          navbarBackgroundImage='http://avatarfest.com.ua/wp-content/uploads/2014/09/home-1.jpg'
          headerHeight={240}
          leftIcon={{icon, onPress}} >
            {content}
        </ParalaxToolbar>
    );
  }

  _handleItem = (rowData) => {
    this.props.navigate({
      routeName: 'NewsDetailsScene',
      params: {
          key: 'article',
          title: rowData.title,
          headerImage: rowData.image,
          description: rowData.description,
      },
    });
  }

  _renderItem = (rowData) => {
    return (<NewsItem
      onPress={this._handleItem.bind(this)}
      routeName={this.props.navigation.state.routeName}
      data={rowData}/>
    );
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
export default NewsView;
