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

import ParalaxToolbar from '../../components/ParalaxToolbar';
import MasterItem from '../../components/MasterItem';

class MastersView extends Component {
  static displayName = 'MastersView';
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
    updateMasters: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.updateMasters();
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
          title="Masters"
          routeName={this.props.navigation.state.routeName}
          leftIcon={{icon, onPress}} >
            {content}
        </ParalaxToolbar>
  )}

  render() {
    if (!this.props.isReady) {
      return this._renderDecorator((<ActivityIndicator style={styles.centered} />));
    }

    const {items} = this.props;
    return this._renderDecorator(items.length > 0 ? this._renderList(items) : this._renderNoData());
  }

  _handleItem = (rowData) => {
    this.props.navigate({
      routeName: 'MasterDetailsScene',
      params: {
        key: 'master',
        title: rowData.name,
        profileImage: rowData.avatarImg,
        headerImage: rowData.backgrounImg,
        description: rowData.description,
      },
    });
  }

  _renderItem = (rowData) => {
    return (<MasterItem
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
        contentContainerStyle={styles.list}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    margin: 6,
  },
});
export default MastersView;
