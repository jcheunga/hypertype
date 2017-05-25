
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

class LoginView extends Component {
  static displayName = 'LoginView';

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
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            Login
          </Text>
          <View>
            <TextInput
              autoCapitalize='none'
              style={styles.input}
              // autoFocus={true}
              placeholder='Username'
              returnKeyType='next'
              value={this.state.username}
              onChangeText={this._handleUsernameChange}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize='none'
              style={styles.input}
              secureTextEntry={true}
              placeholder='Password'
              returnKeyType='send'
              value={this.state.password}
              onChangeText={this._handlePasswordChange}
            />
          </View>
          <Button
            title="Login"
            onPress={() => this._loginAccount()}
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
    width: 100,
    height: 40
  }
});

export default LoginView;