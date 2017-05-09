import * as theme from '../../utils/theme';
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
  TouchableOpacity,
  Button
} from 'react-native';

import app from '../../feathers';

const window = Dimensions.get('window');

class HighscoreView extends Component {
  static displayName = 'HighscoreView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    app.service("highscores")
      .find()
      .then(this._parseData)
      .catch(err => console.log(err));

    app.service("highscores")
      .on("created", this._parseData);
  }

  componentWillUnmount () {
    app.service("highscores")
      .removeListener("created", this._parseDataListener);
  }

  _parseData = (res) => {
    this.setState({
      data: res.data
    });
  }

  _fetchScores = () => {
    if (this.state.data.length > 0) {
      return this.state.data.map((highscore, index) => {
        return (
          <Text key={index}>{highscore.playerName}: {highscore.wpm}</Text>
        );
      });
    } else {
      return (
        <Text>Loading...</Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Highscores
          </Text>
          <Text style={styles.bodyText}>
            International Local Tabs
          </Text>
          <View>
            {this._fetchScores()}
          </View>
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
    backgroundColor: theme.colors.background
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
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HighscoreView;