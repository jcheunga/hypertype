import React, {PropTypes, Component} from 'react';
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

const window = Dimensions.get('window');

class AuthView extends Component {
  static displayName = 'AuthView';

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
    this.props.authStateActions.loginAccount();
  }

  _logoutAccount = () => {
    this.props.authStateActions.logoutAccount();
  }

  _registerAccount = () => {
    this.props.authStateActions.registerAccount();
  }

  _deleteAccount = () => {
    this.props.authStateActions.deleteAccount();
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
        <LoginView />
      )
    } else {
      return null;
    }
  }

  _showRegisterView = () => {
    if (this.state.registerView) {
      return (
        <RegisterView />
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <View>
        <View style={styles.userContainer}>
          <View>
            {this._showLoginView()}
            {this._showRegisterView()}
          </View>
          <Text
            onPress={() => this._switchLoginView()}>
            Login
          </Text>
          <Text
            onPress={() => this._switchRegisterView()}>
            Register
          </Text>
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
  input: {
    width: 100
  }
});

export default AuthView;