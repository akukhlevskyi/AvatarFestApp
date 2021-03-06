import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NewsView from './NewsView';
import {updateNews} from './NewsState';
import {NavigationActions} from 'react-navigation';

export default connect(
  state => ({
    isReady: state.getIn(['news', 'isReady']),
    items:  state.getIn(['news', 'items']),
  }),
  dispatch => {
    return {
      updateNews: bindActionCreators(updateNews, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(NewsView);
