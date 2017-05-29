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

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.playStateActions.leaveGame();
    this.props.multiplayStateActions.leaveGame();
  }

  quickPlay = () => {
    let user = this.props.user ? this.props.user : {usernames: this.props.guestUsername};
    this.props.playStateActions.findGame(this.props.inGame, user);
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
    backgroundColor: '#eaf8fd',
    justifyContent: 'center'
  },
});

export default PlayView;