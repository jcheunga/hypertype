import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';

const window = Dimensions.get('window');

import BodyContainer from '../../styles/BodyContainer';

import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

import ScoreContainer from '../../styles/ScoreContainer';
import ScoreHeader from '../../styles/ScoreHeader';
import ScoreListItem from '../../styles/ScoreListItem';
import ScoreListText from '../../styles/ScoreListText';

import LobbyHeader from '../../styles/LobbyHeader';

import { sortMapResponse } from '../../utils/Utils';

class UserProfileView extends React.PureComponent {
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
    if (this.props.user.highscores.length > 0) {
      let scores = sortMapResponse(this.props.user.highscores);
      return scores.map((highscore, index) => {
        return (
          highscore.wpm !== 0
          ?
          <ScoreListItem key={index}>
            <ScoreListText>{highscore.gameId}</ScoreListText>
            <ScoreListText>{highscore.wpm}</ScoreListText>
          </ScoreListItem>
          :
          null
        );
      });
    } else {
      return (
        <Text style={{marginTop: 10}}>Start Playing!</Text>
      );
    }
  }

  _showUserName = () => {
    return this.props.user.usernames[0].toUpperCase() + this.props.user.usernames.substring(1);
  }

  render() {
    return (
      <BodyContainer>
        <View style={{alignItems: 'center', marginBottom: 30}}>
          <Image
            style={{height: 100,borderRadius: 50, width: 100, marginBottom: 20}}
            source={require('../../assets/images/avatar.png')}
          />
          <Text style={{fontSize: 22, fontWeight: '600', marginBottom: 10, color: '#0073cd'}}>
            Welcome {this._showUserName()}!
          </Text>
          <Text style={{fontSize: 14}}>
            User since: {this.props.user.createdAt.slice(0,10)}
          </Text>
        </View>

        <LobbyHeader>
          my Highscores
        </LobbyHeader>

        <ScoreContainer>
          <ScoreHeader>
            <ScoreListText head>Game ID</ScoreListText>
            <ScoreListText head>WPM</ScoreListText>
          </ScoreHeader>
          {this._showScores()}
        </ScoreContainer>

        <FormButton
          onPress={() => this._logoutAccount()}>
          { this.props.isLoggingOut ? <ActivityIndicator style={{marginRight: 10}} color="#ffffff"/> : null}
          <FormButtonText>
            Logout
          </FormButtonText>
        </FormButton>
      </BodyContainer>
    );
  }
}

export default UserProfileView;