import styled from 'styled-components/native';
import { Platform } from 'react-native';

const MainContainer = styled.ScrollView`
  padding-top: ${(Platform.OS === 'ios') ? '20' : '0'};
  flex: 1;
  background-color: ${props => {
    if (props.userOn) {
      return '#feda3e'
    } else if (props.blue) {
      return '#0073cd'
    } else {
      return '#f5f8fa'
    }
  }};
`;

export default MainContainer;