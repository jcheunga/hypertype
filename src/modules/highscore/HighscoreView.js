import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
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
  }

  componentDidMount () {
    this._fetchScores();
    app.service("highscores").on("created", this._fetchScores);
  }

  _fetchScores = () => {
    this.props.highscoreStateActions.fetchScores();
  }

  _showScores = () => {
    if (this.props.scores.length > 0) {
      return this.props.scores.map((highscore, index) => {
        return (
          <Text key={index}>{highscore.playerName}: {highscore.wpm}</Text>
        );
      });
    } else {
      return null;
    }
  }

  _showLoading = () => {
    if (this.props.isFetching) {
      return (
        <Text>Loading...</Text>
      );
    }
  }

  _showError = () => {
    if (this.props.hasError || !this.props.isFetching && this.props.scores.length === 0) {
      return (
        <View>
          <Text>Error Loading...</Text>
          <Button
            title="Refresh"
            onPress={() => this._fetchScores()}
          />
        </View>
      );
    }
  }

  componentWillUnmount () {
    app.service("highscores").removeListener("created", this._fetchScores);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Highscores
          </Text>
          <View>
            {this._showScores()}
            {this._showLoading()}
            {this._showError()}
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
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HighscoreView;