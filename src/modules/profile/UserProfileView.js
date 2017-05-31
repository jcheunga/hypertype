import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Button
} from 'react-native';

const window = Dimensions.get('window');

import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

import BodyContainer from '../../styles/BodyContainer';

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
      <View style={{backgroundColor: 'red', margin: 15, flex: 1}}>
        <Text>
          My Highscores
        </Text>
        <View>
          {this._showScores()}
        </View>
        <FormButton
          onPress={() => this._logoutAccount()}>
          <FormButtonText>Logout</FormButtonText>
        </FormButton>
      </View>
    );
  }
}

export default UserProfileView;