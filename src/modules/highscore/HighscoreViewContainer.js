import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HighscoreView from './HighscoreView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as HighscoreStateActions from './HighscoreState';


export default connect(
  state => ({
    office: state.getIn(['city', 'value']),
    loading: state.getIn(['city', 'loading']),
    place: state.getIn(['city', 'place']),
    position: state.getIn(['city', 'position'])
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationStateActions, dispatch)
    };
  }
)(HighscoreView);
