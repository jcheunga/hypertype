import React, {Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import LobbyViewContainer from '../lobby/LobbyViewContainer';
import app from '../../feathers';

class ScoreView extends Component {
  static displayName = 'ScoreView';

  constructor(props) {
    super(props);

    this.state = {
      room: props.roomJoined
    };

    this._listenToRoom();
  }

  _listenToRoom = () => { // SORT BY COMPLETED TRUE AND WPM
    app.service(this.props.serviceType).on('patched', this._handleListenToRoom);
  }

  _handleListenToRoom = (response) => {
    this.setState({
      room: response
    });
  }

  _leaveGame = () => {
    this.props.leaveGame();
  }

  componentWillUnmount () {
    app.service(this.props.serviceType).removeListener('patched', this._handleListenToRoom);
  }

  render() {
    const showLobby = this.state.room ? <LobbyViewContainer roomJoined={this.state.room} showScore={true}/> : null;

    return (
      <View>
        <Text style={{color: 'red'}}>Quote again</Text>
        <Text style={{color: 'red'}}>This quote was from link to AMZN</Text>
        <View>{showLobby}</View>
        <Button
          title="Play again?"
          onPress={() => this.props.startNewQuickGame()}
        />
        <Button
          title="Back to main menu"
          onPress={() => this._leaveGame()}
        />
      </View>
    );
  }
}

export default ScoreView;