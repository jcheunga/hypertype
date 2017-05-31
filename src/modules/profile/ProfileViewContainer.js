import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProfileView from './ProfileView';
import {NavigationActions} from 'react-navigation';
import * as AuthStateActions from '../auth/AuthState';


export default connect(
  state => ({
    user: state.authState.user,
    guestUsername: state.authState.guestUsername,
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      authStateActions: bindActionCreators(AuthStateActions, dispatch)
    };
  }
)(ProfileView);
