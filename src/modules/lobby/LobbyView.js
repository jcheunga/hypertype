
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Button,
  FlatList
} from 'react-native';

const window = Dimensions.get('window');

class LobbyView extends Component {
  static displayName = 'LobbyView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  _renderPlayerList = () => {
    const playerList = this.props.roomJoined.playerList;
    const showScore = this.props.showScore;

    return playerList.map((value, key) => {
      return(
        <Text>Player: {value.usernames} { this.props.showScore ? "- WPM: " value.wpm : null}</Text>
      );
    })
  }

  _keyExtractor = (item, index) => item._id;

  _renderPlayerListItem = ({item}) => (
    <Text>Player: {item.usernames} { this.props.showScore ? "- WPM: " item.wpm : null}</Text>
  );

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Players List
          </Text>
          <View>{this._renderPlayerList()}</View>
          <FlatList
            data={this.props.roomJoined.playerList}
            extraData={this.props.roomJoined}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderPlayerListItem}
          />
          <Text>
            List of players in the room, maybe cap at 10
            and then show wpm if it has prop for wpm score
          </Text>
        </View>
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
  },
  header: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  bodyText: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'System'
  }
});

export default LobbyView;