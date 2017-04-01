import React, {PropTypes, Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import * as theme from '../utils/theme';

class CountdownScreen extends Component {
  static displayName = 'CountdownScreen';
  static propTypes = {
    countdownTime: PropTypes.number.isRequired
  }

  render() {
    return (
      <View>
        <Text style={{color: 'white'}}>Countdown: {this.props.countdownTime}</Text>
      </View>
    );
  }
}

export default CountdownScreen;