import * as theme from '../../utils/theme';
import Button from '../../components/Button';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const window = Dimensions.get('window');

class PlayView extends Component {
  static displayName = 'PlayView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  quickPlay = () => {
    this.props.playStateActions.findGame("1234ABCDE", this.props.inGame); // Get id from user or random guest name
  }

  multiPlay = () => {
    // TODO
    // console.log(this.dropdown.alert);
    // this.dropdown.alert('Custom', 'You clicked multiplayer');
    console.log('Multiplay clicked');
  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Text>WELCOME TO TYPESPRINT</Text>
          <Text>{this.props.isLoading}</Text>
          <Text>{this.props.isLoading ? "Finding game.." : null}</Text>
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