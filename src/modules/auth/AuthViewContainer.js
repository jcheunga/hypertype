import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProfileView from './ProfileView';
import {NavigationActions} from 'react-navigation';
import * as AuthStateActions from './AuthState';


export default connect(
  state => ({
    user: state.authState.user,
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      authStateActions: bindActionCreators(AuthStateActions, dispatch)
    };
  }
)(ProfileView);
