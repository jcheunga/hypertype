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

import LoginView from './LoginView';
import RegisterView from './RegisterView';

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
        <LoginView {...this.props}/>
      )
    } else {
      return null;
    }
  }

  _showRegisterView = () => {
    if (this.state.registerView) {
      return (
        <RegisterView {...this.props}/>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <View>
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            Welcome {this.props.guestUsername}
          </Text>
          <Text style={styles.bodyText}>
            Login to save your scores and favourite quotes
          </Text>
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