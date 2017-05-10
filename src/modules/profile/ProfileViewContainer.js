import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ProfileView from './ProfileView';
import {NavigationActions} from 'react-navigation';
import * as ProfileStateActions from './ProfileState';


export default connect(
  state => ({
    user: state.profileState.user,
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      profileStateActions: bindActionCreators(ProfileStateActions, dispatch)
    };
  }
)(ProfileView);
