import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ScoreView from './ScoreView';
import {NavigationActions} from 'react-navigation';
import * as PlayStateActions from '../play/PlayState';


export default connect(
  state => ({
    inGame: state.playState.inGame,
    gameId: state.playState.gameId
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(ScoreView);
