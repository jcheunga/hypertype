import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthView from './AuthView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as AuthStateActions from './AuthState';


export default connect(
  state => ({
    user: state.getIn(['authState', 'user']),
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      AuthStateActions: bindActionCreators(AuthStateActions, dispatch)
    };
  }
)(AuthView);