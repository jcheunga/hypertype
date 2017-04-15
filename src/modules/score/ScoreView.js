import Button from '../../components/Button';
import React, {PropTypes, Component} from 'react';
import {
  Text,
  View
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
          text="Play again?"
          buttonStyle={theme.buttons.primary}
          textStyle={theme.fonts.primary}
          action={() => this.props.startNewQuickGame("1234ABCD")}
        />
        <Button
          text="Back to main menu"
          buttonStyle={theme.buttons.primary}
          textStyle={theme.fonts.primary}
          action={() => this.leaveGame()}
        />
      </View>
    );
  }
}

export default ScoreView;