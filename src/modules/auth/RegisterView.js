
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

class RegisterView extends Component {
  static displayName = 'RegisterView';

  static navigationOptions = {
    header: {
      visible: false
    }
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props.authStateActions.registerAccount(userData);
  }

  render() {
    return (
      <View>
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            Register
          </Text>
          <View>
            <TextInput
              style={styles.input}
              // autoFocus={true}
              placeholder='Email'
              autoCorrect={false}
              autoCapitalize='none'
              keyBoardType='email-address'
              returnKeyType='next'
              value={this.state.email}
              onChangeText={this._handleEmailChange}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder='Username'
              autoCorrect={false}
              autoCapitalize='none'
              returnKeyType='next'
              value={this.state.username}
              onChangeText={this._handleUsernameChange}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder='Password'
              autoCorrect={false}
              autoCapitalize='none'
              returnKeyType='send'
              value={this.state.password}
              onChangeText={this._handlePasswordChange}
            />
          </View>
          <Button
            title="Register"
            onPress={() => this._registerAccount()}
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

export default RegisterView;