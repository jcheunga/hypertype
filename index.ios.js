import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

import codePush from "react-native-code-push";

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import { Sentry } from 'react-native-sentry';

Sentry.config("https://08bad61fe9e145c99678d73cca55ced9:bf26afa7fbd7445c9c5f5e305ef4befe@sentry.io/180657").install();


class Hypertype extends Component {
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
