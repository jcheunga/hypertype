import Button from '../../components/Button';
import React, {PropTypes, Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import * as theme from '../../utils/theme';

class ScoreView extends Component {
  static displayName = 'ScoreScreen';

  startNewQuickGame = () => {
    this.props.playStateActions.findGame("1234ABCDE");
  }

  leaveGame = () => {
    this.props.playStateActions.leaveGame();    
    this.props.navigationStateActions.popRoute();
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
          action={() => console.log("play again")}
        />
        <Button
          text="Back to main menu"
          buttonStyle={theme.buttons.primary}
          textStyle={theme.fonts.primary}
          action={() => console.log("main menu")}
        />
      </View>
    );
  }
}

export default ScoreView;