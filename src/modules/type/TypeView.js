import * as theme from '../../utils/theme';
// import Button from '../../components/Button';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  Button,
  Text,
  View,
  ListView,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');

class TypeView extends Component {
  static displayName = 'TypeView';

  constructor (props) {
    super(props)
    this.textToType = "Hi there, how are you?";
    this.words = this.textToType.split(" ");
    this.letterCount = this.textToType.split(" ").join("").length;
    this.wordCount = this.textToType.split(" ").length;
    this.countInterval;

    this.state = {
      currentWord: 0,
      currentString: "",
      currentLetter: 0,
      inputText: "",
      countdownView: true,
      countdownTime: 3,
      typingView: false,
      finishedTypingView: false      
    };
  }

  componentDidMount () {
    this.countInterval = setInterval(() => {
      if (this.state.countdownTime === 0) {
        this.setState({
          countdownView: false,
          typingView: true
        })
        if (this.refs.typeit !== undefined) {
          this.refs.typeit.focus();
        }        
        clearInterval(this.countInterval);
      }
      if (this.state.countdownTime > 0) {
        this.setState({
          countdownTime: this.state.countdownTime - 1
        })
      }      
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.countInterval);
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
        <Text style={{color: 'white', marginRight: 4}} key={i} word={i}>
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
          typingView: false,
          finishedTypingView: true,
          inputText: ""
        });
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

  resetGame = () => {
    this.setState({
      currentWord: 0,
      currentString: "",
      currentLetter: 0,
      inputText: "",
      finishedTyping: false
    });
  };

  render () {   
    const showCountdownView = this.state.countdownView ?
      <View>
        <Text style={{color: 'white'}}>Countdown: {this.state.countdownTime}</Text>
      </View>
    : null;

    const showTypingView = this.state.typingView ?
      <View style={styles.container}>
        <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row',}}>
          {this.createLetters()}
        </View>
        <TextInput 
          ref='typeit'
          onChangeText={(text) => this.onTextInput(text)}
          value={this.state.inputText}
          autoCorrect={false}
        />
        <Text style={{color: 'white'}}>Current Word: {this.state.currentWord + 1}</Text>
        <Text style={{color: 'white'}}>Current Letter: {this.state.currentLetter + 1}</Text>
        <Text style={{color: 'white'}}>Input Text: {this.state.inputText}</Text>
        <Text style={{marginBottom: 10, color: 'white'}}>Finished: {this.state.finishedTyping ? 'True' : 'False'}</Text>
        <Button
          onPress={this.resetGame}
          title="Reset"
          color="red"
        />
      </View>
    : null;

    const showfinishedTypingView = this.state.finishedTypingView ?
      <View>
        <Text style={{color: 'white'}}>This quote was from link to AMZN</Text>
        <Text style={{color: 'white'}}>You placed 1st!</Text>
      </View>
    : null;

    return (
      <View style={styles.container}>
        { showCountdownView }
        { showTypingView }
        { showfinishedTypingView }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: theme.colors.background
  }
});

export default TypeView;