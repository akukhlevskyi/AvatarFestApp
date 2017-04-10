import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {popRoute} from '../navigation/NavigationState';
import SimpleContent from './SimpleContent';

export default connect(
  null,
  dispatch => {
    return {
      onNavigateBack: bindActionCreators(popRoute, dispatch),
    };
  }
)(SimpleContent);
