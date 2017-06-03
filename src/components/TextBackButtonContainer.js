import React, {Component} from 'react';

import {
  View,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

class TextBackButtonContainer extends Component {
  static displayName = 'TextBackButton';

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="chevron-thin-left" size={14} color='#263238'/>
        <Text
          style={{fontSize: 16, color: '#263238', paddingLeft: 2}}
          onPress={() => this.props.onPress()}>
          {this.props.buttonText}
        </Text>
      </View>
    );
  }
}

export default TextBackButtonContainer;
