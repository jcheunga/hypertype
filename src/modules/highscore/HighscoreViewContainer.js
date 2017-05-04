import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HighscoreView from './HighscoreView';
import {NavigationActions} from 'react-navigation';
import * as HighscoreStateActions from './HighscoreState';

import {feathersServices} from '../../feathers';

export default connect(
  state => ({
    rooms: state
  }),
  dispatch => {
    return {
      navigationStateActions: bindActionCreators(NavigationActions, dispatch),
      // feathersServices: bindActionCreators(feathersServices.rooms, dispatch),
    };
  }
)(HighscoreView);
