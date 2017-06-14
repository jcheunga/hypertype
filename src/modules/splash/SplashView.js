import React, {Component} from 'react';
import {
  View,
  Image
} from 'react-native';

class SplashView extends Component {
  static displayName = 'SplashView';

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e6f4ff'}}>
        <Image
          style={{width: 140, height: 140}}
          source={require('../../assets/images/hypertype-greyscale-logo.png')}
        />
      </View>
    );
  }
}

export default SplashView;