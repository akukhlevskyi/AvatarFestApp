import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LineUpView from './LineUpView';
import {updateLineUp} from './LineUpState';
import {NavigationActions} from 'react-navigation';

export default connect(
  state => ({
    isReady: state.getIn(['lineup', 'isReady']),
    items:  state.getIn(['lineup', 'items']),
  }),
  dispatch => {
    return {
      updateLineUp: bindActionCreators(updateLineUp, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    };
  }
)(LineUpView);
