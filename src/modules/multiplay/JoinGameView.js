
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

import LobbyViewContainer from '../lobby/LobbyViewContainer';
import app from '../../feathers';

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
            playerId: this.props.user ? this.props.user.usernames : this.props.guestUsername
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

  render() {
    const showLobby = this.state.room ? <LobbyViewContainer roomJoined={this.state.room}/> : null;

    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            Enter in game id to join game
          </Text>
          <TextInput
            autoCapitalize='none'
            editable={!this.state.gameJoined}
            onChange={(e) => this.handleIdInput(e)}
            value={this.state.enteredGameId}
            style={{width: 100}}
          />
          <Button
            title="Join game"
            onPress={() => this.props.joinGameWithId(this.state.enteredGameId, this.state.gameJoined)}
          />
          <Text style={styles.bodyText}>
            {this.props.isJoining ? "Joining" : null}
          </Text>
          <Text style={styles.bodyText}>
            {this.props.isStarting ? "Starting" : null}
          </Text>
          <Text style={styles.bodyText}>
            Game ID: { this.state.room.gameId ? this.state.room.gameId : null}
          </Text>
          {showLobby}
          <Button
            title="Return to mutliplayer menu"
            onPress={() => this.props.resetView()}
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
});

export default JoinGameView;