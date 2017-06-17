import React, {Component} from 'react';
import {
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
      countdownView: false,
      typingView: false,
      scoreView: false
    };
  }

  componentWillMount () {
    if (!this.props.gameId || !this.props.inGame || countdownToSeconds(this.props.gameStartTime) < 0 || countdownToSeconds(this.props.gameStartTime) > 10) {
      console.log("is it leaving in the component will mount");
      this.leaveGame();
    } else {
      this.setState({countdownView: true});
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.gameStartTime) {
      if (countdownToSeconds(nextProps.gameStartTime) < 0 || countdownToSeconds(nextProps.gameStartTime) > 10) {
        console.log("is it leaving in comp will recieve props");
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

  // startNewQuickGame = () => {
  //   // IF JOINER OR CREATOR
  //   this.props.multiplayStateActions.leaveGame();
  //   let user = this.props.user ? this.props.user : {usernames: this.props.guestUsername};
  //   this.props.multiplayStateActions.createNewGame(this.props.inGame, user);
  // }

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
    console.log("multiplaytypeview mounted");
    console.log(this.props.gameId);
    const showCountdownView = this.state.countdownView && this.props.inGame && this.props.gameId ?
      <CountdownView {...this.props} finishCountdown={this.finishCountdown} serviceType="multirooms"/>
    : null;

    const showTypingView = this.state.typingView && this.props.inGame && this.props.gameId ?
      <TyperaceView {...this.props} finishTyping={this.finishTyping} leaveGame={this.leaveGame} serviceType="multirooms"/>
    : null;

    const showScoreView = this.state.scoreView && this.props.inGame && this.props.gameId ?
      <ScoreView {...this.props} leaveGame={this.leaveGame} serviceType="multirooms"/>
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

export default MultiplayTypeView;