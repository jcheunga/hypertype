import React from 'react';
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

class LoginView extends React.PureComponent {
  static displayName = 'LoginView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      usernameEntered: null,
      passwordEntered: null,
      typing: false,
    };
  }

  _handleUsernameChange = (text) => {
    this.setState({
      username: text,
      usernameEntered: true,
      typing: true
    });
  }

  _handlePasswordChange = (text) => {
    this.setState({
      password: text,
      passwordEntered: true,
      typing: true
    });
  }

  _loginAccount = () => {
    if (this.state.username.trim().length === 0) {
      this.setState({
        usernameEntered: false,
        typing: false
      });
    }

    if (this.state.password.trim().length === 0) {
      this.setState({
        passwordEntered: false,
        typing: false
      });
    }

    if (this.state.username.trim().length > 0 && this.state.password.trim().length > 0) {
      this.setState({
        typing: false
      });
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

  _parseErrorMessage = () => {
    if (this.props.errorMessage.message) {
      let errorMessage = this.props.errorMessage.message;

      if (errorMessage.toLowerCase().indexOf("time") !== -1) {
        return "Timed out";
      }

      return "Username or password is incorrect";
    }
  }

  render() {
    return (
      <View>
        <FormTextInput
          style={{borderColor: this.state.usernameEntered === false ? '#fe463c' : '#e7e7e7'}}
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
          style={{borderColor: this.state.passwordEntered === false ? '#fe463c' : '#e7e7e7'}}
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

        { this.props.errorMessage && !this.state.typing && this.state.username.trim().length > 0 && this.state.password.trim().length > 0 ? <ErrorText>{this._parseErrorMessage()}</ErrorText> : null}

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