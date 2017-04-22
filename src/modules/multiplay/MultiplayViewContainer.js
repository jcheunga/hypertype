import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayView from './MultiplayView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as MultiplayStateActions from './MultiplayState';


export default connect(
  state => ({
    isCreating: state.getIn(['multiplayState', 'isCreating']),
    isCreated: state.getIn(['multiplayState', 'isCreated']),
    isStarting: state.getIn(['multiplayState', 'isStarting']),
    isStarted: state.getIn(['multiplayState', 'isStarted']),
    isJoining: state.getIn(['multiplayState', 'isJoining']),
    isJoined: state.getIn(['multiplayState', 'isJoined']),
    inGame: state.getIn(['multiplayState', 'inGame']),
    gameId: state.getIn(['multiplayState', 'gameId']),
    countdownStartTime: state.getIn(['multiplayState', 'countdownStartTime']),
    countdownEndTime: state.getIn(['multiplayState', 'countdownEndTime']),
    quoteToType: state.getIn(['multiplayState', 'quoteToType']),
    quoteReferralURL: state.getIn(['multiplayState', 'quoteReferralURL']),
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayView);