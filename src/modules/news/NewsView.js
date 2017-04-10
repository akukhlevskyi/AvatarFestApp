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
import CicledVideo from '../../components/CicledVideo';
import NewsItem from '../../components/NewsItem';

class NewsView extends Component {
  static displayName = 'NewsView';
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    navigationStateActions: PropTypes.shape({
      pushRoute: PropTypes.func.isRequired,
    }).isRequired,
    updateNews: PropTypes.func.isRequired,
    //toggleMenu: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.updateNews();
  }

  render() {
    if (!this.props.isReady) {
      return this.renderDecorator((<ActivityIndicator style={styles.centered} />));
    }

    const {items} = this.props;
    return this.renderDecorator(items.length > 0 ? this.renderList(items) : this.renderNoData());
  }

  renderHeaderVideo = () => {
    return (<CicledVideo style={styles.container} source={require('./res/video.mp4')}/>);
  }

  renderDecorator = (content) => {
    const icon = 'ic_action_navigate';
    const onPress = () => {
       this.props.navigationStateActions.toggleMenu();
    }

    return (
        <ParalaxToolbar
          navbarBackgroundColor='#61B0DF'
          style={styles.container}
          title={this.props.title}
          navbarBackgroundImage={require('./res/home.jpg')}
          headerHeight={240}
          headerRender={this.renderHeaderVideo}
          leftIcon={{icon, onPress}} >
            {content}
        </ParalaxToolbar>
    );
  }

  handleItem = (rowData) => {
    this.props.navigationStateActions.pushRoute({
      key: 'Article',
      title: rowData.title,
      headerImage: rowData.image,
      description: rowData.description,
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
