import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TypeView from './TypeView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as PlayStateActions from '../play/PlayState';
// import * as TypeStateActions from './TypeState';


export default connect(
  state => ({
    inGame: state.getIn(['playState', 'inGame']),
    gameId: state.getIn(['playState', 'gameId']),
    gameStartTime: state.getIn(['playState', 'gameStartTime']),
    quoteToType: state.getIn(['playState', 'quoteToType']),
    quoteReferralURL: state.getIn(['playState', 'quoteReferralURL'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(TypeView);
