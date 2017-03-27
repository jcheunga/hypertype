import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TypeView from './TypeView';
import * as NavigationStateActions from '../navigation/NavigationState';
import * as TypeStateActions from './TypeState';


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
)(TypeView);
