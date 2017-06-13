import React, {Component} from 'react';

import {
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

class AppStatus extends Component {
  static displayName = 'AppStatus';

  render() {
    return (
      <View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: window.height - 50,
          right: 15,
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: this.props.isConnected ? '#43a047' : '#fe463c'
        }} />
      </View>
    );
  }
}

export default AppStatus;
