import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Button,
  Image
} from 'react-native';

const window = Dimensions.get('window');

import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

import FloatingContainer from '../../styles/FloatingContainer';
import ListHeader from '../../styles/ListHeader';

class UserProfileView extends Component {
  static displayName = 'UserProfileView';

  static navigationOptions = {
    // header: {
    //   visible: false
    // }
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

  _showUserName = () => {
    return this.props.user.usernames[0].toUpperCase() + this.props.user.usernames.substring(1);
  }

  render() {
    console.log(this.props.user.createdAt)
    return (
      <View>
        <FloatingContainer first center>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{height: 100,borderRadius: 50, width: 100, marginBottom: 20}}
              source={{uri: 'https://placehold.it/100x100'}}
            />
            <Text style={{fontSize: 20, fontWeight: '600', marginBottom: 10}}>
              Welcome {this._showUserName()}!
            </Text>
            <Text style={{fontSize: 14, marginBottom: 20}}>
              User since: {this.props.user.createdAt.slice(0,10)}
            </Text>
            <FormButton
              onPress={() => this._logoutAccount()}>
              <FormButtonText>
                Logout
              </FormButtonText>
            </FormButton>
          </View>
        </FloatingContainer>

        <FloatingContainer>
          <ListHeader>
            My Highscores
          </ListHeader>
          <View>
            {this._showScores()}
          </View>
        </FloatingContainer>
      </View>
    );
  }
}

export default UserProfileView;