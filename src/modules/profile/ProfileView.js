import React, {Component} from 'react';
import {
  View,
  Dimensions,
} from 'react-native';

import UserProfileView from './UserProfileView';
import AuthViewContainer from '../auth/AuthViewContainer';

import Icon from 'react-native-vector-icons/Ionicons';

const window = Dimensions.get('window');

class ProfileView extends Component {
  static displayName = 'ProfileView';

  static navigationOptions = {
    header: {
      visible: false
    },
    tabBar: {
      icon: ( { tintColor, focused }) => {
        return (
          <Icon name="md-person" size={26} style={{color: focused ? tintColor : '#929292'}}/>
        );
      }
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  render() {
    const userView = this.props.user ? <UserProfileView {...this.props}/> : <AuthViewContainer />;
    return (
      <View style={{flex: 1}}>
        {userView}
      </View>
    );
  }
}

export default ProfileView;