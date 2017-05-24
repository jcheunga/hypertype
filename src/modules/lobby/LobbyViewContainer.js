import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LobbyView from './LobbyView';
import {NavigationActions} from 'react-navigation';


export default connect(
  null,
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch)
    };
  }
)(LobbyView);
