import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PlayView from './PlayView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as PlayStateActions from './PlayState';


export default connect(
  state => ({
    isLoading: state.getIn(['playState', 'loading']),
    inGame: state.getIn(['playState', 'inGame']),
    gameId: state.getIn(['playState', 'gameId']),
    gameStartTime: state.getIn(['playState', 'gameStartTime'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(PlayView);
