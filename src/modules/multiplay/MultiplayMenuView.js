
import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Button
} from 'react-native';

const window = Dimensions.get('window');

import MainContainer from '../../styles/MainContainer';
import BodyContainer from '../../styles/BodyContainer';

import FormButton from '../../styles/FormButton';
import FormButtonText from '../../styles/FormButtonText';

import HeaderContainer from '../../styles/HeaderContainer';
import HeaderContainerHeading from '../../styles/HeaderContainerHeading';
import HeaderContainerSubHeading from '../../styles/HeaderContainerSubHeading';

import TextBackButtonContainer from '../../components/TextBackButtonContainer';

class MultiplayMenuView extends React.PureComponent {
  static displayName = 'MultiplayMenuView';

  render() {
    return (
      <MainContainer>
        <BodyContainer>
          <TextBackButtonContainer
            onPress={this.props.gotoMainMenu}
          />
          <HeaderContainer>
            <HeaderContainerHeading>
              Multiplay
            </HeaderContainerHeading>
            <HeaderContainerSubHeading>
              Challenge friends to a typing duel!
            </HeaderContainerSubHeading>
          </HeaderContainer>

          <FormButton
            onPress={() => this.props.createGame()}>
            <FormButtonText>
              Create game
            </FormButtonText>
          </FormButton>

          <FormButton
            onPress={() => this.props.joinGame()}>
            <FormButtonText>
              Join game
            </FormButtonText>
          </FormButton>
        </BodyContainer>
      </MainContainer>
    );
  }
}

export default MultiplayMenuView;