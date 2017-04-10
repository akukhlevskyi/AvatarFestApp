import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LineUpView from './LineUpView';
import {updateLineUp} from './LineUpState';
import * as NavigationStateActions from '../navigation/NavigationState';

export default connect(
  state => ({
    isReady: state.getIn(['lineup', 'isReady']),
    items:  state.getIn(['lineup', 'items']),
  }),
  dispatch => {
    return {
      updateLineUp: bindActionCreators(updateLineUp, dispatch),
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
    };
  }
)(LineUpView);
