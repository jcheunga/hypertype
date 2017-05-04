import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TypeView from './TypeView';
import {NavigationActions} from 'react-navigation';
import * as PlayStateActions from '../play/PlayState';


export default connect(
  state => ({
    inGame: state.playState.inGame,
    gameId: state.playState.gameId,
    countdownStartTime: state.playState.countdownStartTime,
    countdownEndTime: state.playState.countdownEndTime,
    quoteToType: state.playState.quoteToType,
    quoteReferralURL: state.playState.quoteReferralURL
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(TypeView);
