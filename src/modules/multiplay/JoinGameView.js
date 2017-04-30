import * as theme from '../../utils/theme';
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
    // console.log(nextProps);
    if (nextProps.isStarted && this.props.isJoined) {
      console.log("should be navigating but why not?")
      // this.props.multiplayStateActions.startGameForJoins(this.props.gameId);
      // this.props.navigationStateActions.back();
      this.props.navigationStateActions.navigate({
          routeName: 'MultiplayTypeView'
        })
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
          <TextInput onChange={(e) => this.handleIdInput(e)} value={this.state.enteredGameId} style={{width: 100}}/>
          <Button
            title="Join game"
            onPress={() => this.props.joinGameWithId(this.state.enteredGameId)}
          />
          <Text style={styles.bodyText}>
            Joining - Joined - Players in game {this.props.gameId}
          </Text>
          <Button
            title="Return to mutliplayer menu"
            onPress={() => this.props.resetView()}
          />
          <Button
            title="Mess with props"
            onPress={() => this.props.messWithProps()}
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