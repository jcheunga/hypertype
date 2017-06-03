import styled from 'styled-components/native';

const ScoreListText = styled.Text`
  font-size: ${props => props.head ? '16px' : '14px'};
  font-weight: ${props => props.head ? '600' : 'normal'};
  color: ${props => props.head ? '#0277BD' : '#263238'};
`;

export default ScoreListText;