import React from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';

const Button = (props) => {
  return (
    <ButtonContainer {...props}>
      <ButtonText>{props.label}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  background-color: #4155b1;
  border-radius: 50px;
  padding: 10px;
  width: ${(props) => props.width || '50%'};
  align-self: center;
  margin: 10px 0;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: ${responsiveFontSize(1.6)}px;
`;

export default Button;
