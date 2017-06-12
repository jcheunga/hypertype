import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions
} from 'react-native';

import app from '../../feathers';
import { countdownToSeconds } from '../../utils/Utils';

import MainContainer from '../../styles/MainContainer';
import BodyContainer from '../../styles/BodyContainer';

import FormTextInput from '../../styles/FormTextInput';

const window = Dimensions.get('window');

class TyperaceView extends Component {
  static displayName = 'TyperaceView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  constructor (props) {
    super(props)

    this.textToType = this.props.quoteToType;
    this.words = this.textToType.split(" ");
    this.letterCount = this.textToType.split(" ").join("").length;
    this.wordCount = this.textToType.split(" ").length;

    this.state = {
      currentWord: 0,
      currentString: "",
      currentLetter: 0,
      inputText: "",
      characterCount: this.words[0].length,
      room: props.roomJoined,
      wpm: 0,
      typingError: false
    };

    this._listenToRoom();
  }

  _listenToRoom = () => { // PATCH WITH WPM
    app.service(this.props.serviceType).on('patched', this._handleListenToRoom);
  }

  _handleListenToRoom = (response) => {
    this.setState({
      room: response
    });
  }

  _registerTypeSpeed = () => {
    // WPM = (characters / 5) / min
    const timeElapsed = countdownToSeconds(this.props.gameStartTime) / 60;
    const characterCount = this.state.characterCount >=5 ? this.state.characterCount : 5;
    const wpm = Math.round((characterCount / 5) / timeElapsed);
    this.setState({
      wpm: wpm
    });
    const usernames = this.props.user !== null ? this.props.user.usernames : this.props.guestUsername;
    const room = this.state.room;
    const roomId = room._id;
    const patchedPlayerList = room.playerList;
    for (let i = 0; i < patchedPlayerList.length; i++) {
      if (patchedPlayerList[i].playerId === usernames) {
        patchedPlayerList[i].wpm = this.state.wpm;
      }
    }
    app.service(this.props.serviceType).patch(roomId, {
      playerList: patchedPlayerList
    });
  }

  _registerGameFinish = () => {
    const user = this.props.user;
    const usernames = user !== null ? user.usernames : this.props.guestUsername;
    const room = this.state.room;
    const roomId = room._id;
    const patchedPlayerList = room.playerList;
    for (let i = 0; i < patchedPlayerList.length; i++) {
      if (patchedPlayerList[i].playerId === usernames) {
        patchedPlayerList[i].completed = true;
      }
    }
    app.service(this.props.serviceType).patch(roomId, {
      playerList: patchedPlayerList
    });

    app.service("highscores").create({
      gameId: room.gameId,
      wpm: this.state.wpm,
      playerName: usernames,
      quote: room.quoteToType
    });

    if (user !== null) {
      const userId = user._id;
      const userHighscores = user.highscores;
      const highscoreToAdd = {
        wpm: this.state.wpm,
        quote: room.quoteToType,
        gameId: room.gameId
      };
      userHighscores.push(highscoreToAdd);
      app.service("users").patch(userId, {
        highscores: userHighscores
      });
    }
  }

  _letterColour = (wordNumber, letterNumber) => {
    if (wordNumber < this.state.currentWord || wordNumber === this.state.currentWord && this.state.inputText[0] === this.words[this.state.currentWord][0] && letterNumber <= this.state.currentLetter) {
      return '#43a047';
    } else if (wordNumber === this.state.currentWord && this.state.typingError) {
      return '#fe463c';
    } else {
      return '#212121';
    }
  }

  createLetters () {
    let splitStr = this.textToType.split(" ");
    let wordArr = [];

    for (let i = 0; i < splitStr.length; ++i) {
      let individualLetterArr = splitStr[i].split("");
      wordArr.push(individualLetterArr);
    }

    return wordArr.map((word, i) => {
      return (
        <Text style={{color: '#212121', marginRight: 4, fontSize: 18}} key={i} word={i}>
          {
            word.map((letter , j) => {
              return (
                <Text
                  style={{color: this._letterColour(i, j)}}
                  key={j}
                  letter={j}>
                  {letter}
                </Text>
              )
            })
          }
        </Text>
      )
    })
  }

  onTextInput (text) {

    this.setState({
      inputText: text
    });

    if (this.state.currentWord < this.wordCount) {

      if (text.length === 0) {
        this.setState({
          typingError: false
        });
      }

      // LETTER AND CORRECT WORD
      for (let i = 0; i < text.length; i++) {
        if (this.words[this.state.currentWord][i] === text[i]) {
          this.setState({
            typingError: false,
            currentLetter: i
          });
        } else {
          this.setState({
            typingError: true
          });
          break;
        }
      }

      // FINISH GAME AFTER LAST CORRECT WORD
      if (this.state.currentWord === this.wordCount - 1 && text === this.words[this.wordCount - 1] ) {
        this._registerTypeSpeed();
        this.setState({
          typingError: false,
          inputText: ""
        });
        this._registerGameFinish();
        this.props.finishTyping();
      }

      // SPACE AND CORRECT WORD
      if (text.length === this.words[this.state.currentWord].length + 1 && text.substring(this.words[this.state.currentWord].length, this.words[this.state.currentWord].length + 1) === " " && text.trim() === this.words[this.state.currentWord]) {

        this._registerTypeSpeed();

        if (text.trim().length === this.words[this.state.currentWord].length) {
          this.setState({
            currentWord: this.state.currentWord + 1,
            currentLetter: 0,
            inputText: "",
            characterCount: this.state.characterCount + this.words[this.state.currentWord + 1].length,
            typingError: false
          });
        }
      }

    }

    // this._registerTypeSpeed();

  }

  componentWillUnmount () {
    app.service(this.props.serviceType).removeListener('patched', this._handleListenToRoom);
  }

  render() {
    return (
      <MainContainer>
        <BodyContainer>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 15}}>
            <Text style={{fontSize: 14, color: '#616161'}}>wpm</Text>
            <Text style={{fontSize: 26, fontWeight: '600', color: '#263238', marginLeft: 10}}>{this.state.wpm}</Text>
          </View>
          <View style={{flexWrap: 'wrap', flexDirection: 'row', marginBottom: 20}}>
            {this.createLetters()}
          </View>
          <FormTextInput
            underlineColorAndroid='transparent'
            autoCapitalize="none" // IOS NONE ANDROID AUTO
            style={{backgroundColor: this.state.typingError ? '#fe463c' : '#f5f8fa', color: this.state.typingError ? '#ffffff' : '#616161'}}
            ref='typeit'
            onChangeText={(text) => this.onTextInput(text)}
            value={this.state.inputText}
            autoCorrect={false}
            autoFocus={true}
          />
        </BodyContainer>
      </MainContainer>
    );
  }
}

export default TyperaceView;