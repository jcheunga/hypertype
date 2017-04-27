import React, {PropTypes, Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import * as theme from '../../utils/theme';

class ScoreView extends Component {
  static displayName = 'ScoreView';

  leaveGame = () => {
    this.props.leaveGame();
  }

  render() {
    return (
      <View>
        <Text style={{color: 'white'}}>Quote again</Text>
        <Text style={{color: 'white'}}>This quote was from link to AMZN</Text>
        <Text style={{color: 'white'}}>You placed 1st!</Text>
        <Button
          title="Play again?"
          onPress={() => this.props.startNewQuickGame("1234ABCD")}
        />
        <Button
          title="Back to main menu"
          onPress={() => this.leaveGame()}
        />
      </View>
    );
  }
}

export default ScoreView;