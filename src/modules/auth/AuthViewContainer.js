import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthView from './AuthView';
import {NavigationActions} from 'react-navigation';
import * as AuthStateActions from './AuthState';


export default connect(
  state => ({
    user: state.authState.user,
    guestUsername: state.authState.guestUsername,
    isRegistering: state.authState.isRegistering,
    isAuthenticating: state.authState.isAuthenticating,
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      authStateActions: bindActionCreators(AuthStateActions, dispatch)
    };
  }
)(AuthView);
