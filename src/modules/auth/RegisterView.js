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

class RegisterView extends Component {
  static displayName = 'RegisterView';

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
      email: "",
      password: ""
    };
  }

  _handleUsernameChange = (text) => {
    this.setState({
      username: text
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
    const userData = {
      usernames: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props.authStateActions.registerAccount(userData);
  }

  render() {
    return (
      <View>
        <FormTextInput
          placeholder='Email'
          autoCorrect={false}
          autoCapitalize='none'
          keyBoardType='email-address'
          returnKeyType='next'
          value={this.state.email}
          onChangeText={this._handleEmailChange}
        />
        <FormTextInput
          placeholder='Username'
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='next'
          value={this.state.username}
          onChangeText={this._handleUsernameChange}
        />
        <FormTextInput
          secureTextEntry={true}
          placeholder='Password'
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='send'
          value={this.state.password}
          onChangeText={this._handlePasswordChange}
        />
        <FormButton
          onPress={() => this._registerAccount()}>
          <FormButtonText>Register</FormButtonText>
        </FormButton>
      </View>
    );
  }
}

export default RegisterView;