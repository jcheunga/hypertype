import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button
} from 'react-native';

import LobbyViewContainer from '../lobby/LobbyViewContainer';
import app from '../../feathers';

import MainContainer from '../../styles/MainContainer';
import BodyContainer from '../../styles/BodyContainer';
import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

import TextBackButtonContainer from '../../components/TextBackButtonContainer';

const window = Dimensions.get('window');

class CreateGameView extends Component {
  static displayName = 'CreateGameView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      room: props.roomJoined
    };
    this._gameStartListen();
  }

  _gameStartListen = () => {
    app.service("multirooms").on("patched", this._handleGamePatched)
  }

  _handleGamePatched = (response) => {
    this.setState({
      room: response
    });
  }

  componentWillUnmount () {
    app.service("multirooms").removeListener("patched", this._handleGamePatched);
  }

  render() {
    const showLobby = this.state.room ? <LobbyViewContainer roomJoined={this.state.room}/> : null;

    return (
      <MainContainer>
        <BodyContainer>
          <HeaderContainer>
            <HeaderContainerHeading>
              Create game
            </HeaderContainerHeading>
            <HeaderContainerSubHeading>
              Share the game id to join your game
            </HeaderContainerSubHeading>
          </HeaderContainer>

          <GameIdContainer>
            Game id: {this.props.gameId}
          </GameIdContainer>

          <View>
            {showLobby}
          </View>
          <FormButton
            onPress={() => this.props.startGame()}>
            <FormButtonText>
              Start game
            </FormButtonText>
          </FormButton>

          <TextBackButtonContainer
            onPress={this.props.resetView}
            buttonText='Back to mutliplayer menu'
          />
        </BodyContainer>
      </MainContainer>
    );
  }
}

export default CreateGameView;