import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  Button,
  Image
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
        <Image
          style={{width: 375, height: 200}}
          source={{uri: 'https://unsplash.it/375/200?random'}}
        />
        <Text>
          Welcome {this.props.guestUsername}
        </Text>
        <Text>
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
    );
  }
}

export default AuthView;