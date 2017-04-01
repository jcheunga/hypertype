import * as theme from '../../utils/theme';
import Button from '../../components/Button';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

const window = Dimensions.get('window');

class PlayView extends Component {
  static displayName = 'PlayView';

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  quickPlay = () => {
    console.log("Quick play pressed");
    this.props.playStateActions.findGame("1234ABCDE");
  }

  multiPlay = () => {
    // TODO
  }

  render() { 
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
        <Text>WELCOME TO TYPESPRINT</Text>
        <Text>{this.props.errorMessage}</Text>
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
          action={() => console.log("Multiplay pressed")}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    flex: 1
  },
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