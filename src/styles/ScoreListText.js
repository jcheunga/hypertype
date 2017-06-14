import styled from 'styled-components/native';

const ScoreListText = styled.Text`
  font-size: ${props => props.head ? '16px' : '14px'};
  font-family: ${props => props.head ? 'Poppins-Medium' : 'Poppins-Regular'};
  color: ${props => props.head ? '#0277BD' : '#263238'};
`;

export default ScoreListText;