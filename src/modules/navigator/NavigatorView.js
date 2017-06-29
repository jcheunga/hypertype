import React from 'react';
import {addNavigationHelpers} from 'react-navigation';

import AppNavigator from './Navigator';

class NavigatorView extends React.PureComponent {
  static displayName = 'NavigationView';

  render() {
    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.navigatorState
          })
        }
      />
    );
  }
}

export default NavigatorView;
