import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  Button,
  Image,
  ScrollView
} from 'react-native';

import LoginView from './LoginView';
import RegisterView from './RegisterView';

const window = Dimensions.get('window');

import BodyContainer from '../../styles/BodyContainer';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

import AuthTabContainer from '../../styles/AuthTabContainer';
import AuthTabText from '../../styles/AuthTabText';

class AuthView extends Component {
  static displayName = 'AuthView';

  static navigationOptions = {
    // header: {
    //   visible: false
    // }
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
      <BodyContainer>
        <HeaderContainer>
          <HeaderContainerHeading>
            Profile
          </HeaderContainerHeading>
          <HeaderContainerSubHeading>
            {this.state.loginView ? 'Login' : 'Register'} to save highscores!
          </HeaderContainerSubHeading>
        </HeaderContainer>

        <AuthTabContainer>
          <AuthTabText
            selected={this.state.loginView}
            onPress={() => this._switchLoginView()}>
            Login
          </AuthTabText>
          <AuthTabText
            selected={this.state.registerView}
            onPress={() => this._switchRegisterView()}>
            Register
          </AuthTabText>
        </AuthTabContainer>

        <View>
          {this._showLoginView()}
          {this._showRegisterView()}
        </View>
        <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: '#263238', fontFamily: 'Poppins-Regular'}}>Terms of service</Text>
        </View>
      </BodyContainer>
    );
  }
}

export default AuthView;