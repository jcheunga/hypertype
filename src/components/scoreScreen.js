import React, {PropTypes, Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import * as theme from '../utils/theme';

class ScoreScreen extends Component {
  static displayName = 'ScoreScreen';

  render() {
    return (
      <View>
        <Text style={{color: 'white'}}>This quote was from link to AMZN</Text>
        <Text style={{color: 'white'}}>You placed 1st!</Text>
      </View>
    );
  }
}

export default ScoreScreen;