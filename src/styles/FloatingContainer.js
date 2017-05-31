import styled from 'styled-components/native';

const FloatingContainer = styled.View`
  background-color: #f5f8fa;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 5px;
  padding: 15px;
  shadow-color: #2b2b2b;
  shadow-offset: 2px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 2;
  elevation: 2;
  margin-top: ${props => props.first ? '25px' : '0'};
`;

export default FloatingContainer;