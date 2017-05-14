import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';


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
    };
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
        <Text style={{color: 'white'}}>Current Word: {this.state.currentWord + 1}</Text>
        <Text style={{color: 'white'}}>Current Letter: {this.state.currentLetter + 1}</Text>
        <Text style={{color: 'white'}}>Input Text: {this.state.inputText}</Text>
        <Text style={{marginBottom: 10, color: 'white'}}>Finished: {this.state.finishedTyping ? 'True' : 'False'}</Text>
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