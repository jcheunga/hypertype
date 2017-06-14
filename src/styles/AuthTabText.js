import styled from 'styled-components/native';

const AuthTabText = styled.Text`
  color: ${props => props.selected ? '#fe463c' : '#263238'};
  border-bottom-width: ${props => props.selected ? '1px' : '0px'};
  border-bottom-color: ${props => props.selected ? '#fe463c' : '#263238'};
  font-size: 16px;
  margin-left: 5px;
  margin-right: 5px;
  padding-bottom: 3px;
  font-family: ${props => props.selected ? 'Poppins-SemiBold' : 'Poppins-Regular'};
`;

export default AuthTabText;