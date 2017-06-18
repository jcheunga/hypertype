
import React, {Component} from 'react';
import {
  ActivityIndicator
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

import TextBackButtonContainer from '../../components/TextBackButtonContainer';

import GameIdContainer from '../../styles/GameIdContainer';
import GameIdText from '../../styles/GameIdText';

import ErrorText from '../../styles/ErrorText';

class JoinGameView extends Component {
  static displayName = 'JoinGameView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      enteredGameId: "",
      gameJoined: false,
      gameIdEntered: null,
      typing: false,
      room: {
        playerList: [
          {
            playerId: this.props.user !== null ? this.props.user.usernames : this.props.guestUsername
          }
        ]
      }
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
    if (response.gameStarted) {
      this.props.multiplayStateActions.startGameForJoins(this.state.room._id, this.state.room);
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.isJoined) {
  //     this.setState({
  //       gameJoined: true,
  //       room: nextProps.roomJoined
  //     })
  //   }
  // }

  handleIdInput = (e) => {
    this.setState({
      enteredGameId: e.nativeEvent.text,
      gameIdEntered: true,
      typing: true
    });
  }

  _handleIdSubmit = () => {
    if (this.state.enteredGameId.trim().length === 0) {
      this.setState({
        gameIdEntered: false,
        typing: false
      });
    }

    if (this.state.enteredGameId.trim().length > 0) {
      this.setState({
        typing: false
      });
      this.props.joinGameWithId(this.state.enteredGameId, this.state.gameJoined);
    }
  }

  _parseErrorMessage = () => {
    if (this.props.errorMessage.message) {
      let errorMessage = this.props.errorMessage.message;

      if (errorMessage.toLowerCase().indexOf("time") !== -1) {
        return "Timed out";
      }

      return errorMessage;
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
              Join game
            </HeaderContainerHeading>
            <HeaderContainerSubHeading>
              Enter in the Game ID to join
            </HeaderContainerSubHeading>
          </HeaderContainer>
          <FormTextInput
            style={{borderColor: this.state.gameIdEntered === false ? '#fe463c' : '#e7e7e7'}}
            underlineColorAndroid='transparent'
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Game ID'
            returnKeyType = 'done'
            editable={!this.state.gameJoined}
            onChange={(e) => this.handleIdInput(e)}
            value={this.state.enteredGameId}
            onKeyPress={(e => console.log(e.nativeEvent.key))}
          />

          { this.props.errorMessage && !this.state.gameJoined && !this.state.typing && this.state.enteredGameId.trim().length > 0 ? <ErrorText>{this._parseErrorMessage()}</ErrorText> : null}

          <FormButton
            onPress={() => this._handleIdSubmit()}>
            { this.props.isJoining ? <ActivityIndicator style={{marginRight: 10}} color="#ffffff"/> : null}
            <FormButtonText>
              Join game
            </FormButtonText>
          </FormButton>

          <GameIdContainer>
            <GameIdText>Game ID: #{ this.state.room.gameId ? this.state.room.gameId : null}</GameIdText>
          </GameIdContainer>

          {showLobby}

        </BodyContainer>
      </MainContainer>
    );
  }
}

export default JoinGameView;