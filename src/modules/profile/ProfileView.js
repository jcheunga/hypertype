import * as theme from '../../utils/theme';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Button
} from 'react-native';

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

    this.state = {
      loginView: true,
      registerView: false
    };
  }

  _loginAccount = () => {
    this.props.profileStateActions.loginAccount();
  }

  _logoutAccount = () => {
    this.props.profileStateActions.logoutAccount();
  }

  _registerAccount = () => {
    this.props.profileStateActions.registerAccount();
  }

  _deleteAccount = () => {
    this.props.profileStateActions.deleteAccount();
  }

  _switchLoginView = () => {
    this.setState({
      loginView: true,
      registerView: false
    });
  }

  _switchRegisterView = () => {
    this.setState({
      loginView: false,
      registerView: true
    });
  }

  _showLoginView = () => {
    if (this.state.loginView) {
      return (
        <Text>LOGIN</Text>
      )
    } else {
      return null;
    }
  }

  _showRegisterView = () => {
    if (this.state.registerView) {
      return (
        <Text>REGISTER</Text>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            { this.props.user ? "Welcome User" : "Welcome Guest 123456" }
          </Text>
          <Text style={styles.bodyText}>
            Login to save your scores and favourite quotes
          </Text>
          <View>
            {this._showLoginView()}
            {this._showRegisterView()}
          </View>
          <Button
            title="Login"
            onPress={() => this._switchLoginView()}
          />
          <Button
            title="Register Account"
            onPress={() => this._switchRegisterView()}
          />
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
    backgroundColor: theme.colors.background
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