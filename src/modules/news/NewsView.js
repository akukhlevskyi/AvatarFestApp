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

import NewsItem from '../../components/NewsItem';

class NewsView extends Component {
  static displayName = 'NewsView';
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    navigationStateActions: PropTypes.shape({
      pushRoute: PropTypes.func.isRequired,
    }).isRequired,
    updateNews: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.updateNews();
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={styles.container}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    const {items} = this.props;

    return items.length > 0 ? this.renderList(items) : this.renderNoData();
  }

  handleItem = (rowData) => {
    this.props.navigationStateActions.pushRoute({
      key: 'Article',
      title: rowData.title,
      backgroundImage: rowData.image,
      data: { title: rowData.title, description: rowData.description},
    });
  }

  renderItem = (rowData) => {
    return (<NewsItem
      onPress={this.handleItem}
      data={rowData}/>
    );
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
