/* @flow */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {pushRoute, popRoute, switchScene, showBackButton} from './NavigationState';
import NavigationView from './NavigationView';

export default connect(
  state => ({
    navigationState: state.get('navigationState').toJS(),
    showBackButton:  showBackButton(state.get('navigationState')),
  }),
  dispatch => {
    return {
      switchScene: bindActionCreators(switchScene, dispatch),
      onNavigateBack: bindActionCreators(popRoute, dispatch),
      onNavigateCompleted() {
        // FIXME: why is navigationCompleted non-existant in NavigationState?
        // (causes bindActionCreators to fail)
        dispatch(navigationCompleted());
      }
    };
  }
)(NavigationView);
