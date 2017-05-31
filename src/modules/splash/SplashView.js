import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator
} from 'react-native';

class SplashView extends Component {
  static displayName = 'SplashView';

  render() {
    return (
      <ActivityIndicator style={{flex: 1, alignSelf: 'center'}}/>
    );
  }
}

export default SplashView;