import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
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
      <View>
        <Text>
          Welcome {this.props.user.usernames}!
        </Text>
        <Text>
          {this.props.user.createdAt}
        </Text>
        <Text>
          My Highscores
        </Text>
        <View>
          {this._showScores()}
        </View>
        <Button
          title="Logout"
          onPress={() => this._logoutAccount()}
        />
      </View>
    );
  }
}

export default UserProfileView;