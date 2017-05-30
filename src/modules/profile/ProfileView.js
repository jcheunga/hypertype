import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  ListView,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Button
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
        <View style={styles.userContainer}>
          {userView}
        </View>
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
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyText: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'System'
  },
});

export default ProfileView;