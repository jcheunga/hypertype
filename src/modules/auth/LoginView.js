import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  Button
} from 'react-native';

const window = Dimensions.get('window');

import FormTextInput from '../../styles/FormTextInput';
import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

class LoginView extends Component {
  static displayName = 'LoginView';

  static navigationOptions = {
    // header: {
    //   visible: false
    // }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  _handleUsernameChange = (text) => {
    this.setState({
      username: text
    });
  }

  _handlePasswordChange = (text) => {
    this.setState({
      password: text
    });
  }

  _loginAccount = () => {
    const userData = {
      usernames: this.state.username,
      password: this.state.password
    };
    this.props.authStateActions.authenticateAccount(userData);
  }

  render() {
    return (
      <View>
        <FormTextInput
          autoCapitalize='none'
          placeholder='Username'
          returnKeyType='next'
          value={this.state.username}
          onChangeText={this._handleUsernameChange}
        />
        <FormTextInput
          autoCapitalize='none'
          secureTextEntry={true}
          placeholder='Password'
          returnKeyType='send'
          value={this.state.password}
          onChangeText={this._handlePasswordChange}
        />
        <FormButton
          onPress={() => this._loginAccount()}>
          <FormButtonText>Login</FormButtonText>
        </FormButton>
      </View>
    );
  }
}

export default LoginView;