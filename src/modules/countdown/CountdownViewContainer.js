import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CountdownView from './CountdownView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as PlayStateActions from '../play/PlayState';


export default connect(
  state => ({
    inGame: state.getIn(['playState', 'inGame']),
    gameId: state.getIn(['playState', 'gameId'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(CountdownView);
