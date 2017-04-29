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
import { countdownToSeconds } from '../../utils/Utils';

const window = Dimensions.get('window');

class TypeView extends Component {
  static displayName = 'TypeView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      countdownEndTime: countdownToSeconds(props.countdownEndTime),
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
    if (nextProps.countdownEndTime) {
      this.setState({
        countdownEndTime: countdownToSeconds(nextProps.countdownEndTime),
        countdownView: true,
        scoreView: false,
        typingView: false
      });
    }
  }

  startNewQuickGame = () => {
    this.props.playStateActions.leaveGame();
    this.props.playStateActions.findGame(this.props.inGame);
  }

  leaveGame = () => {
    this.props.playStateActions.leaveGame();
    this.props.navigationStateActions.reset({
      index: 0,
      actions: [{ type: 'Navigation/NAVIGATE', routeName:'Home'}]
    });
  }

  finishCountdown = () => {
    this.setState({
      countdownView: false,
      typingView: true,
      scoreView: false
    });
  }

  finishTyping = () => {
    this.setState({
      countdownView: false,
      typingView: false,
      scoreView: true
    });
  }

  render () {
    const showCountdownView = this.state.countdownView && this.props.inGame && this.props.gameId ?
      <CountdownView {...this.props} finishCountdown={this.finishCountdown} countdownEndTime={this.state.countdownEndTime}/>
    : null;

    const showTypingView = this.state.typingView && this.props.inGame && this.props.gameId ?
      <TyperaceView {...this.props} finishTyping={this.finishTyping}/>
    : null;

    const showScoreView = this.state.scoreView && this.props.inGame && this.props.gameId ?
      <ScoreView {...this.props} startNewQuickGame={this.startNewQuickGame} leaveGame={this.leaveGame}/>
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