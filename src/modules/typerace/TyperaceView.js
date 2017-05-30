import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import app from '../../feathers';
import { countdownToSeconds } from '../../utils/Utils';

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
      wpm: 0
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
    // console.log(timeElapsed);
    const characterCount = this.state.characterCount >=5 ? this.state.characterCount : 5;
    // console.log(characterCount);
    const wpm = Math.round((characterCount / 5) / timeElapsed);
    // console.log(wpm);
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

  createLetters () {
    var splitStr = this.textToType.split(" ");
    var wordArr = [];

    for (var i = 0; i < splitStr.length; ++i) {
      var individualLetterArr = splitStr[i].split("");
      wordArr.push(individualLetterArr);
    }

    return wordArr.map(function(word, i) {
      return (
        <Text style={{color: 'blue', marginRight: 4}} key={i} word={i}>
          {
            word.map(function(letter , j) {
              return (
                <Text key={j} letter={j}>{letter}</Text>
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

      // LETTER AND CORRECT WORD
      for (let i = 0; i < text.length; i++) {
        if (this.words[this.state.currentWord][i] === text[i]) {
          this.setState({
            currentLetter: i
          });
        } else {
          break;
        }
      }

      // FINISH GAME AFTER LAST CORRECT WORD
      if (this.state.currentWord === this.wordCount - 1 && text === this.words[this.wordCount - 1] ) {
        this._registerTypeSpeed();
        this.setState({
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
            characterCount: this.state.characterCount + this.words[this.state.currentWord + 1].length
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
      <View style={styles.container}>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row',}}>
          {this.createLetters()}
        </View>
        <TextInput
          autoCapitalize="none"
          style={{height: 40}}
          ref='typeit'
          onChangeText={(text) => this.onTextInput(text)}
          value={this.state.inputText}
          autoCorrect={false}
          autoFocus={true}
        />
        <Text style={{color: 'red'}}>Current Word: {this.state.currentWord + 1}</Text>
        <Text style={{color: 'red'}}>Current Letter: {this.state.currentLetter + 1}</Text>
        <Text style={{color: 'red'}}>Current WPM: {this.state.wpm}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf8fd'
  }
});

export default TyperaceView;