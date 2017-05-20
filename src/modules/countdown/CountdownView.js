import React, {PropTypes, Component} from 'react';
import {
  Text,
  View
} from 'react-native';


class CountdownView extends Component {
  static displayName = 'CountdownScreen';

  constructor (props) {
    super(props);

    this.state = {
      countdownTime: props.gameStartTime
    };

    this.countInterval;
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
        <Text style={{color: 'blue'}}>Number of players joined: 5</Text>
        <Text style={{color: 'blue'}}>Half screen ad</Text>
      </View>
    );
  }
}

export default CountdownView;