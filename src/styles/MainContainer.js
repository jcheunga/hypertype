import styled from 'styled-components/native';

const MainContainer = styled.View`
  flex: 1;
  background-color: ${props => props.userOn ? '#feda3e' : '#f5f8fa'};
`;

export default MainContainer;