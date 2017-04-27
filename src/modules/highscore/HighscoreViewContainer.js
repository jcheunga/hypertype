import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HighscoreView from './HighscoreView';
import {NavigationActions} from 'react-navigation';
import * as HighscoreStateActions from './HighscoreState';


export default connect(
  null,
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch)
    };
  }
)(HighscoreView);
