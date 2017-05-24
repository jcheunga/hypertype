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
      room: props.roomJoined
    };

    this.countInterval;
    this._listenToRoom();
  }

  _listenToRoom = () => { // PATCH WITH WPM
    app.service(this.props.serviceType).on('patched', this._handleListenToRoom);
  }

  _handleListenToRoom = (response) => {
    console.log(response);
    this.setState({
      room: response
    });
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
    app.service(this.props.serviceType).removeListener('patched', this._handleListenToRoom);
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Text style={{color: 'blue'}}>Countdown: {this.state.countdownTime === 0 ? 'GO!' : this.state.countdownTime}</Text>
        <Text style={{color: 'blue'}}>Number of players joined: {this.state.playerList.length}</Text>
        <Text style={{color: 'blue'}}>Half screen ad (Admob)</Text>
      </View>
    );
  }
}

export default CountdownView;