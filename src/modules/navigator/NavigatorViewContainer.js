import {connect} from 'react-redux';
import NavigatorView from './NavigatorView';
import store from '../../redux/store';

export default connect(
  state => ({
    navigatorState: state.get('navigatorState').toJS()
  })
)(NavigatorView);
