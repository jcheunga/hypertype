import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TypeView from './TypeView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as TypeStateActions from './TypeState';


export default connect(
  state => ({
    gameId: state.getIn(['playState', 'gameId']),
    gameStartTime: state.getIn(['playState', 'gameStartTime'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(TypeView);
