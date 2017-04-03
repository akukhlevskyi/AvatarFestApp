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

import MasterItem from '../../components/MasterItem';

class MastersView extends Component {
  static displayName = 'MastersView';
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    navigationStateActions: PropTypes.shape({
      pushRoute: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.updateMasters();
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    const {items} = this.props;

    return items.length > 0 ? this.renderList(items) : this.renderNoData();
  }

  handleItem = (rowData) => {
    this.props.navigationStateActions.pushRoute({
      key: 'Master',
      title: rowData.name,
      profileImage: rowData.avatarImg,
      backgroundImage: rowData.backgrounImg,
      data: { name: rowData.name, description: rowData.description},
    });
  }

  renderItem = (rowData) => {
    return (<MasterItem
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
        contentContainerStyle={styles.list}
        pageSize={2}
        initialListSize={21}
        scrollRenderAheadDistance={500}
        dataSource={dataSource.cloneWithRows(items)}
        renderRow={this.renderItem} />
    )
  }

  renderNoData = () => {
    return (
      <View style={{flex: 1}}>
        <Text style={[styles.centered, styles.noData]}>No data</Text>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center',
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
