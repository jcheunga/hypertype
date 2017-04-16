import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MultiplayView from './MultiplayView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as MultiplayStateActions from './MultiplayState';


export default connect(
  state => ({
    errorMessage: state.getIn(['playState', 'errorMessage']),
    isLoading: state.getIn(['playState', 'isLoading']),
    inGame: state.getIn(['playState', 'inGame'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      multiplayStateActions: bindActionCreators(MultiplayStateActions, dispatch)
    };
  }
)(MultiplayView);