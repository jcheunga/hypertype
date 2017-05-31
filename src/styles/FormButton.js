import styled from 'styled-components/native';

const FormButton = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  shadow-color: #2b2b2b;
  shadow-offset: 2px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 2;
  elevation: 1;
  background-color: ${props => props.light ? '#ffffff' : '#fe463c'};
`;

export default FormButton;