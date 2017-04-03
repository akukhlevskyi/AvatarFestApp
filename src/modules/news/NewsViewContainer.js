import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NewsView from './NewsView';
import {updateNews} from './NewsState';
import * as NavigationStateActions from '../navigation/NavigationState';

export default connect(
  state => ({
    isReady: state.getIn(['news', 'isReady']),
    items:  state.getIn(['news', 'items']),
  }),
  dispatch => {
    return {
      updateNews: bindActionCreators(updateNews, dispatch),
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
    };
  }
)(NewsView);
