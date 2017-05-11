
import React, {PropTypes, Component} from 'react';
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

const window = Dimensions.get('window');

class CreateGameView extends Component {
  static displayName = 'CreateGameView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  componentWillMount () {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            Share the game id to join your game
          </Text>
          <Text style={styles.bodyText}>
            Game id: {this.props.gameId}
          </Text>
          <Text style={styles.bodyText}>
            Players in game
          </Text>
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