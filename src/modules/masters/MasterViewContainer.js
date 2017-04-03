import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NavigationStateActions from '../navigation/NavigationState';
import MasterView from './MasterView';

export default connect(
  null,
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
    };
  }
)(MasterView);
