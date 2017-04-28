import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MastersView from './MastersView';
import {updateMasters} from './MastersState';
import {NavigationActions} from 'react-navigation';

export default connect(
  state => ({
    isReady: state.getIn(['masters', 'isReady']),
    items:  state.getIn(['masters', 'items']),
  }),
  dispatch => {
    return {
      updateMasters: bindActionCreators(updateMasters, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    };
  }
)(MastersView);
