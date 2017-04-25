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
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            Enter in game id to join game
          </Text>
          <TextInput style={{width: 100}}/>
          <Button
            text="Join game"
            buttonStyle={theme.buttons.primary}
            textStyle={theme.fonts.primary}
            action={() => this.props.joinGameWithId()}
          />
          <Text style={styles.bodyText}>
            Joining - Joined - Players in game
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