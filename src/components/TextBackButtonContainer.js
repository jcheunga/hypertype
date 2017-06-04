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
        <Icon
          onPress={() => this.props.onPress()}
          name="chevron-thin-left"
          size={20}
          color='#263238'/>
      </View>
    );
  }
}

export default TextBackButtonContainer;
