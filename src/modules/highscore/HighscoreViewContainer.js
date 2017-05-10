import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HighscoreView from './HighscoreView';
import {NavigationActions} from 'react-navigation';
import * as HighscoreStateActions from './HighscoreState';


export default connect(
  state => ({
    isFetching: state.highscoreState.isFetching,
    isFetched: state.highscoreState.isFetched,
    scores: state.highscoreState.scores,
    hasError: state.highscoreState.hasError,
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      highscoreStateActions: bindActionCreators(HighscoreStateActions, dispatch)
    };
  }
)(HighscoreView);
