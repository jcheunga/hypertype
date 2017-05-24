import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import app from '../../feathers';

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
      room: props.roomJoined
    };

    this._listenToRoom();
  }

  _listenToRoom = () => { // PATCH WITH WPM
    app.service(this.props.serviceType).on('patched', this._handleListenToRoom);
  }

  _handleListenToRoom = (response) => {
    console.log(response);
    this.setState({
      room: response
    });
  }

  _registerTypeSpeed = () => {
    const roomId = this.state.room._id;
    app.service(this.props.serviceType).patch(roomId, {
      ...room
    });
  }

  _registerGameFinish = () => {
    let user = user;
    const playerToChange = {
      playerId: user.usernames,
      gameCreator: false,
      wpm: 0, // PATCH THIS
      completed: false
    };
    const room = this.state.room;
    const roomId = room._id;
    const patchedplayerList = room.playerList;
    let matched = false;
    for (let i = 0; i < patchedplayerList.length; i++) {
      if (patchedplayerList[i].playerId === user.usernames) {
        matched = true;
        break;
      }
    }
    if (!matched) {
      patchedplayerList.push(playerToChange);
    }
    app.service(this.props.serviceType).patch(roomId, {
      playerList: patchedplayerList
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
        this.setState({
          inputText: ""
        });
        this.props.finishTyping();
      }

      // SPACE AND CORRECT WORD
      if (text.length === this.words[this.state.currentWord].length + 1 && text.substring(this.words[this.state.currentWord].length, this.words[this.state.currentWord].length + 1) === " " && text.trim() === this.words[this.state.currentWord]) {

        if (text.trim().length === this.words[this.state.currentWord].length) {
          this.setState({
            currentWord: this.state.currentWord + 1,
            currentLetter: 0,
            inputText: ""
          });
        }
      }

    }

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
          ref='typeit'
          onChangeText={(text) => this.onTextInput(text)}
          value={this.state.inputText}
          autoCorrect={false}
          autoFocus={true}
        />
        <Text style={{color: 'red'}}>Current Word: {this.state.currentWord + 1}</Text>
        <Text style={{color: 'red'}}>Current Letter: {this.state.currentLetter + 1}</Text>
        <Text style={{color: 'red'}}>Input Text: {this.state.inputText}</Text>
        <Text style={{marginBottom: 10, color: 'red'}}>Finished: {this.state.finishedTyping ? 'True' : 'False'}</Text>
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