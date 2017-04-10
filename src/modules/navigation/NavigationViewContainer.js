import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {popRoute, switchScene} from './NavigationState';
import NavigationView from './NavigationView';

export default connect(
  state => ({
    navigationState: state.get('navigationState').toJS()
  }),
  dispatch => {
    return {
      onNavigateBack: bindActionCreators(popRoute, dispatch),
      onSwitchScene: bindActionCreators(switchScene, dispatch),
      onNavigateCompleted() {
        // FIXME: why is navigationCompleted non-existant in NavigationState?
        // (causes bindActionCreators to fail)
        dispatch(navigationCompleted());
      }
    };
  }
)(NavigationView);
