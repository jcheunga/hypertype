import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
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
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            Share the game id to join your game
          </Text>
          <Text style={styles.bodyText}>
            Game id: {this.props.gameId}
          </Text>
          <View>{showLobby}</View>
          <Button
            title="Start game"
            onPress={() => this.props.startGame()}
          />
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

export default CreateGameView;