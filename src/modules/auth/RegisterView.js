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
      usernameEntered: null,
      emailEntered: null,
      passwordEntered: null
    };
  }

  _handleUsernameChange = (text) => {
    this.setState({
      username: text,
    });
  }

  _handleEmailChange = (text) => {
    this.setState({
      email: text
    });
  }

  _handlePasswordChange = (text) => {
    this.setState({
      password: text
    });
  }

  _registerAccount = () => {
    if (this.state.usernameEntered && this.state.emailEntered && this.state.passwordEntered) {
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

  render() {
    return (
      <View>
        <FormTextInput
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

        { this.props.errorMessage ? <ErrorText>This is test error text</ErrorText> : null}

        <FormButton
          onPress={() => this._registerAccount()}>
          { this.props.isRegistering ? <ActivityIndicator style={{marginRight: 10}}/> : null}
          <FormButtonText>
            Register
          </FormButtonText>
        </FormButton>
      </View>
    );
  }
}

export default RegisterView;