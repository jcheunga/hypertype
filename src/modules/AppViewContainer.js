import {connect} from 'react-redux';
import AppView from './AppView';
import {bindActionCreators} from 'redux';
import * as AppStateActions from './AppState';
import * as SessionStateActions from './session/SessionState';

export default connect(
  state => ({
    isReady: state.getIn(['session', 'isReady']),
    isConnected: state.getIn(['appState', 'isConnected'])
  }),
  dispatch => {
    return {
      AppStateActions: bindActionCreators(AppStateActions, dispatch),
      SessionStateActions: bindActionCreators(SessionStateActions, dispatch)
    };
  }
)(AppView);
