import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NavigationStateActions from '../navigation/NavigationState';
import MenuView from './MenuView';

export default connect(
  state => ({
    navigationState: state.get('navigationState').toJS()
  }),
  dispatch => {
    return {
        navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      }
  }
)(MenuView);
