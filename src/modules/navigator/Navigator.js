import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import PlayViewContainer from '../play/PlayViewContainer';
import HighscoreViewContainer from '../highscore/HighscoreViewContainer';
import ProfileViewContainer from '../profile/ProfileViewContainer';
import TypeViewContainer from '../type/TypeViewContainer';
import MultiplayViewContainer from '../multiplay/MultiplayViewContainer';
import MultiplayTypeViewContainer from '../multiplaytype/MultiplayTypeViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Play: {screen: PlayViewContainer},
  Highscore: {screen: HighscoreViewContainer},
  Profile: {screen: ProfileViewContainer},
}, {
  lazyLoad: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: {backgroundColor: activeColor},
        style: {backgroundColor: headerColor}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'Pepperoni App Template',
  header: {
    titleStyle: {color: 'white'},
    style: {
      backgroundColor: headerColor,
      elevation: 0 // disable header elevation when TabNavigator visible
    }
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  // InfiniteColorStack: {screen: ColorViewContainer}
});

export default AppNavigator;
