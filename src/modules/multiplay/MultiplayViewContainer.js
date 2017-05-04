import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayView from './MultiplayView';
import {NavigationActions} from 'react-navigation';
import * as MultiplayStateActions from './MultiplayState';


export default connect(
  state => ({
    isCreating: state.multiplayState.isCreating,
    isCreated: state.multiplayState.isCreated,
    isStarting: state.multiplayState.isStarting,
    isStarted: state.multiplayState.isStarted,
    isJoining: state.multiplayState.isJoining,
    isJoined: state.multiplayState.isJoined,
    inGame: state.multiplayState.inGame,
    gameId: state.multiplayState.gameId,
    countdownStartTime: state.multiplayState.countdownStartTime,
    countdownEndTime: state.multiplayState.countdownEndTime,
    quoteToType: state.multiplayState.quoteToType,
    quoteReferralURL: state.multiplayState.quoteReferralURL,
    gameCreator: state.multiplayState.gameCreator,
    joinGameStarted: state.multiplayState.joinGameStarted
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayView);