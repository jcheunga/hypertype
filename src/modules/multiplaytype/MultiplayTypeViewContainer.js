import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayTypeView from '../multiplaytype/MultiplayTypeView';
import {NavigationActions} from 'react-navigation';
import * as MultiplayStateActions from '../multiplay/MultiplayState';


export default connect(
  state => ({
    inGame: state.multiplayState.inGame,
    gameId: state.multiplayState.gameId,
    countdownStartTime: state.multiplayState.countdownStartTime,
    countdownEndTime: state.multiplayState.countdownEndTime,
    quoteToType: state.multiplayState.quoteToType,
    quoteReferralURL: state.multiplayState.quoteReferralURL,
    gameCreator: state.multiplayState.gameCreator
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayTypeView);