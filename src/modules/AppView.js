import React from 'react';
import {View, StatusBar, ActivityIndicator, AsyncStorage} from 'react-native';
import NavigatorViewContainer from './navigator/NavigatorViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';

import SplashView from './splash/SplashView';

import app from '../feathers';

class AppView extends React.PureComponent {
  static displayName = 'AppView';

  constructor(props) {
    super(props)
    this.connect();
  }

  connect = () => {
    app.io.on('connect', () => {
      this.props.AppStateActions.connectApp();

      if (AsyncStorage['feathers-jwt']) {
        this.props.AuthStateActions.authenticateAccount();
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
        <SplashView />
      );
    }

    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor='#0091ff'
        />
        <NavigatorViewContainer />
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
}

export default AppView;
