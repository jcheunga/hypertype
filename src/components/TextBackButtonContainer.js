import React, {Component} from 'react';

import {
  View,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

class TextBackButtonContainer extends Component {
  static displayName = 'TextBackButton';

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => this.props.onPress()}>
          <Icon
            name="chevron-thin-left"
            size={22}
            color='#263238'/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TextBackButtonContainer;
