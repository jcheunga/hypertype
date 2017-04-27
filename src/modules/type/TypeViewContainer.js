import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TypeView from './TypeView';
import {NavigationActions} from 'react-navigation';
import * as PlayStateActions from '../play/PlayState';


export default connect(
  state => ({
    inGame: state.getIn(['playState', 'inGame']),
    gameId: state.getIn(['playState', 'gameId']),
    countdownStartTime: state.getIn(['playState', 'countdownStartTime']),
    countdownEndTime: state.getIn(['playState', 'countdownEndTime']),
    quoteToType: state.getIn(['playState', 'quoteToType']),
    quoteReferralURL: state.getIn(['playState', 'quoteReferralURL'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(TypeView);
