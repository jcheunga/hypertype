import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text
} from 'react-native';

import UserProfileView from './UserProfileView';
import AuthViewContainer from '../auth/AuthViewContainer';

import MainContainer from '../../styles/MainContainer';

const window = Dimensions.get('window');

class ProfileView extends Component {
  static displayName = 'ProfileView';

  static navigationOptions = {
    // title: 'Profile',
    header: {
      visible: false
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  render() {
    const userView = this.props.user ? <UserProfileView {...this.props}/> : <AuthViewContainer />;
    return (
      <MainContainer userOn={this.props.user}>
        {userView}
      </MainContainer>
    );
  }
}

export default ProfileView;