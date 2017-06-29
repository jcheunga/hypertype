import React from 'react';
import {
  Image,
  ActivityIndicator
} from 'react-native';

import HomeContainer from '../../styles/HomeContainer';
import LogoContainer from '../../styles/LogoContainer';

import LogoHeader from '../../styles/LogoHeader';

import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

import Icon from 'react-native-vector-icons/Entypo';

class PlayView extends React.PureComponent {
  static displayName = 'PlayView';

  static navigationOptions = {
    header: {
      visible: false
    },
    tabBar: {
      icon: ( { tintColor, focused }) => {
        return (
          <Icon name="keyboard" size={26} style={{color: focused ? tintColor : '#929292'}}/>
        );
      }
    }
  };

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.playStateActions.leaveGame();
    this.props.multiplayStateActions.leaveGame();
  }

  quickPlay = () => {
    let user = this.props.user ? this.props.user : {usernames: this.props.guestUsername};
    this.props.playStateActions.findGame(this.props.inGame, user);
  }

  multiPlay = () => {
    this.props.navigationStateActions.navigate({ routeName: 'Multiplay' })
  }

  render() {
    return (
      <HomeContainer>
        <LogoContainer>
          <Image
            style={{width: 140, height: 140}}
            source={require('../../assets/images/hypertype-logo.png')}
          />
          <LogoHeader>hypertype</LogoHeader>
        </LogoContainer>
        <FormButton
          onPress={() => this.quickPlay()}>
          { this.props.isLoading ? <ActivityIndicator style={{marginRight: 10}} color="#ffffff"/> : null}
          <FormButtonText>
            Quick play
          </FormButtonText>
        </FormButton>
        <FormButton
          onPress={() => this.multiPlay()}>
          <FormButtonText>
            Multi play
          </FormButtonText>
        </FormButton>
      </HomeContainer>
    );
  }
}

export default PlayView;