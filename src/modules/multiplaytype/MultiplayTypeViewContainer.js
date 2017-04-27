import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayTypeView from './MultiplayTypeView';
import {NavigationActions} from 'react-navigation';
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
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayTypeView);
