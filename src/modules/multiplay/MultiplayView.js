import * as theme from '../../utils/theme';
import Button from '../../components/Button';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import CreateGameView from './CreateGameView';
import JoinGameView from './JoinGameView';

const window = Dimensions.get('window');

class MultiplayView extends Component {
  static displayName = 'MultiplayView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      multiplayView: true,
      createGameView: false,
      joinGameView: false
    }
  }

  createGame = () => {
    this.setState({
      multiplayView: false,
      createGameView: true
    });
  }

  joinGame = () => {
    this.setState({      
      multiplayView: false,
      joinGameView: true
    });
  }

  resetView = () => {
    this.setState({
      multiplayView: true,
      createGameView: false,
      joinGameView: false
    });
  }

  render() { 
    const showMultiplayView = this.state.multiplayView ? 
      <View>
        <Text>Create game</Text>
        <Button
          text="Create game"
          buttonStyle={theme.buttons.primary}
          textStyle={theme.fonts.primary}
          action={() => this.createGame()}
        />
        <Text>Join game</Text>
        <Button
          text="Join game"
          buttonStyle={theme.buttons.primary}
          textStyle={theme.fonts.primary}
          action={() => this.joinGame()}
        />
      </View>
    : null;

    const showCreateGameView = this.state.createGameView ? 
    <CreateGameView resetView={this.resetView}/>
    : null;

    const showJoinGameView = this.state.joinGameView ? 
    <JoinGameView resetView={this.resetView}/>
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
    backgroundColor: theme.colors.background,
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
  image: {
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: theme.colors.tab
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
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: theme.colors.spinner
  }
});

export default MultiplayView;