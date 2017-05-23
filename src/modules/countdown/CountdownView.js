import React, {PropTypes, Component} from 'react';
import {
  Text,
  View
} from 'react-native';

import app from '../../feathers';

class CountdownView extends Component {
  static displayName = 'CountdownScreen';

  constructor (props) {
    super(props);

    this.state = {
      countdownTime: props.gameStartTime,
      playerList: this.props.roomJoined.playerList
    };

    this.countInterval;
    this._listenToRoom();
  }

  _listenToRoom = () => {
    app.service("multirooms").on('patched', this._handleListenToRoom);
    const room = this.props.roomJoined;
    const roomId = room._id;
    app.service("multirooms").patch(roomId, {
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
        <Text style={{color: 'blue'}} key={key}>{value.usernames}</Text>
      )
    })
  }

  componentDidMount () {
    this.countInterval = setInterval(() => {
      if (this.state.countdownTime === 0) {
        clearInterval(this.countInterval);
        this.props.finishCountdown();
      }
      if (this.state.countdownTime >= 1) {
        this.setState({
          countdownTime: this.state.countdownTime - 1
        })
      }
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.countInterval);
    app.service("multirooms").removeListener('patched', this._handleListenToRoom);
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text style={{color: 'blue'}}>Countdown: {this.state.countdownTime === 0 ? 'GO!' : this.state.countdownTime}</Text>
        <Text style={{color: 'blue'}}>Number of players joined: {this.state.playerList.length}</Text>
        <View>
          {this._parsePlayerList()}
        </View>
        <Text style={{color: 'blue'}}>Half screen ad (Admob)</Text>
      </View>
    );
  }
}

export default CountdownView;