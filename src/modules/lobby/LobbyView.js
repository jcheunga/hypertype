import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

import ScoreContainer from '../../styles/ScoreContainer';
import ScoreHeader from '../../styles/ScoreHeader';
import ScoreListItem from '../../styles/ScoreListItem';
import ScoreListText from '../../styles/ScoreListText';

import LobbyHeader from '../../styles/LobbyHeader';

import { sortMapResponse } from '../../utils/Utils';

class LobbyView extends Component {
  static displayName = 'LobbyView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  _renderPlayerList = () => {
    let playerList =  sortMapResponse(this.props.roomJoined.playerList);

    return playerList.map((value, index) => {
      return(
        <ScoreListItem key={index}>
          <ScoreListText>{value.playerId}</ScoreListText>
          { this.props.showScore ? <ScoreListText>{value.wpm}</ScoreListText> : null}
        </ScoreListItem>
      );
    })
  }

  render() {
    return (
      <View>
        <LobbyHeader>
          {this.props.lobbyName ? this.props.lobbyName : 'Lobby'}
        </LobbyHeader>
        <ScoreContainer>
          <ScoreHeader>
            <ScoreListText head>Player ID</ScoreListText>
            { this.props.showScore ? <ScoreListText head>WPM</ScoreListText> : null}
          </ScoreHeader>
          {this._renderPlayerList()}
        </ScoreContainer>
      </View>
    );
  }
}

export default LobbyView;