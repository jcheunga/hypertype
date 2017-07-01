import React from 'react';
import {
  View,
  Dimensions
} from 'react-native';

import CountdownView from '../countdown/CountdownView';
import TyperaceView from '../typerace/TyperaceView';
import ScoreView from '../score/ScoreView';
import { countdownToSeconds } from '../../utils/Utils';

const window = Dimensions.get('window');

class MultiplayTypeView extends React.PureComponent {
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
    if (!this.props.gameId || !this.props.inGame || this.props.countdownTime < 0 || this.props.countdownTime > 5) {
      this.leaveGame();
    } else {
      this.setState({countdownView: true});
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
      index: 0,
      actions: [
        { type: 'Navigation/NAVIGATE', routeName:'Home'}
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
    console.log(this.props);
    const showCountdownView = this.state.countdownView && this.props.inGame && this.props.gameId ?
      <CountdownView {...this.props} finishCountdown={this.finishCountdown} countdownTimeDuration={this.props.countdownTime} serviceType="multirooms"/>
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