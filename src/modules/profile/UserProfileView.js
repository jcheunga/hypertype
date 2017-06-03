import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Button,
  Image,
  ScrollView
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
          <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{highscore.gameId}</Text>
            <Text>{highscore.wpm}</Text>
          </View>
        );
      });
    } else {
      return (
        <Text>Start Playing!</Text>
      );
    }
  }

  _showUserName = () => {
    return this.props.user.usernames[0].toUpperCase() + this.props.user.usernames.substring(1);
  }

  render() {
    return (
      <ScrollView>
        <FloatingContainer first>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{height: 100,borderRadius: 50, width: 100, marginBottom: 20}}
              source={{uri: 'https://placehold.it/100x100'}}
            />
            <Text style={{fontSize: 20, fontWeight: '600', marginBottom: 10, color: '#0073cd'}}>
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
          <View style={{alignItems: 'center'}}>
            <ListHeader>
              My Highscores
            </ListHeader>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: '#dbdbdb',marginBottom: 5, paddingBottom: 5}}>
            <Text style={{fontWeight: '600'}}>Game ID</Text>
            <Text style={{fontWeight: '600'}}>WPM</Text>
          </View>
          {this._showScores()}
        </FloatingContainer>
      </ScrollView>
    );
  }
}

export default UserProfileView;