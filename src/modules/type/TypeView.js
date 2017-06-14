import React, {Component} from 'react';
import {
  View,
  Dimensions
} from 'react-native';

import CountdownView from '../countdown/CountdownView';
import TyperaceView from '../typerace/TyperaceView';
import ScoreView from '../score/ScoreView';
import { countdownToSeconds } from '../../utils/Utils';

import app from '../../feathers';

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
      gameStartTime: countdownToSeconds(props.gameStartTime),
      countdownView: false,
      typingView: false,
      scoreView: false,
      room: props.roomJoined
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
    let user = this.props.user ? this.props.user : {usernames: this.props.guestUsername};
    this.props.playStateActions.leaveGame();
    this.props.playStateActions.findGame(this.props.inGame, user);
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
      <CountdownView {...this.props} finishCountdown={this.finishCountdown} gameStartTime={this.state.gameStartTime} serviceType="rooms"/>
    : null;

    const showTypingView = this.state.typingView && this.props.inGame && this.props.gameId ?
      <TyperaceView {...this.props} finishTyping={this.finishTyping} leaveGame={this.leaveGame} serviceType="rooms"/>
    : null;

    const showScoreView = this.state.scoreView && this.props.inGame && this.props.gameId ?
      <ScoreView {...this.props} startNewQuickGame={this.startNewQuickGame} leaveGame={this.leaveGame} serviceType="rooms"/>
    : null;

    return (
      <View style={{flex: 1}}>
        { showCountdownView }
        { showTypingView }
        { showScoreView }
      </View>
    )
  }

}

export default TypeView;