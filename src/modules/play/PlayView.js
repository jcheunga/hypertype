import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

const window = Dimensions.get('window');

import MainContainer from '../../styles/MainContainer';
import BodyContainer from '../../styles/BodyContainer';

import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

class PlayView extends Component {
  static displayName = 'PlayView';

  static navigationOptions = {
    header: {
      visible: false
    }
  }

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
      <MainContainer>
        <BodyContainer style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
          <View style={{alignItems: 'center', marginBottom: 40}}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            />
            <Text style={{fontSize: 24, fontWeight: '600', color:'#101010'}}>
              HYPERTYPE
            </Text>
          </View>
          <FormButton
            style={{marginBottom: 15}}
            onPress={() => this.quickPlay()}>
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
        </BodyContainer>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf8fd',
    justifyContent: 'center'
  },
});

export default PlayView;