import React, {Component} from 'react';
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

class UserProfileView extends Component {
  static displayName = 'UserProfileView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  _logoutAccount = () => {
    this.props.authStateActions.logoutAccount();
  }

  _deleteAccount = () => {
    this.props.authStateActions.deleteAccount();
  }

  _showScores = () => {
    const scores = this.props.user.highscores;
    if (scores.length > 0) {
      return scores.map((highscore, index) => {
        return (
          <Text key={index}>{highscore.gameId}: {highscore.wpm}</Text>
        );
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.bodyText}>
            Welcome {this.props.user.usernames}!
          </Text>
          <Text style={styles.bodyText}>
            {this.props.user.createdAt}
          </Text>
          <Text style={styles.bodyText}>
            My Highscores
          </Text>
          <View>{this._showScores()}</View>
          <Button
            title="Logout"
            onPress={() => this._logoutAccount()}
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

export default UserProfileView;