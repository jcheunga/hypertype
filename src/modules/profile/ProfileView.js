import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import UserProfileView from './UserProfileView';
import AuthViewContainer from '../auth/AuthViewContainer';

const window = Dimensions.get('window');

class ProfileView extends Component {
  static displayName = 'ProfileView';

  static navigationOptions = {
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
      <View style={styles.container}>
        {userView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf8fd'
  }
});

export default ProfileView;