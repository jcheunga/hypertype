import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayTypeView from '../multiplaytype/MultiplayTypeView';
import {NavigationActions} from 'react-navigation';
import * as MultiplayStateActions from '../multiplay/MultiplayState';


export default connect(
  state => ({
    inGame: state.multiplayState.inGame,
    gameId: state.multiplayState.gameId,
    gameEndTime: state.multiplayState.gameEndTime,
    gameStartTime: state.multiplayState.gameStartTime,
    quoteData: state.multiplayState.quoteData,
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
)(MultiplayTypeView);