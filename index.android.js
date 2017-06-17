import 'es6-symbol/implement';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import {AppRegistry, BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';

import { leaveGame } from './src/modules/play/PlayState';
import { leaveGame as leaveMultiplayGame }  from './src/modules/multiplay/MultiplayState';

import codePush from "react-native-code-push";

import { Sentry } from 'react-native-sentry';

Sentry.config("https://08bad61fe9e145c99678d73cca55ced9:bf26afa7fbd7445c9c5f5e305ef4befe@sentry.io/180657").install();


class Hypertype extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    store.dispatch(leaveGame());
    store.dispatch(leaveMultiplayGame());

    const navigatorState = store.getState().navigatorState;

    const currentStackScreen = navigatorState.index;
    const currentTab = navigatorState.routes[0].index;

    if (currentTab !== 0 || currentStackScreen !== 0) {
      store.dispatch(NavigationActions.back());
      return true;
    }

    // otherwise let OS handle the back button action
    return false;
  }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

Hypertype = codePush(Hypertype);

AppRegistry.registerComponent('Hypertype', () => Hypertype);
