import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import NavigatorViewContainer from './navigator/NavigatorViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

import app from '../feathers';
import { AsyncStorage } from 'react-native';

class AppView extends Component {
  static displayName = 'AppView';

  // static propTypes = {
  //   isReady: PropTypes.bool.isRequired
  // };

  constructor(props) {
    super(props)
    this.connect();
  }

  connect = () => {
    app.io.on('connect', () => {
      this.props.AppStateActions.connectApp();

      if (AsyncStorage['feathers-jwt']) {
        this.props.AuthStateActions.authenticateAccount()
        .catch(err => console.log(err));
      }

    });

    app.io.on('disconnect', () => {
      this.props.AppStateActions.disconnectApp();
    });
  }

  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then(snapshot => {

        if (snapshot) {
          this.props.SessionStateActions.resetSessionStateFromSnapshot(snapshot);
        } else {
          this.props.SessionStateActions.initializeSessionState();
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor='#455a64'
          // barStyle='light-content'
        />
        <NavigatorViewContainer />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;
