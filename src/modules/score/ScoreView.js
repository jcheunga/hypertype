import React, {PropTypes, Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import app from '../../feathers';

class ScoreView extends Component {
  static displayName = 'ScoreView';

  constructor(props) {
    super(props);

    this.state = {
      playerList: null
    };

    this._listenToRoom();
  }

  _listenToRoom = () => { // PATCH WITH COMPLETED: TRUE AND MAX 10 IN THE LIST AND SORT BY WPM
    app.service(this.props.serviceType).on('patched', this._handleListenToRoom);
    const room = this.props.roomJoined;
    const roomId = room._id;
    app.service(this.props.serviceType).patch(roomId, {
      ...room
    });
  }

  _handleListenToRoom = (response) => {
    console.log(response.playerList.length);
    this.setState({
      playerList: response.playerList
    });
  }

  _parsePlayerList = () => {
    const playerList = this.state.playerList;
    playerList.map((value, key) => {
      return (
        <Text style={{color: 'blue'}} key={key}>{value.usernames}: {value.wpm}</Text>
      )
    })
  }

  _leaveGame = () => {
    this.props.leaveGame();
  }

  componentWillUnmount () {
    app.service(this.props.serviceType).removeListener('patched', this._handleListenToRoom);
  }

  render() {
    return (
      <View>
        <Text style={{color: 'red'}}>Quote again</Text>
        <Text style={{color: 'red'}}>This quote was from link to AMZN</Text>
        <View>
          {this._parsePlayerList()}
        </View>
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