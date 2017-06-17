import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import app from '../../feathers';
import CountdownCircle from 'react-native-countdown-circle';

import HomeContainer from '../../styles/HomeContainer';
import { countdownToSeconds } from '../../utils/Utils';

class CountdownView extends Component {
  static displayName = 'CountdownScreen';

  render() {
    return (
      <HomeContainer>
        <Text style={{color: '#fe463c', marginBottom: 20, fontSize: 22, fontWeight: '600'}}>Game is starting!</Text>
        <CountdownCircle
          seconds={countdownToSeconds(this.props.gameStartTime)}
          radius={40}
          borderWidth={10}
          color="#fe463c"
          bgColor="#f5f8fa"
          textStyle={{ fontSize: 24 }}
          onTimeElapsed={() => this.props.finishCountdown()}
        />
      </HomeContainer>
    );
  }
}

export default CountdownView;