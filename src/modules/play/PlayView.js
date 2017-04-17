import * as theme from '../../utils/theme';
import Button from '../../components/Button';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

class PlayView extends Component {
  static displayName = 'PlayView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    // this.props.playStateActions.leaveGame();  
  }

  quickPlay = () => {
    this.props.playStateActions.findGame("1234ABCDE", this.props.inGame); // Get id from user or random guest name
  }

  multiPlay = () => {
    this.props.navigationStateActions.pushRoute({
      key: 'Multiplay',
      title: 'Multiplay'
    })
  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Image 
            style={{width: 50, height: 50}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          />
          <Text>WELCOME TO TYPESPRINT</Text>
          <Button
            text="Quick play"
            buttonStyle={theme.buttons.primary}
            textStyle={theme.fonts.primary}
            action={() => this.quickPlay()}
          />
          <Button
            text="Multi play"
            buttonStyle={theme.buttons.primary}
            textStyle={theme.fonts.primary}
            action={() => this.multiPlay()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center'
  },
  cityCard: {
    flex: 1,
    overflow: 'hidden',
    width: window.width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  image: {
    height: 180,
    width: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: theme.colors.tab
  },
  title: {
    marginTop: 20
  },
  pageIndicator: {
    marginBottom: 20
  },
  buttonsContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center'
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: theme.colors.spinner
  }
});

export default PlayView;