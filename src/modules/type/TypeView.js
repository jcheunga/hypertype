import * as theme from '../../utils/theme';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions
} from 'react-native';

import CountdownView from '../countdown/CountdownView';
import TyperaceView from '../typerace/TyperaceView';
import ScoreView from '../score/ScoreView';

const window = Dimensions.get('window');

class TypeView extends Component {
  static displayName = 'TypeView';

  constructor (props) {
    super(props)

    this.state = {
      countdownEndTime: props.countdownEndTime,
      countdownView: true,
      typingView: false,
      scoreView: false
    };
  }

  componentWillMount () {
    if (!this.props.gameId || !this.props.inGame) {
      this.leaveGame();
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      countdownEndTime: nextProps.countdownEndTime,
      countdownView: true,
      scoreView: false
    });
  }

  componentWillUnmount () {
    this.leaveGame();  
  }  
  
  startNewQuickGame = () => {
    this.props.playStateActions.findGame("1234ABCDE");
  }

  leaveGame = () => {
    this.props.playStateActions.leaveGame();    
    this.props.navigationStateActions.popRoute();
  }

  finishCountdown = () => {
    this.setState({
      countdownView: false,
      typingView: true
    });
  }

  finishTyping = () => {
    this.setState({
      typingView: false,
      scoreView: true
    });
  }

  render () { 
    const showCountdownView = this.state.countdownView ?
      <CountdownView finishCountdown={this.finishCountdown} countdownEndTime={this.state.countdownEndTime}/>
    : null;

    const showTypingView = this.state.typingView ?
      <TyperaceView quoteToType={this.props.quoteToType} finishTyping={this.finishTyping}/>
    : null;

    const showScoreView = this.state.scoreView ?
      <ScoreView startNewQuickGame={this.startNewQuickGame} leaveGame={this.leaveGame}/>
    : null;

    return (
      <View style={styles.container}>
        { showCountdownView }
        { showTypingView }
        { showScoreView }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
});

export default TypeView;