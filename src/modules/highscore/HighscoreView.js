import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ActivityIndicator
} from 'react-native';

import app from '../../feathers';

const window = Dimensions.get('window');

import MainContainer from '../../styles/MainContainer';
import BodyContainer from '../../styles/BodyContainer';
import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

import ScoreContainer from '../../styles/ScoreContainer';
import ScoreHeader from '../../styles/ScoreHeader';
import ScoreListItem from '../../styles/ScoreListItem';
import ScoreListText from '../../styles/ScoreListText';

class HighscoreView extends Component {
  static displayName = 'HighscoreView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this._fetchScores();
    app.service("highscores").on("created", this._fetchScores);
  }

  _fetchScores = () => {
    this.props.highscoreStateActions.fetchScores();
  }

  _showScores = () => {
    if (this.props.scores.length > 0) {
      return this.props.scores.map((highscore, index) => {
        return (
          <ScoreListItem key={index}>
            <ScoreListText>{highscore.playerName}</ScoreListText>
            <ScoreListText>{highscore.wpm}</ScoreListText>
          </ScoreListItem>
        );
      });
    } else {
      return null;
    }
  }

  _showLoading = () => {
    if (this.props.isFetching) {
      return (
        <ActivityIndicator style={{alignSelf: 'center'}} />
      );
    }
  }

  _showError = () => {
    if (this.props.hasError || !this.props.isFetching && this.props.scores.length === 0) {
      return (
        <View>
          <Text>Error Loading...</Text>
          <FormButton
            onPress={() => this._fetchScores()}>
            <FormButtonText>
              Refresh
            </FormButtonText>
          </FormButton>
        </View>
      );
    }
  }

  componentWillUnmount () {
    app.service("highscores").removeListener("created", this._fetchScores);
  }

  render() {
    return (
      <MainContainer>
        <BodyContainer>

          <HeaderContainer>
            <HeaderContainerHeading>
              Highscores
            </HeaderContainerHeading>
            <HeaderContainerSubHeading>
              Global
            </HeaderContainerSubHeading>
          </HeaderContainer>

          <ScoreContainer>
            <ScoreHeader>
              <ScoreListText head>Player ID</ScoreListText>
              <ScoreListText head>WPM</ScoreListText>
            </ScoreHeader>
            {this._showScores()}
            {this._showLoading()}
            {this._showError()}
          </ScoreContainer>

        </BodyContainer>
      </MainContainer>
    );
  }
}

export default HighscoreView;