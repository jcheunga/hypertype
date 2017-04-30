import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayTypeView from '../multiplaytype/MultiplayTypeView';
import {NavigationActions} from 'react-navigation';
import * as MultiplayStateActions from '../multiplay/MultiplayState';


export default connect(
  state => ({
    inGame: state.getIn(['multiplayState', 'inGame']),
    gameId: state.getIn(['multiplayState', 'gameId']),
    countdownStartTime: state.getIn(['multiplayState', 'countdownStartTime']),
    countdownEndTime: state.getIn(['multiplayState', 'countdownEndTime']),
    quoteToType: state.getIn(['multiplayState', 'quoteToType']),
    quoteReferralURL: state.getIn(['multiplayState', 'quoteReferralURL']),
    gameCreator: state.getIn(['multiplayState', 'gameCreator'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayTypeView);