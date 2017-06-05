import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import app from '../../feathers';
import CountdownCircle from 'react-native-countdown-circle';

class CountdownView extends Component {
  static displayName = 'CountdownScreen';

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#fe463c', marginBottom: 20, fontSize: 22, fontWeight: '600'}}>Game is starting!</Text>
        <CountdownCircle
          seconds={this.props.gameStartTime}
          radius={40}
          borderWidth={10}
          color="#fe463c"
          bgColor="#fff"
          textStyle={{ fontSize: 24 }}
          onTimeElapsed={() => this.props.finishCountdown()}
        />
      </View>
    );
  }
}

export default CountdownView;