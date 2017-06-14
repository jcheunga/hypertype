import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import PlayViewContainer from '../play/PlayViewContainer';
import HighscoreViewContainer from '../highscore/HighscoreViewContainer';
import ProfileViewContainer from '../profile/ProfileViewContainer';
import TypeViewContainer from '../type/TypeViewContainer';
import MultiplayViewContainer from '../multiplay/MultiplayViewContainer';
import MultiplayTypeViewContainer from '../multiplaytype/MultiplayTypeViewContainer';

const headerColor = '#F4F4F4';
const activeColor = '#0073cd';
const tabBarTextColor = '#929292';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Play: {
    screen: PlayViewContainer,
  },
  Highscore: {
    screen: HighscoreViewContainer
  },
  Profile: {
    screen: ProfileViewContainer
  },
}, {
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: activeColor,
    ...Platform.select({
      android: { // CHANGE TAB ICON STYLE IN TOP BAR TO 26 26
        inactiveTintColor: tabBarTextColor,
        indicatorStyle: {backgroundColor: headerColor},
        style: {backgroundColor: headerColor},
        labelStyle: {
          margin: 0,
          fontSize: 10
        }
      }
    })
  }
});

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  TypeView: {screen: TypeViewContainer},
  Multiplay: {screen: MultiplayViewContainer},
  MultiplayTypeView: {screen: MultiplayTypeViewContainer}
},
{
  headerMode: 'screen'
});

export default AppNavigator;
