import React, {Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import LobbyViewContainer from '../lobby/LobbyViewContainer';
import app from '../../feathers';

import MainContainer from '../../styles/MainContainer';
import BodyContainer from '../../styles/BodyContainer';
import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';
import FormTextInput from '../../styles/FormTextInput';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

class ScoreView extends Component {
  static displayName = 'ScoreView';

  constructor(props) {
    super(props);

    this.state = {
      room: props.roomJoined
    };

    this._listenToRoom();
  }

  _listenToRoom = () => { // SORT BY COMPLETED TRUE AND WPM
    app.service(this.props.serviceType).on('patched', this._handleListenToRoom);
  }

  _handleListenToRoom = (response) => {
    this.setState({
      room: response
    });
  }

  _leaveGame = () => {
    this.props.leaveGame();
  }

  componentWillUnmount () {
    app.service(this.props.serviceType).removeListener('patched', this._handleListenToRoom);
  }

  render() {
    const showLobby = this.state.room ? <LobbyViewContainer lobbyName='Player List' roomJoined={this.state.room} showScore={true}/> : null;

    return (
      <MainContainer>
        <BodyContainer>
          <HeaderContainer>
            <HeaderContainerHeading>
              You placed 1st!
            </HeaderContainerHeading>
          </HeaderContainer>

          <View>
            <Text style={{color: 'red'}}>{this.props.quoteToType}</Text>
            <Text style={{color: 'red'}}>{this.props.quoteAffLink}</Text>
          </View>

          {showLobby}

          <FormButton
            onPress={() => this.props.startNewQuickGame()}>
            <FormButtonText>
              Play again?
            </FormButtonText>
          </FormButton>

          <FormButton
            light
            onPress={() => this._leaveGame()}>
            <FormButtonText
              light>
              Back to main menu
            </FormButtonText>
          </FormButton>
        </BodyContainer>
      </MainContainer>
    );
  }
}

export default ScoreView;