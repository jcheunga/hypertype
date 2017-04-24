import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayTypeView from './MultiplayTypeView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as MultiplayStateActions from '../multiplay/MultiplayState';


export default connect(
  state => ({
    inGame: state.getIn(['multiplayState', 'inGame']),
    gameId: state.getIn(['multiplayState', 'gameId']),
    countdownStartTime: state.getIn(['multiplayState', 'countdownStartTime']),
    countdownEndTime: state.getIn(['multiplayState', 'countdownEndTime']),
    quoteToType: state.getIn(['multiplayState', 'quoteToType']),
    quoteReferralURL: state.getIn(['multiplayState', 'quoteReferralURL'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayTypeView);
