import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayView from './MultiplayView';
import {NavigationActions} from 'react-navigation';
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
    gameCreator: state.getIn(['multiplayState', 'gameCreator']),
    joinGameStarted: state.getIn(['multiplayState', 'joinGameStarted'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayView);