import * as theme from '../../utils/theme';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions
} from 'react-native';

import CountdownScreen from '../../components/CountdownScreen';
import TypeScreen from '../../components/TypeScreen';
import ScoreScreen from '../../components/ScoreScreen';

const window = Dimensions.get('window');

class TypeView extends Component {
  static displayName = 'TypeView';
  static propTypes = {
    countdownTime: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props)
    this.countdownTime = (this.props.gameEndTime - Date.now()) / 1000;

    this.state = {
      countdownTime: 3,
      countdownView: true,      
      typingView: false,
      finishedTypingView: false
    };
  }

  componentWillMount () {
    if (!this.props.gameId || !this.props.inGame) {
      this.props.navigationStateActions.popRoute();
    }
  }

  componentDidMount () {
    this.countInterval = setInterval(() => {
      if (this.state.countdownTime === 0) {
        this.setState({
          countdownView: false,
          typingView: true
        })     
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
    this.props.playStateActions.leaveGame();    
    this.props.navigationStateActions.popRoute();
  }

  finishTyping = () => {
    this.setState({
      typingView: false,
      finishedTypingView: true
    });
  }

  render () {   
    const showCountdownView = this.state.countdownView ?
      <CountdownScreen countdownTime={this.state.countdownTime}/>
    : null;

    const showTypingView = this.state.typingView ?
      <TypeScreen quoteToType={this.props.quoteToType} finishTyping={this.finishTyping}/>
    : null;

    const showfinishedTypingView = this.state.finishedTypingView ?
      <ScoreScreen />
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
    backgroundColor: theme.colors.background
  }
});

export default TypeView;