import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TypeView from './TypeView';
import {NavigationActions} from 'react-navigation';
import * as PlayStateActions from '../play/PlayState';


export default connect(
  state => ({
    user: state.authState.user,
    guestUsername: state.authState.guestUsername,
    inGame: state.playState.inGame,
    gameId: state.playState.gameId,
    gameEndTime: state.playState.gameEndTime,
    gameStartTime: state.playState.gameStartTime,
    quoteToType: state.playState.quoteToType,
    quoteAfflink: state.playState.quoteAfflink,
    roomJoined: state.playState.roomJoined
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(TypeView);
