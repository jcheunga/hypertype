import React from 'react';
import {
  Dimensions,
  ActivityIndicator
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

import GameIdContainer from '../../styles/GameIdContainer';
import GameIdText from '../../styles/GameIdText';

const window = Dimensions.get('window');

class CreateGameView extends React.PureComponent {
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
    app.service("multirooms").on('patched', this._handleGamePatched)
  }

  _handleGamePatched = (response) => {
    if (response._id === this.state.room._id) {
      this.setState({
        room: response
      });
    }
  }

  componentWillUnmount () {
    app.service("multirooms").removeListener("patched", this._handleGamePatched);
  }

  render() {
    const showLobby = this.state.room ? <LobbyViewContainer lobbyName='Lobby' roomJoined={this.state.room}/> : null;

    return (
      <MainContainer>
        <BodyContainer>
          <TextBackButtonContainer
            onPress={this.props.resetView}
          />
          <HeaderContainer>
            <HeaderContainerHeading>
              Create game
            </HeaderContainerHeading>
            <HeaderContainerSubHeading>
              Share the Game ID for friends to join
            </HeaderContainerSubHeading>
          </HeaderContainer>

          <GameIdContainer>
            <GameIdText>Game ID: #{this.props.gameId}</GameIdText>
          </GameIdContainer>

          {showLobby}

          <FormButton
            onPress={() => this.props.startGame()}>
            { this.props.isStarting ? <ActivityIndicator style={{marginRight: 10}} color="#ffffff"/> : null}
            <FormButtonText>
              Start game
            </FormButtonText>
          </FormButton>
        </BodyContainer>
      </MainContainer>
    );
  }
}

export default CreateGameView;