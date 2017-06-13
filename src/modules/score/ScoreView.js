import React, {Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import LobbyViewContainer from '../lobby/LobbyViewContainer';
import app from '../../feathers';

import MainContainer from '../../styles/MainContainer';
import BodyContainer from '../../styles/BodyContainer';
import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';
import FormTextInput from '../../styles/FormTextInput';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

import QuoteContainer from '../../styles/QuoteContainer';
import QuoteText from '../../styles/QuoteText';

import Icon from 'react-native-vector-icons/FontAwesome';

import { getOrdinalValue } from '../../utils/Utils';

class ScoreView extends Component {
  static displayName = 'ScoreView';

  constructor(props) {
    super(props);

    this.state = {
      room: props.roomJoined
    };

    this._listenToRoom();
  }

  _listenToRoom = () => { // SORT BY COMPLETED TRUE AND WPM
    app.service(this.props.serviceType).on('patched', this._handleListenToRoom);
  }

  _handleListenToRoom = (response) => {
    this.setState({
      room: response
    });
  }

  _leaveGame = () => {
    this.props.leaveGame();
  }

  componentWillUnmount () {
    app.service(this.props.serviceType).removeListener('patched', this._handleListenToRoom);
  }

  _showPlacing = () => {
    let user = this.props.user ? this.props.user : {usernames: this.props.guestUsername};
    return getOrdinalValue(this.state.room.playerList, user);
  }

  render() {
    const showLobby = this.state.room ? <LobbyViewContainer lobbyName='Player List' roomJoined={this.state.room} showScore={true}/> : null;

    return (
      <MainContainer>
        <BodyContainer>
          <HeaderContainer>
            <HeaderContainerHeading>
              You placed {this._showPlacing()}!
            </HeaderContainerHeading>
          </HeaderContainer>

          <QuoteContainer>
            <Icon
            name="quote-left"
            size={14}
            color='#263238'/>
            <QuoteText icon>
              {this.props.quoteToType}
            </QuoteText>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Icon
              name="quote-right"
              size={14}
              color='#263238'/>
            </View>
            <QuoteText>This quote was from 'The boy who cried wolf'</QuoteText>
          </QuoteContainer>

          {showLobby}

          {
            this.props.startNewQuickGame
            ?
            <FormButton
              onPress={() => this.props.startNewQuickGame()}>
              <FormButtonText>
                Play again?
              </FormButtonText>
            </FormButton>
            :
            null
          }

          <FormButton
            light
            onPress={() => this._leaveGame()}>
            <FormButtonText
              light>
              Back to main menu
            </FormButtonText>
          </FormButton>
        </BodyContainer>
      </MainContainer>
    );
  }
}

export default ScoreView;