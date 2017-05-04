import {connect} from 'react-redux';
import AppView from './AppView';
import {bindActionCreators} from 'redux';
import * as AppStateActions from './AppState';
import * as SessionStateActions from './session/SessionState';

export default connect(
  state => ({
    isReady: state.session.isReady
  }),
  dispatch => {
    return {
      AppStateActions: bindActionCreators(AppStateActions, dispatch),
      SessionStateActions: bindActionCreators(SessionStateActions, dispatch)
    };
  }
)(AppView);
