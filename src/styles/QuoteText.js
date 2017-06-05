import styled from 'styled-components/native';

const QuoteText = styled.Text`
  font-size: 14px;
  color: #263238;
  margin-bottom: ${props => props.icon ? '7px' : '0px'};
  margin-top: ${props => props.icon ? '7px' : '15px'};
`;

export default QuoteText;