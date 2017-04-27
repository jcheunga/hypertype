import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthView from './AuthView';
import {NavigationActions} from 'react-navigation';
import * as AuthStateActions from './AuthState';


export default connect(
  state => ({
    user: state.getIn(['authState', 'user']),
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      AuthStateActions: bindActionCreators(AuthStateActions, dispatch)
    };
  }
)(AuthView);