import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PlayView from './PlayView';
import {NavigationActions} from 'react-navigation';
import * as PlayStateActions from './PlayState';


export default connect(
  state => ({
    isLoading: state.getIn(['playState', 'isLoading']),
    inGame: state.getIn(['playState', 'inGame'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(PlayView);
