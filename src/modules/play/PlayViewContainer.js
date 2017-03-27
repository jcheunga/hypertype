import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PlayView from './PlayView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as PlayStateActions from './PlayState';


export default connect(
  state => ({
    office: state.getIn(['city', 'value']),
    loading: state.getIn(['city', 'loading']),
    place: state.getIn(['city', 'place']),
    position: state.getIn(['city', 'position'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch),
      playStateActions: bindActionCreators(PlayStateActions, dispatch)
    };
  }
)(PlayView);
