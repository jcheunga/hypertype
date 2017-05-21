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
    gameEndTime: state.multiplayState.gameEndTime,
    gameStartTime: state.multiplayState.gameStartTime,
    quoteToType: state.multiplayState.quoteToType,
    quoteAfflink: state.multiplayState.quoteAfflink,
    gameCreator: state.multiplayState.gameCreator,
    roomJoined: state.multiplayState.roomJoined,
    user: state.authState.user,
    guestUsername: state.authState.guestUsername
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayView);