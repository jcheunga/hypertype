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

class RegisterView extends Component {
  static displayName = 'RegisterView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      emailEntered: null,
      usernameEntered: null,
      passwordEntered: null,
      typing: false,
    };
  }

  // https://stackoverflow.com/questions/36147276/how-to-validate-textinput-values-in-react-native
  // https://stackoverflow.com/questions/33407665/disabling-buttons-on-react-native

  _handleEmailChange = (text) => {
    this.setState({
      email: text,
      emailEntered: true,
      typing: true
    });
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

  _registerAccount = () => {
    if (this.state.email.trim().length === 0) {
      this.setState({
        typing: false,
        emailEntered: false,
      });
    }

    if (this.state.username.trim().length === 0) {
      this.setState({
        typing: false,
        usernameEntered: false,
      });
    }

    if (this.state.password.trim().length === 0) {
      this.setState({
        typing: false,
        passwordEntered: false,
      });
    }

    if (this.state.email.trim().length > 0 && this.state.username.trim().length > 0 && this.state.password.trim().length > 0) {
      this.setState({
        typing: false,
      });
      const userData = {
        usernames: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      this.props.authStateActions.registerAccount(userData);
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

      if (errorMessage.toLowerCase().indexOf("usernames") !== -1) {
        return "Username already exists";
      }

      if (errorMessage.toLowerCase().indexOf("email") !== -1) {
        return "Email already exists";
      }

      return errorMessage;
    }
  }

  render() {
    return (
      <View>
        <FormTextInput
          style={{borderColor: this.state.emailEntered === false ? '#fe463c' : '#e7e7e7'}}
          underlineColorAndroid='transparent'
          placeholder='Email'
          autoCorrect={false}
          autoCapitalize='none'
          keyBoardType='email-address'
          returnKeyType='next'
          autoCorrect={false}
          value={this.state.email}
          onChangeText={this._handleEmailChange}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <FormTextInput
          style={{borderColor: this.state.usernameEntered === false ? '#fe463c' : '#e7e7e7'}}
          ref='2'
          underlineColorAndroid='transparent'
          placeholder='Username'
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='next'
          autoCorrect={false}
          value={this.state.username}
          onChangeText={this._handleUsernameChange}
          onSubmitEditing={() => this.focusNextField('3')}
        />
        <FormTextInput
          style={{borderColor: this.state.passwordEntered === false ? '#fe463c' : '#e7e7e7'}}
          ref='3'
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          placeholder='Password'
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='done'
          autoCorrect={false}
          value={this.state.password}
          onChangeText={this._handlePasswordChange}
        />

        { this.props.errorMessage && !this.state.typing && this.state.email.trim().length > 0 && this.state.username.trim().length > 0 && this.state.password.trim().length > 0 ? <ErrorText>{this._parseErrorMessage()}</ErrorText> : null}

        <FormButton
          onPress={() => this._registerAccount()}>
          { this.props.isRegistering ? <ActivityIndicator style={{marginRight: 10}} color="#ffffff"/> : null}
          <FormButtonText>
            Register
          </FormButtonText>
        </FormButton>
      </View>
    );
  }
}

export default RegisterView;