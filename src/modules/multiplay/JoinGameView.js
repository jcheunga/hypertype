import * as theme from '../../utils/theme';
import Button from '../../components/Button';
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
  TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');

class JoinGameView extends Component {
  static displayName = 'JoinGameView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
      enteredGameId: ""
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isStarted && this.props.inGame) {
      console.log("game is started");
    }
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
          <TextInput onChange={(e) => this.handleIdInput(e)} value={this.state.enteredGameId.toUpperCase()} style={{width: 100}}/>
          <Button
            text="Join game"
            buttonStyle={theme.buttons.primary}
            textStyle={theme.fonts.primary}
            action={() => this.props.joinGameWithId(this.state.enteredGameId)}
          />
          <Text style={styles.bodyText}>
            Joining - Joined - Players in game {this.props.gameId}
          </Text>
          <Button
            text="Return to mutliplayer menu"
            buttonStyle={theme.buttons.primary}
            textStyle={theme.fonts.primary}
            action={() => this.props.resetView()}
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
    backgroundColor: theme.colors.background
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