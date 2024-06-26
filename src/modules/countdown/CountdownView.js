import React from 'react';
import {
  View,
  Text
} from 'react-native';

import app from '../../feathers';
import CountdownCircle from 'react-native-countdown-circle';

import HomeContainer from '../../styles/HomeContainer';

class CountdownView extends React.Component {
  static displayName = 'CountdownScreen';

  render() {
    return (
      <HomeContainer>
        <Text style={{color: '#fe463c', marginBottom: 20, fontSize: 22, fontWeight: '600'}}>Game is starting!</Text>
        <CountdownCircle
          seconds={this.props.countdownTimeDuration} // CHANGE THE NODE MODULE TO SHOW MATH ROUND BUT FOR THE COUTNDOWN TO BE IN UNROUNDED SECONDS
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