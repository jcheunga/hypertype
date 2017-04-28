import React, {PropTypes, Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import * as theme from '../../utils/theme';
import { countdownToSeconds } from '../../utils/Utils';

class CountdownView extends Component {
  static displayName = 'CountdownScreen';

  constructor (props) {
    super(props);

    this.state = {
      countdownTime: countdownToSeconds(props.countdownEndTime)
    };
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
        <Text style={{color: 'white'}}>Countdown: {this.state.countdownTime === 0 ? 'GO!' : this.state.countdownTime}</Text>
        <Text style={{color: 'white'}}>Number of players joined: 5</Text>
        <Text style={{color: 'white'}}>Half screen ad</Text>
      </View>
    );
  }
}

export default CountdownView;