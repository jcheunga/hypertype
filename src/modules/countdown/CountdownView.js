import React, {PropTypes, Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import * as theme from '../../utils/theme';

class CountdownView extends Component {
  static displayName = 'CountdownScreen';
  static propTypes = {
    countdownTime: PropTypes.number.isRequired
  }

  render() {
    return (
      <View>
        <Text style={{color: 'white'}}>Countdown: {this.props.countdownTime === 0 ? 'GO!' : this.props.countdownTime}</Text>
        <Text style={{color: 'white'}}>Number of players joined: 5</Text>
        <Text style={{color: 'white'}}>Half screen ad</Text>
      </View>
    );
  }
}

export default CountdownView;