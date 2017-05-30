
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Button
} from 'react-native';

const window = Dimensions.get('window');

class MultiplayMenuView extends Component {
  static displayName = 'MultiplayMenuView';

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.isCreating ? "Creating game..." : null}</Text>
        <Button
          title="Create game"
          onPress={() => this.props.createGame()}
        />
        <Button
          title="Join game"
          onPress={() => this.props.joinGame()}
        />
        <Button
          title="Back to main menu"
          onPress={() => this.props.gotoMainMenu()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf8fd'
  }
});

export default MultiplayMenuView;