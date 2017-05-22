
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

import app from '../../feathers';

const window = Dimensions.get('window');

class JoinGameView extends Component {
  static displayName = 'JoinGameView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      enteredGameId: "",
      gameStarted: false,
      gameJoined: false
    };
    this.gameStartListen();
  }

  gameStartListen = () => {
    app.on("patched", this.handleGamePatched)
  }

  handleGamePatched = (response) => {
    console.log(response);
    if (response) {
      this.props.multiplayStateActions.startGameForJoins(this.props.gameId, this.props.roomJoined);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isJoined) {
      this.setState({
        gameJoined: true,
      })
    }

    // if (nextProps.joinGameStarted && this.state.gameJoined) {
    //   console.log("game will begin");
    //   this.props.multiplayStateActions.startGameForJoins(this.props.gameId, this.props.roomJoined);
    // }
    // console.log(nextProps);
    // if (nextProps.isStarted && this.props.isJoined) {
    //   console.log("should be navigating but why not?");
    //   // this.props.multiplayStateActions.startGameForJoins(this.props.gameId);
    //   // this.props.navigationStateActions.back();
    //   this.props.navigationStateActions.navigate({
    //       routeName: 'MultiplayTypeView'
    //     })
    // }
  }

  handleIdInput = (e) => {
    this.setState({
      enteredGameId: e.nativeEvent.text
    });
  }

  render() {
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
            onPress={() => this.props.joinGameWithId(this.state.enteredGameId)}
          />
          <Text style={styles.bodyText}>
            {this.props.isJoining ? "Joining" : this.props.roomJoined.gameId}
          </Text>
          <Text style={styles.bodyText}>
            {this.props.isStarting ? "Starting" : null}
          </Text>
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