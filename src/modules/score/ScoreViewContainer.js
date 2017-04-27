import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ScoreView from './ScoreView';
import {NavigationActions} from 'react-navigation';
import * as PlayStateActions from '../play/PlayState';
// import * as TypeStateActions from './TypeState';


export default connect(
  state => ({
    inGame: state.getIn(['playState', 'inGame']),
    gameId: state.getIn(['playState', 'gameId'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(ScoreView);
