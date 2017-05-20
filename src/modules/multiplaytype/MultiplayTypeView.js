
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

class MultiplayTypeView extends Component {
  static displayName = 'MultiplayTypeView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      gameStartTime: countdownToSeconds(props.gameStartTime),
      countdownView: false,
      typingView: false,
      scoreView: false
    };
  }

  componentWillMount () {
    if (!this.props.gameId || !this.props.inGame || countdownToSeconds(this.props.gameStartTime) < 0 || countdownToSeconds(this.props.gameStartTime) > 10) {
      this.leaveGame();
    } else {
      this.setState({countdownView: true});
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.gameStartTime) {
      if (countdownToSeconds(nextProps.gameStartTime) < 0 || countdownToSeconds(nextProps.gameStartTime) > 10) {
        this.leaveGame();
      } else {
        this.setState({
          gameStartTime: countdownToSeconds(nextProps.gameStartTime),
          countdownView: true,
          scoreView: false,
          typingView: false
        });
      }
    }
  }

  startNewQuickGame = () => {
    // IF JOINER OR CREATOR
    this.props.multiplayStateActions.leaveGame();
    this.props.multiplayStateActions.createNewGame(this.props.inGame);
  }

  leaveGame = () => {
    this.props.multiplayStateActions.leaveGame();
    this.props.navigationStateActions.reset({
      index: 1,
      actions: [
        { type: 'Navigation/NAVIGATE', routeName:'Home'},
        { type: 'Navigation/NAVIGATE', routeName:'Multiplay'}
      ]
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
      <CountdownView {...this.props} finishCountdown={this.finishCountdown} gameStartTime={this.state.gameStartTime}/>
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
    backgroundColor: '#eaf8fd'
  }
});

export default MultiplayTypeView;