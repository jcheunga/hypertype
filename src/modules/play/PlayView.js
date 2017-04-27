import * as theme from '../../utils/theme';
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button
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
    // PROBABY USE COMPONENTWILLMOUNT
  }

  quickPlay = () => {
    this.props.playStateActions.findGame(this.props.inGame);
  }

  multiPlay = () => {
    this.props.navigationStateActions.navigate({ routeName: 'Multiplay' })
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
            title="Quick play"
            onPress={() => this.quickPlay()}
          />
          <Button
            title="Multi play"
            onPress={() => this.multiPlay()}
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
});

export default PlayView;