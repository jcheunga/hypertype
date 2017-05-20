import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PlayView from './PlayView';
import {NavigationActions} from 'react-navigation';
import * as PlayStateActions from './PlayState';
import * as MultiplayStateActions from '../multiplay/MultiplayState';


export default connect(
  state => ({
    isLoading: state.playState.isLoading,
    inGame: state.playState.inGame,
    user: state.authState.user,
    guestUsername: state.authState.guestUsername
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(PlayView);
