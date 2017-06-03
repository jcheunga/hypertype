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

import MainContainer from '../../styles/MainContainer';
import BodyContainer from '../../styles/BodyContainer';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

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
      <MainContainer>
        <BodyContainer>
          <HeaderContainer>
            <HeaderContainerHeading>
              Profile
            </HeaderContainerHeading>
            <HeaderContainerSubHeading>
              Login to save highscores and quotes!
            </HeaderContainerSubHeading>
          </HeaderContainer>

          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
            <Text
              style={{paddingRight: 10}}
              onPress={() => this._switchLoginView()}>
              Login
            </Text>
            <Text
              style={{paddingLeft: 10}}
              onPress={() => this._switchRegisterView()}>
              Register
            </Text>
          </View>
          <View>
            {this._showLoginView()}
            {this._showRegisterView()}
          </View>
          <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: '#14171a'}}>Terms of service</Text>
          </View>
        </BodyContainer>
      </MainContainer>
    );
  }
}

export default AuthView;