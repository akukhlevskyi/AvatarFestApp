import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import SimpleContentView from './SimpleContentView';

export default connect(
  null,
  dispatch => {
    return {
      back: bindActionCreators(NavigationActions.back, dispatch)
    };
  }
)(SimpleContentView);
