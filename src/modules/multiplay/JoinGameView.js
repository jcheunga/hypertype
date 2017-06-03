
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
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
import FormTextInput from '../../styles/FormTextInput';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

import TextBackButtonContainer from '../../components/TextBackButtonContainer';

const window = Dimensions.get('window');

class JoinGameView extends Component {
  static displayName = 'JoinGameView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      enteredGameId: "",
      gameJoined: false,
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
    console.log("patch response");
    console.log(response);
    if (response.gameStarted) {
      // this.props.multiplayStateActions.startGameForJoins(this.props.gameId, this.props.roomJoined);
    }

    this.setState({
      room: response
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isJoined) {
      this.setState({
        gameJoined: true,
        room: nextProps.roomJoined
      })
    }
  }

  handleIdInput = (e) => {
    this.setState({
      enteredGameId: e.nativeEvent.text
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
              Join game
            </HeaderContainerHeading>
            <HeaderContainerSubHeading>
              Enter in game id to join game
            </HeaderContainerSubHeading>
          </HeaderContainer>
          <FormTextInput
            underlineColorAndroid='transparent'
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Game ID'
            returnKeyType = 'done'
            editable={!this.state.gameJoined}
            onChange={(e) => this.handleIdInput(e)}
            value={this.state.enteredGameId}
          />
          <FormButton
            onPress={() => this.props.joinGameWithId(this.state.enteredGameId, this.state.gameJoined)}>
            <FormButtonText>
              Join game
            </FormButtonText>
          </FormButton>
          <Text>
            {this.props.isJoining ? "Joining" : null}
          </Text>
          <Text>
            {this.props.isStarting ? "Starting" : null}
          </Text>
          <Text>
            Game ID: { this.state.room.gameId ? this.state.room.gameId : null}
          </Text>
          <View>
            {showLobby}
          </View>
          <TextBackButtonContainer
            onPress={this.props.resetView}
            buttonText='Back to mutliplayer menu'
          />
        </BodyContainer>
      </MainContainer>
    );
  }
}

export default JoinGameView;