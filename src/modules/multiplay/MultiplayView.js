
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button
} from 'react-native';
import CreateGameView from './CreateGameView';
import JoinGameView from './JoinGameView';

const window = Dimensions.get('window');

class MultiplayView extends Component {
  static displayName = 'MultiplayView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      multiplayView: true,
      createGameView: false,
      joinGameView: false
    }
  }

  componentWillMount () {
    // console.log(this.props.gameId);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isCreated) {
      this.setState({
        multiplayView: false,
        createGameView: true
      });
    }
  }

  createGame = () => {
    let user = this.props.user ? this.props.user : {usernames: this.props.guestUsername};
    this.props.multiplayStateActions.createGame(this.props.inGame, user);
  }

  startGame = () => {
    this.props.multiplayStateActions.startGame(this.props.gameId, this.props.roomJoined);
  }

  joinGame = () => {
    this.setState({
      multiplayView: false,
      joinGameView: true
    });
  }

  joinGameWithId = (enteredGameId) => {
    let user = this.props.user ? this.props.user : {usernames: this.props.guestUsername};
    this.props.multiplayStateActions.joinGame(enteredGameId, this.props.inGame, user);
  }

  resetView = () => {
    this.props.multiplayStateActions.leaveGame();
    this.setState({
      multiplayView: true,
      createGameView: false,
      joinGameView: false
    });
  }

  gotoMainMenu = () => {
    this.props.navigationStateActions.back();
  }

  render() {
    const showMultiplayView = this.state.multiplayView ?
      <View>
        <Text>{this.props.isCreating ? "Creating game..." : null}</Text>
        <Button
          title="Create game"
          onPress={() => this.createGame()}
        />
        <Button
          title="Join game"
          onPress={() => this.joinGame()}
        />
        <Button
          title="Back to main menu"
          onPress={() => this.gotoMainMenu()}
        />
      </View>
    : null;

    const showCreateGameView = this.state.createGameView ?
    <CreateGameView {...this.props} startGame={this.startGame} resetView={this.resetView}/>
    : null;

    const showJoinGameView = this.state.joinGameView ?
    <JoinGameView {...this.props} resetView={this.resetView} joinGameWithId={this.joinGameWithId}/>
    : null;

    return (
      <View style={styles.container}>
        {showMultiplayView}
        {showCreateGameView}
        {showJoinGameView}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf8fd',
    justifyContent: 'center'
  },
  cityCard: {
    flex: 1,
    overflow: 'hidden',
    width: window.width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  title: {
    marginTop: 20
  },
  pageIndicator: {
    marginBottom: 20
  },
  buttonsContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center'
  }
});

export default MultiplayView;