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
import FloatingContainer from '../../styles/FloatingContainer';
import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

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
          <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{highscore.playerName}</Text>
            <Text>{highscore.wpm}</Text>
          </View>
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
      <MainContainer blue style={{justifyContent: 'center', alignItems: 'center'}}>
        <FloatingContainer first style={{width:window.width - 40, flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 24, fontWeight: '600', color:'#101010', marginTop: 40, marginBottom: 40}}>
              Highscores
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: '#101010',marginBottom: 5, paddingBottom: 5}}>
            <Text style={{fontWeight: '600'}}>Player ID</Text>
            <Text style={{fontWeight: '600'}}>WPM</Text>
          </View>
          {this._showScores()}
          {this._showLoading()}
          {this._showError()}
        </FloatingContainer>
      </MainContainer>
    );
  }
}

export default HighscoreView;