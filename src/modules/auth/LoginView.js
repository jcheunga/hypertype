import React, {Component} from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';

const window = Dimensions.get('window');

import FormTextInput from '../../styles/FormTextInput';
import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

import ErrorText from '../../styles/ErrorText';

class LoginView extends Component {
  static displayName = 'LoginView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      usernameEntered: null,
      passwordEntered: null
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
    if (this.state.usernameEntered && this.state.passwordEntered) {
      const userData = {
        usernames: this.state.username,
        password: this.state.password
      };
      this.props.authStateActions.authenticateAccount(userData);
    }
  }

  focusNextField = (nextField) => {
    this.refs[nextField].root.focus();
  }

  render() {
    return (
      <View>
        <FormTextInput
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          placeholder='Username'
          returnKeyType = 'next'
          autoCorrect={false}
          value={this.state.username}
          onChangeText={this._handleUsernameChange}
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <FormTextInput
          ref='2'
          underlineColorAndroid='transparent'
          autoCapitalize='none'
          secureTextEntry={true}
          placeholder='Password'
          returnKeyType='done'
          autoCorrect={false}
          value={this.state.password}
          onChangeText={this._handlePasswordChange}
        />

        { this.props.errorMessage ? <ErrorText>This is test error text</ErrorText> : null}

        <FormButton
          onPress={() => this._loginAccount()}>
          { this.props.isAuthenticating ? <ActivityIndicator style={{marginRight: 10}} color="#ffffff"/> : null}
          <FormButtonText>
            Login
          </FormButtonText>
        </FormButton>
      </View>
    );
  }
}

export default LoginView;