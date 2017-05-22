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
      noOfPlayers: 1
    };

    this.countInterval;
    this.listenNumberOfPlayers();
  }

  listenNumberOfPlayers = () => {
    app.service("multirooms").on('patched', this.handleNumberOfPlayers);
  }

  handleNumberOfPlayers = (response) => {
    console.log(response);
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
  }

  render() {
    return (
      <View>
        <Text style={{color: 'blue'}}>Countdown: {this.state.countdownTime === 0 ? 'GO!' : this.state.countdownTime}</Text>
        <Text style={{color: 'blue'}}>Number of players joined: {this.state.noOfPlayers}</Text>
        <Text style={{color: 'blue'}}>Half screen ad (Admob)</Text>
      </View>
    );
  }
}

export default CountdownView;