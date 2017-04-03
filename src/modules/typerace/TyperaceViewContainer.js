import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TyperaceView from './TyperaceView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as PlayStateActions from '../play/PlayState';


export default connect(
  state => ({
    inGame: state.getIn(['playState', 'inGame']),
    gameId: state.getIn(['playState', 'gameId']),
    gameStartTime: state.getIn(['playState', 'gameStartTime']),
    gameEndTime: state.getIn(['playState', 'gameEndTime']),
    quoteToType: state.getIn(['playState', 'quoteToType']),
    quoteReferralURL: state.getIn(['playState', 'quoteReferralURL'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(TyperaceView);
